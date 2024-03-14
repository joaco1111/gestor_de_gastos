const server = require('./src/app.js');
const { conn } = require('./src/db.js');
//obtener los datos del json
const { users } = require('./users.json');
const { ingresos, gastos} = require('./categories.json');
//tabla User
const {User, Category_income, Category_bills} = require('./src/db.js');

// Syncing all the models at once.
conn.sync({ alter: true }).then(async() => {

  //Insertando datos dentro de la tabla User

  //SI GUSTAN USAR LOS DATOS DEL JSON EN LA TABLA USER, DESCOMENTEN EL CODIGO DE ABAJO JUNTO CON SUS IMPORTACIONES
  ingresos.forEach(async(element) => {
    await Category_income.findOrCreate({where: {name: element}})
  })

  gastos.forEach(async(element) => {
    await Category_bills.findOrCreate({where: {name: element}})
  })
  
  users.forEach(async(element) => {
    const {name, email, password} = element
    await User.findOrCreate({where: {name, email, password}})
  })
  
  server.listen(3001, () => {
    console.log('%s listening at 3001'); // eslint-disable-line no-console
  });
});

