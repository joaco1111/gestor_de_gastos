const { User } = require('../db')
const { validate } = require('../controllers/authController')

const loginHandler = async (req, res) => {

    // traigo del front email/passw

    const { email, password } = req.body

    try {

        // con mi funcion "validate" verifico si esta registrado o no
        // pasandole por parametros el email y la passw del front

        const login = await validate(email, password)

        if (login) {
            res.status(200).json({ access: 'Se ha ingresado' })
        } else {
            res.status(200).json({ access: 'Clave incorrecta' })
        }
    } catch (error) {
        res.status(400).json({ access: 'No registrado' })
    }
}

const registerHandler = async (req, res) => {
    try {

// traigo del front name,email y password

        const { name, email, password } = req.body

// verifico si no existe otro gmail en mi db

        const verificateEmail = await User.findOne({ where: { email } })

        if (verificateEmail) {
            return res.status(200).json({ access: 'Este correo ya existe' })
        }

// compruebo que los campos esten llenos

        if(!name || !email || !password){
            return res.status(200).json({access: 'Datos incompletos'})
        }

// creo el registro en db

        await User.create({ name, email, password })

        res.status(200).json({ access: name + ' Se encuentra ya registrado' })

    } catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    loginHandler,
    registerHandler
}