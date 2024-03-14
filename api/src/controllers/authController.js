const { User } = require('../db')

// mi funcion "validate" le llega por parametros un email y una passw

const validate = async (email,password) => {

// busco en la db si hay un correo que coincida con el me llego y si coincide guardo
// la informacion del usuario en mi variable "user"

    const user = await User.findOne({where: {email}})

// en la informacion almacenada en user verifico si la passowrd coincide con la que me llego
// en parametros y retorno true o false dependiendo si coincide o no.

    if(user.password === password){
        return true
    } else {
        return false
    }

}

module.exports = {
    validate
}