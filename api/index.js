const server = require('./src/app.js');
const { conn } = require('./src/db.js');
//obtener los datos del json
const { users } = require('./users.json');
const { ingresos, gastos} = require('./categories.json');
//tabla User
const {User, CategoryIncome, CategoryBills, Access, Action} = require('./src/db.js');

//RANDOM PARA INGRESARLOS A LA BASE DE DATOS
const typeAccess = ["admin", "user"];

// Syncing all the models at once.
conn.sync({ force: true }).then(async() => {

  //Insertando datos dentro de la tabla User

  //SI GUSTAN USAR LOS DATOS DEL JSON EN LA TABLA USER, DESCOMENTEN EL CODIGO DE ABAJO JUNTO CON SUS IMPORTACIONES
  ingresos.forEach(async(element) => {
    await CategoryIncome.findOrCreate({where: {name: element}})
  })

  gastos.forEach(async(element) => {
    await CategoryBills.findOrCreate({where: {name: element}})
  })

  typeAccess.forEach(async(element) => {
    await Access.findOrCreate({where: {name: element}})
  })

  
  
  users.forEach(async(element) => {
    try {
      const {name, email, password, access, photoProfile= null} = element
      await User.findOrCreate({where: {name, photoProfile, email, password, idAccess: access}})
    } catch (error) {
      console.log(error.message);
    }
  })
  
  server.listen(3001, () => {
    console.log('%s listening at 3001');
   // eslint-disable-line no-console
  });
});

