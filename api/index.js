const server = require('./src/app.js');
const { conn } = require('./src/db.js');
//obtener los datos del json
const { users } = require('./users.json');
//tabla User
const {User} = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ force: true }).then(async() => {

  //Insertando datos dentro de la tabla User

  //SI GUSTAN USAR LOS DATOS DEL JSON EN LA TABLA USER, DESCOMENTEN EL CODIGO DE ABAJO JUNTO CON SUS IMPORTACIONES

  await User.bulkCreate(users);
  
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

