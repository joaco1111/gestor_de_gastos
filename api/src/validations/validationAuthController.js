const { User } = require('../db');
const bcrypt = require('bcrypt');
require('dotenv').config();
const { SECRET_KEY } = process.env;
const jwt = require('jsonwebtoken');

const validate = async (email, password) => {
    try {
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return false // Usuario no encontrado
        }

        const passwordMatch = await bcrypt.compare(password, user.password)

        if (passwordMatch) {
            const userForToken = {
                id: user.id,
                email: user.email
            }

            const token = jwt.sign(userForToken, SECRET_KEY)
            return {
                token,
                user
            }
        } else {
            return false // Contraseña incorrecta
        }
    } catch (error) {
        console.error('Error en la validación:', error)
        return false // Error en la validación
    }
}

module.exports = {
    validate
}