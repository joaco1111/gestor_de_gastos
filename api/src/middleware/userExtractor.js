const { SECRET_KEY } = process.env
const jwt = require('jsonwebtoken')

module.exports = async(req, res, next) => {

// almacena el token que llega por headers
    const token = req.headers['token'];

    //si no existe un token, mandamos un error
    if (!token) {
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
    console.log(req.userID);
    next()
}
