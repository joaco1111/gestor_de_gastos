const {User, Action, CategoryBills, CategoryIncome} = require('../../db');
const { Op } = require('sequelize'); 

/* 
1- searchs -> ?
2- date
3- type
4- category
5- quantity  [min, max]
 */

const filters = async(req, res) => {

    try {
        const { page = 1, limit = 10} = req.query;
        const {data , type, category} = req.body;
        const idUser = req.userID;

        const offset = (page - 1) * limit; //desde donde inicia el paginado

        //creamos el objeto condicional que si o si debe de tener el id del usuario para buscar solo las actions con ese id
        const where = {
           "idUser":  idUser,
        };

        //si hay fecha la agrega al objeto condicional
        if(data){
           where.data = data 
        }
         //si hay tipo la agrega al objeto condicional
        if(type){
           where.type = type 
        }
         //si hay categoria la agrega al objeto condicional
         if(category){
            if(type === "ingresos"){
                where.idCategoryIncome = category; 
             }
             else{
                where.idCategoryBills = category; 
            }
         }
         
        const resultFilter = await Action.findAndCountAll({
            where: {...where},
            limit,
            offset, 
            include: [{model: CategoryBills}, {model: CategoryIncome}],
            
        });


        return res.status(200).json(resultFilter)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


module.exports = {
    filters
}