const jwt = require('jsonwebtoken');
const {Collaborations, User} = require('../../db')

const getCollaborations = async (req,res) => {
  
    try {
        
        const collaborations = await Collaborations.findAll({
           
            attributes: ["name",'date', 'amount', "transactionId"]
        })
        res.json(collaborations)
   } catch (error) {
        console.error(error)
        res.status(500).send('Error al recibir información de donaciones')
   }
}



module.exports = {
    getCollaborations,
    

}