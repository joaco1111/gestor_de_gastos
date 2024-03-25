const { SECRET_KEY } = process.env
const jwt = require('jsonwebtoken')

module.exports = async(req, res, next) => {

// almacena el token que llega por headers
    const token = req.headers['token'];

    //si no existe un token, mandamos un error
    if (!token) {
<<<<<<< HEAD
console.log(req);

    const authorization = req.cookie.token;
    console.log(authorization);
    // const authorization = req.get('authorization');

    let token = ''

// verifico que el token tenga el esquema 'bearer'

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    } else {
=======
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
        return res.status(401).json({error: "JsonWebTokenError: jwt malformed"})
    }

// decodifico el token y lo vuelvo un objeto

    let decodedToken = {}

    try {

        
        decodedToken = await jwt.verify(token, SECRET_KEY)

    } catch (error) {
        return res.status(401).json({ error: 'Token invalido' })
    }

// si todo va bien, guardo en req el id que me llego por el token y sigue funcionando la ruta
    req.userID = decodedToken.id
<<<<<<< HEAD
    next()
}

}
=======
    console.log(req.userID);
    next()
}
>>>>>>> 10b572947c361023fc6ad32a6e16df404a3614d5
