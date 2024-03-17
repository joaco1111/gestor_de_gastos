const { User } = require('../../db')
const { validate } = require('../../validations/validationAuthController')
const bcrypt = require('bcrypt')

const loginHandler = async (req, res) => {

    // traigo del front email/passw

    const { email, password } = req.body

    try {

        // con mi funcion "validate" verifico si esta registrado o no pasandole por 
        // parametros el email y la passw del front y envio un token con informacion del user

        const token = await validate(email, password)

        if(token){
            res.status(200).json({ tokenUser: token })
        }else{
            res.status(200).json({ access: 'Usuario o contraseña incorrecta' })
        }
    }catch(error){
        res.status(400).json({ error: error.message})
    }
}

const registerHandler = async (req, res) => {

    try {

// traigo del front name,email y password

        const { name, email, password } = req.body

// compruebo que los campos esten llenos

        if (!name || !email || !password) {
            return res.status(200).json({ access: 'Datos incompletos' })
        }

// verifico si no existe otro gmail en mi db

        const verificateEmail = await User.findOne({ where: { email } })

        if (verificateEmail) {
            return res.status(200).json({ access: 'Este correo ya existe' })
        }

// hasheo la contraseña 

        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash);

// creo el registro en db

        await User.create({ name, email, password: passwordHash })

        res.status(200).json({ name, email })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateHandler =  async(req, res) => {
    try {
        //id del usuario por parametro 
        const idUser = req.params.id;
        const userExists = await User.findOne({where: {id: idUser}});

        //validamos que si exista el usuario
        if(!userExists) return res.status(400).send("Usuario no existente...!");
        

        // //info a actualizar
        // const data_query = req.query;
        // const access_property = ["name", "email", "password"];
        // const data = {};

        // //validamos que las propiedades sean unicamente name, email y password, si llega otra propiedad no la tenemos en cuenta y modificaremos unicamente las que sean correctas
        // for(let property in data_query){
        //     access_property.forEach(element => {
        //         if(element === property) data[property] = data_query[property];
        //     })
        // }

        // //Actualizamos los datos en la tabla User
        // const update_user = await User.update(data, {
        //     where: {id: id_user}
        // });

        //FORMA MAS RAPIDA :)
        //actualizamos los datos

        userExists.set(req.query);
        //los guardamos 
        await userExists.save();
        
        return res.status(200).send("Datos actualizados correctamente");
        
    } catch (error) {
        return res.status(500).send(error.message)
    }
}

module.exports = {
    loginHandler,
    registerHandler,
    updateHandler
}