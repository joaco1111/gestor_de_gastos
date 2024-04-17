const nodemailer = require('nodemailer');
require('dotenv').config();
const {CONTRASENADEAPLICACIONES, CORREO} = process.env;

const mail= {
  user: CORREO,
  pass: CONTRASENADEAPLICACIONES

}

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    tls: {
      rejectUnauthorized: false
    },
    secure: true, // Use `true` for port 465, `false` for all other ports
    auth: {
      user: mail.user,
      pass: mail.pass,
    },
  });
  const sendEmail = async (email, subject, html) => {
     try {
       await transporter.sendMail({
            from: '"Gestor de Gastos" gestordegastospf@gmail.com', // sender address
            to: email, // list of receivers
            subject,
            html,
    attachments: [{
        filename: 'GDG_fondo_blanco.png',
        path: __dirname+ '/GDG_fondo_blanco.png',
        cid: 'GDG_fondo_blanco' //same cid value as in the html img src
    }],
      });
     } catch (error) {
      console.log("Correo NO enviado", error)
     }
  }
  const getTemplate = (template,name) => {
    const templates = {
        bienvenida: getBienvenida(name),
        userEliminado: getUserEliminado,
    }
    return templates[template]
}

const getBienvenida = (name) => {
  return `
  <img src='cid:GDG_fondo_blanco' width="150" height="110"/>
      <h2>Hola, ${name || 'Usuario'}</h2>
      <p>Gracias por preferirnos.</p>
      <p>Ahora que estás regitrado/a, te contamos mas de la aplicacion</p>
      <h3>Tu nuevo aliado para el control financiero personal de facil acceso donde podras: </h3>
      <ul>
          <li>Realizar un registro de tus ingresos y egresos</li>
          <li>Vision clara y organizada de tus finanzas</li>
          <li>Registro de movimietos por categoria</li>
          <li>¡Hacer donaciones con tu cuenta MercadoPago!</li>
      </ul>
    
      <h3 style="margin: auto;">¡Gestor de Gastos estamos para ayudarte!

      <p>
      <strong>
      Atte. <a
      href="https://gestor-de-gastos-front.vercel.app/" target="_blank"
      style="text-decoration: none;">Gestor de Gastos</a>
      </strong>
  </p>
      `;
}

const getUserEliminado = (name) => {
  return `
 
  <h2>Estimado/a ${name}, tu cuenta ha sido eliminada satisfactoriamente.
      <br>
      Si esta solicitud no la hiciste tú, escríbenos a <a href="mailito:gestordegastospf@gmail.com">Gestor de Gastos</a>
  </h2>
  <p>
      <strong>
      Atte. <a
      href="https://gestor-de-gastos-front.vercel.app/" target="_blank"
      style="text-decoration: none;">Gestor de Gastos</a>
      </strong>
  </p>
  `
}

  module.exports ={
    sendEmail, 
    getTemplate
  }

  