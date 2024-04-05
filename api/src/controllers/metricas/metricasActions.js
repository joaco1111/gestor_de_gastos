const { Action } = require('../../db');

const metricasActions = async(req, res) => {
    try {
        const idUser = req.userID;
        const {type, dateInitial, dateLimit} = req.query;

        if(type !== "gastos" && type !== "ingresos") return res.status(400).send("No existe ningun type con esas caracteristicas.");
  
        const result = {
            idUser,
            type
        }

        if(type){

            //numero de actions registradas  ****gastos o ingresos ********
            const numberActions = await Action.count({
                where: {type, idUser}
            })

            if(!numberActions) return res.status(200).send("Todavía no hay acciones creadas.")

            result['count'] = numberActions;
    
            //promedio general de un tipo de actions ******gastos o ingresos********
            const promedioType  = await Action.sequelize.query(`SELECT AVG("quantity") AS "promedio" FROM "actions" WHERE "idUser" = ${idUser} AND "type" = '${type}'`);

            result['promedioType'] = parseFloat(promedioType[0][0].promedio).toFixed(2);

            //promedio por rango de fecha  ***** dateInitial = fecha que inicia     hasta    dateLimit = fecha que culmina *** 
    
            if(dateInitial && dateLimit ){
                const promedioFechaDefinida = await Action.sequelize.query(`SELECT AVG("quantity") AS "promedio" FROM "actions" WHERE "date" BETWEEN '${dateInitial}' AND '${dateLimit}' AND  "idUser" = ${idUser} AND "type" = '${type}'`);

                result['promedioFechaDefinida'] = parseFloat(promedioFechaDefinida[0][0].promedio).toFixed(2);
            }

            //total general de un tipo de actions  ******gastos o ingresos *********
            let total = await Action.sum('quantity', {where: {type, idUser}});
    
            if(total === null) total = 0

            result['total'] = total;

            return res.status(200).json(result)
        }
        
        return res.status(400).send("Parametro no pasado.");
        

    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}

module.exports = {
    metricasActions
}
