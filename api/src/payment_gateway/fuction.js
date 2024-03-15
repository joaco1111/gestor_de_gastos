const express = require("express");
const app = express();
const cors = require("cors");
const mercadopago = require("mercadopago");

app.use(express.json());
app.use(cors());

mercadopago.configure({
	access_token: "",
});

app.post("/create_preference", (req, res) => {

	let preference = {
		items: [
			{
				title: req.body.description,
				unit_price: Number(req.body.price),
				quantity: Number(req.body.quantity),
			}
		],
		back_urls: {
			"success": "",//solo si fue extioso el  pago
			"failure": "",//solo cuando alla un error en la compra
		},
		auto_return: "approved",
	};

	mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({
				id: response.body.id
			});
		}).catch(function (error) {
			console.log(error);
		});
});

/*
    COSAS QUE ME FALTAN
1- Agregar los back_url a las prefer
2- Agregar el token (llave de acceso)
3- Agregar la app.get para de una respuesta:
app.get("/pagos", fuction (req, res){
    res.send("La pasarela de pagos funciona!!!")
})
4- Agregar el port

*/
