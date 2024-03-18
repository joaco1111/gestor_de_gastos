const { User } = require('../db')
const bcrypt = require('bcrypt')
require('dotenv').config();
const { SECRET_KEY } = process.env
const jwt = require('jsonwebtoken')

// mi funcion "validate" le llega por parametros un email y una passw

const validate = async (email,password) => {


// busco en la db si hay un correo que coincida con el me llego y si coincide guardo
// la informacion del usuario en mi variable "user"

    const user = await User.findOne({where: {email}})

// en la informacion almacenada en user verifico si la passowrd coincide con la que me llego
// en parametros y retorno true o false dependiendo si coincide o no.

    const passowrdCompare = user === null ? false : await bcrypt.compare(password, user.password)

    if(passowrdCompare){

// se crea un token con la informacion del user

        const userForToken = {
            id: user.id,
            name: user.name
        }

        const token = jwt.sign(userForToken, SECRET_KEY)
        return token

    } else {
        return false
    }
}

module.exports = {
    validate
}