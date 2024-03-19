const { SECRET_KEY } = process.env
const jwt = require('jsonwebtoken')

module.exports = async(req, res, next) => {

// en authorization almaceno la cabecera que me manda el front que contiene el token

    const authorization = req.cookie.token;
    console.log(authorization);
    // const authorization = req.get('authorization');

    let token = ''

// verifico que el token tenga el esquema 'bearer'

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    } else {
        return res.status(401).json({error: "JsonWebTokenError: jwt malformed"})
    }

// decodifico el token y lo vuelvo un objeto

    let decodedToken = {}

    try {

        
        decodedToken = await jwt.verify(token, SECRET_KEY)

    } catch (error) {
    }

// si tengo algun problema con el token o la decodificacion arrojo un error

    if (!token || !decodedToken.id) {
        return res.status(401).json({ error: 'Token no recibido o token invalido' })
    }

// si todo va bien, guardo en req el id que me llego por el token y sigue funcionando la ruta

    req.userID = decodedToken.id
    next()
}


