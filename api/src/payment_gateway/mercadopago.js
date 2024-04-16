// const express = require("express");
// const server = express();
// const cors = require("cors");
// const mercadopago = require("mercadopago");

// server.use(express.json());
// server.use(cors());

// mercadopago.configure({
// 	access_token: process.env.MERCADOPAGO_ACCESS_TOKEN
// });

// server.get("/pagos", function(req, res) {
// 	res.send("¡Está funcionando!");
//   });
// server.post("/create_preference", (req, res) => {

// 	let preference = {
// 		items: [
// 			{
// 				title: req.body.description,
// 				unit_price: Number(req.body.price),
// 				quantity: Number(req.body.quantity),
// 			}
// 		],
// 		back_urls: {
// 			"success": "http://localhost:3001/home",//solo si fue extioso el  pago 
// 			"failure": "",//solo cuando alla un error en la compra
// 		},
// 		auto_return: "approved",
// 	};
// // Acvitidad para el admin
// 	mercadopago.preferences
// 		.create(preference)
// 		.then(function (response) {
// 			res.json({
// 				id: response.body.id
// 			});
// 		}).catch(function (error) {
// 			console.log(error);
// 		});
// });

// server.listen(8080, () => {
// 	consolelog("el servidor esta corriendo en el porto 8080");
// });

// module.exports = server;