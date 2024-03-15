const { User } = require('../db')
const { validate } = require('../controllers/authController')
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

module.exports = {
    loginHandler,
    registerHandler
}