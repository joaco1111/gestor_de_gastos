const {User, Action} = require('../../db');

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
        if(!id_user) return res.status(400).send("Dato incompleto");

        const user_exists = await User.findOne({where: {id: id_user}});
        if(!user_exists) return res.status(400).send("Los datos no coinciden");

        const where = {
           "id_usuario":  id_user
        };

        if(data){
           where.data = data 
        }
        if(type){
           where.type = type 
        }
        if(category){
           where.category = category 
        }

        const result_filter = await Action.findAndCountAll({where})


        return res.status(200).json(result_filter)
    } catch (error) {
        return res.status(500).send(error.message);
    }
}


module.exports = {
    filters
}