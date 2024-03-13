const { User} = require('../db.js');

const update =  async(req, res) => {
    try {
        //id del usuario por parametro 
        const id_user = req.params.id;
        const user_exists = await User.findOne({where: {id: id_user}});

        //validamos que si exista el usuario
        if(!user_exists) return res.status(400).send("Usuario no existente...!");
        

        //info a actualizar
        const data_query = req.query;
        const access_property = ["name", "email", "password"];
        const data = {};

        //validamos que las propiedades sean unicamente name, email y password, si llega otra propiedad no la tenemos en cuenta y modificaremos unicamente las que sean correctas
        for(let property in data_query){
            access_property.forEach(element => {
                if(element === property) data[property] = data_query[property];
            })
        }

        //Actualizamos los datos en la tabla User
        const update_user = await User.update(data, {
            where: {id: id_user}
        });

        return res.status(200).send("Datos actualizados correctamente");
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = update;