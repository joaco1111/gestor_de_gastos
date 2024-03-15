const {User, Action, Category_bills, Category_income} = require('../../db');

/* 
1- searchs -> ?
2- date
3- type
4- category
5- quantity  [min, max]
 */

const filters = async(req, res) => {

    try {
        const {id_user, data , type, category} = req.body;
        //en caso de no existir id del usuario
        if(!id_user) return res.status(400).send("Dato incompleto");

        //veirificamos existencia del usuario 
        const user_exists = await User.findOne({where: {id: id_user}});
        if(!user_exists) return res.status(400).send("Los datos no coinciden");

        //creamos el objeto condicional que si o si debe de tener el id del usuario para buscar solo las actions con ese id
        const where = {
           "id_usuario":  id_user
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
                where.id_categoria_income = category; 
             }
         }
         else{
            if(category){
                where.id_categoria_bills = category; 
             }
         }

         console.log(where);
        const result_filter = await Action.findAndCountAll({where, include: [{model: Category_bills}, {model: Category_income}]});


        return res.status(200).json(result_filter)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


module.exports = {
    filters
}