const mercadopago = require('mercadopago')
const {Collaborations, User} = require('../db')
require('dotenv')

const {TOKEN_MERCADOPAGO} = process.env

const createOrder = async (req,res) => {
    const user = req.userID

    const tokenUser = await User.findOne({where: {id: user}});
    if(!tokenUser) {
        return res.status(404).send('No se encuentra el usuario')
    }
    
    mercadopago.configure({
        access_token: TOKEN_MERCADOPAGO
    });
    
    const result = await mercadopago.preferences.create({
        
        items: [
            {
                title: "Colaboración app",
                unit_price: 1000,
                quantity: 1,
                currency_id: "ARS"
            }
        ],
        back_urls: {
            success: "http://localhost:5173/success",
            failure: "http://localhost:5173/failure",
            pending: "http://localhost:3001/pending"
        },
        notification_url: "https://0322-181-91-2-147.ngrok-free.app/webhook"
    }) 
    const transactionId = result.body.id;
   
    await Collaborations.create({
       
        name: tokenUser.name,
        date: new Date(),
        amount: 100, 
        transactionId: transactionId,
        
       
    })
    console.log(result)
    res.send(result.body)
}

const receiveWebHook = async (req,res) => {
 try {
    const payment = req.query
    if(payment.type === "payment") {
        const data = mercadopago.payment.findById(payment['data.id'])
        console.log(data)
    }
    res.status(204).send('Ok')
 } catch (error) {
    console.error(error)
    res.status(500).send('Hubo un error')
 }
}
module.exports = {
    createOrder,
    receiveWebHook
}