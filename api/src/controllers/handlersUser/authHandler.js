const { User } = require('../../db')
const { validate } = require('../../validations/validationAuthController')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary')

const loginHandler = async (req, res) => {

    // Se trae del front email/passw

    const { email, password } = req.body

    try {

        // con la funcion "validate" se verifica si esta registrado o no, pasando por 
        // parametros el email y la passw del front, y luego se envia un token con informacion del user

        const token = await validate(email, password)

        if(token){
            res.status(200).json({ tokenUser: token })
        }else{
            res.status(400).send('Usuario o contraseña incorrecta' )
        }
    }catch(error){
        res.status(400).send('Error en el login', error.message)
    }
}

const registerHandler = async (req, res) => {

    try {

// Se trae del front name,email y password

        const { name, email, password, } = req.body

// Se comprueba que los campos esten llenos

        if (!name || !email || !password ) {
            return res.status(400).send( 'Datos incompletos' )
        }

// Se verifica si no existe otro gmail en la db

        const verificateEmail = await User.findOne({ where: { email } })

        if (verificateEmail) {
            return res.send( 'Correo electronico existente')
        }

// Se hashea la contraseña 

        const passwordHash = await bcrypt.hash(password, 10)

// creo el registro en db

        await User.create({ name, email, password: passwordHash, idAccess: 2 })

        res.status(201).json({ name, email })

    } catch (error) {
        res.status(400).send('Error al registrar en la Base de Datos: ',  error.message )
    }
}

const getUsers = async(req, res) => {
    try {
        const {page = 1, limit = 10} = req.query;
        const offset = (page - 1) * limit;

        const users = await User.findAndCountAll({where: {idAccess: 2}, limit, offset});
        
        if(!users) return res.status(400).send("No existen usuarios.");
        
        return res.status(200).json(users);
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const updateHandler =  async(req, res) => {
    try {
        //id del usuario por token
        const id_user = req.userID
        const userExists = await User.findOne({where: {id: id_user}});

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

        const { name, email, password } = req.body

        const passwordHash = await bcrypt.hash(password, 10)

        userExists.set({name,email,password: passwordHash})

        //user_exists.set(req.query);
        //los guardamos 
        await userExists.save();
        
        return res.status(200).send("Datos actualizados correctamente.");
        
    } catch (error) {
        return res.status(500).send('Error al actualizar: ',error.message)
    }
}

module.exports = {
    loginHandler,
    registerHandler,
    updateHandler,
    getUsers
}