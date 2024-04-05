const { SECRET_KEY } = process.env
const jwt = require('jsonwebtoken');

const admin = async (req,res,next) => {
    const token = req.headers['token'];
    
    if (!token) {
        return res.status(401).json({error: "JsonWebTokenError: jwt malformed"})
    }

    let decodedToken = {}

    try {
        decodedToken = await jwt.verify(token, SECRET_KEY)
    } catch (error) {
        return res.status(401).json({ error: 'Token invalido' })
    }

    if(decodedToken.idAccess !== 1){
        return res.status(401).json({error:'Permisos insuficientes'})
    }

    next()

}

module.exports = {
    admin
}