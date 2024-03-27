const { User } = require('../../db')
const { validate } = require('../../validations/validationAuthController')
const bcrypt = require('bcrypt')
const cloudinary = require('cloudinary')
const { SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const loginHandler = async (req, res) => {

    // Se trae del front email/passw

    const { email, password } = req.body
    

    try {

        // con la funcion "validate" se verifica si esta registrado o no, pasando por 
        // parametros el email y la passw del front, y luego se envia un token con informacion del user

        const { token, idAccess } = await validate(email, password);

        if (token) {
            //respondemos con el token y el acceso
            console.log(idAccess);
            res.status(200).json({ tokenUser: token, email: email, password: password, idAccess })
            //res.header('token', token).json({access: true, token, user});
        } else {
            res.status(400).send('Usuario o contraseña incorrecta')
        }
    } catch (error) {
        res.status(400).send('Error en el login', error.message)
    }
}

const registerHandler = async (req, res) => {

    try {

        // Se trae del front name,email y password

        const { name, email, password, } = req.body

        // Se comprueba que los campos esten llenos

        if (!name || !email || !password) {
            return res.status(400).send('Datos incompletos')
        }

        // Se verifica si no existe otro gmail en la db

        const verificateEmail = await User.findOne({ where: { email } })


        if (verificateEmail) {
            return res.send('Correo electronico existente')
        }

        // Se hashea la contraseña 

        const passwordHash = await bcrypt.hash(password, 10)
        console.log(passwordHash);

        // creo el registro en db
    
        await User.create({ name: name.toLowerCase(), email, password: passwordHash, idAccess: 2 });
        const { token } = await validate(email, password);

        if (token) {
            //respondemos con el token y el acceso
            res.status(200).json({ tokenUser: token, email: email, password: password, idAccess: 2 })
            //res.header('token', token).json({access: true, token, user});
        } else {
            res.status(400).send('Usuario o contraseña incorrecta')
        }

    } catch (error) {
        res.status(400).send('Error al registrar en la Base de Datos: ', error.message)
    }
}

const updateHandler = async (req, res) => {
    try {
        //id del usuario por token
        let idUser = req.params.id;

        if(!idUser) idUser = req.userID;

        const userExists = await User.findOne({ where: { id: idUser } });
        let updateData = {}

        //validamos que si exista el usuario
        if (!userExists) return res.status(400).send("Usuario no existente.!");

        //si existe password la hasheamos y almacenamos los datos en updateData
        if (req.body?.password) {
            const { password } = req.body;
            const passwordHash = await bcrypt.hash(password, 10)

            for (let element in req.body) {
                if (element === "password") updateData[element] = passwordHash;
                if (element !== "password") updateData[element] = req.body[element];
            }
        } else {
            updateData = { ...req.body };
        }

        //integracion CLOUDINARY
        //Verificamos si hay una imagen recibida
        //la extraemos
        if (req.files && req.files.image) {
            const image = req.files.image;

            // Subimos  la imagen a Cloudinary
            const imageUploadResult = await cloudinary.uploader.upload(image.tempFilePath);

            // se guarda la URL de la imagen en la base de datos
            updateData["photoProfile"] = imageUploadResult.secure_url;
        }


        userExists.update(updateData);

        return res.status(200).send("Datos actualizados correctamente.");

    } catch (error) {
        return res.status(500).send('Error al actualizar: ', error.message)
    }
}

const deleteUser = async(req, res) => {
    try {
        const idUser = req.params.id;
        const user = await User.findOne({where: {id: idUser}});
        console.log(user);

        if(!user) return res.status(400).send("No se encuentra el usuario.")

        user.destroy();
        return res.status(200).json({detroy: true, user});
    } catch (error) {
        return res.status(500).json({error})
    }
}


const authenticationFromGoogle = async (req,res) => {
    try{
        const { email,displayName,uid } = req.body

        if (!email || !uid || !displayName) {
            return res.status(400).send('Datos incompletos')
        }

        const user = await User.findOne({ where: { email } })

        if (user) {

            const passwordMatch = await bcrypt.compare(uid, user.password)

            if (passwordMatch) {

                let userForToken = {
                    id: user.id,
                    email: user.email
                }

                let token = jwt.sign(userForToken, SECRET_KEY)

                if (token) {
                    res.status(200).json({ access: true, tokenUser: token, idAccess: 2})
                }
            } else {
                return res.status(400).send('Este usuario ya se encuentra registrado en la aplicacion')
            }

        } else {
            try {

                const passwordHash = await bcrypt.hash(uid, 10)
                const data = await User.create({ name: displayName, email, password: passwordHash, idAccess: 2 })

                let userForToken = {
                    id: data.id,
                    email: data.email
                }

                let token = jwt.sign(userForToken, SECRET_KEY)

                if (token) {
                    res.status(200).json({ access: true, tokenUser: token, idAccess: 2 })
                }

            } catch (error) {
                res.status(400).send('Error al registrar en la Base de Datos: ' + error.message)
            }
        }

    } catch(error){
        res.status(500).json({error: error.message})
    }
}

const getUsers = async(req,res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;
        const offset = (page - 1) * limit;

        //cuando no hayan una busqueda, devolvemos todos los usuarios
        if(search === "") {

            const users = await User.findAndCountAll({ 
                where: { 
                    idAccess: 2, 
                }, 
                paranoid: false,
                limit, 
                offset });

            if (!users) return res.status(400).send("No existen usuarios.");

            return res.status(200).json(users);
        }
        //cuando haya una busqueda, devolvemos unicamente lo que conincida con ella 
        const user = await User.findAndCountAll({
            where: {
                name: {
                    [Op.like]: `%${search}%`
                }, 
                idAccess: {
                    [Op.or]: [1,2]
                }
            }, 
            limit, 
            offset, 
            paranoid: false
        });

        if(!user) return res.status(400).send("No se encontraron resultados");

        return res.status(200).json(user);
    } catch (error) {
        return res.status(500).json({error: error.message})
    }
}


const restoreUser = async (req,res) => {
    const {id} = req.params;

try {
    const user = await User.findByPk(id, {paranoid: false})

    if(!user || user.deleteAt) {
        res.status(400).send('Usuario no encontrado ', error.message)
    }

    await user.restore()
    
    return res.status(200).json(user)
} catch (error) {
    res.status(500).send('Error al restaurar usuario: ', error.message)
}
}

module.exports = {
    loginHandler,
    registerHandler,
    updateHandler,
    getUsers,
    authenticationFromGoogle,
    deleteUser,
    restoreUser
}