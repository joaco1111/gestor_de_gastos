require('dotenv').config();
const {Sequelize} =  require('sequelize')
const fs = require('fs')
const path = require('path')
const {
    DB_USER, DB_PASSWORD, DB_HOST, 
  } = process.env;

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/gestor_de_gastos`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
  
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, '/models'))
  .filter((file) => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, '/models', file)));
  });

  modelDefiners.forEach(model => model(sequelize));

  let entries = Object.entries(sequelize.models);
  let capsEntries = entries.map((entry) => [entry[0][0].toUpperCase() + entry[0].slice(1), entry[1]]);
  sequelize.models = Object.fromEntries(capsEntries);
  
//Hacer destructuring de los models  const {} = sequelize.models
const {Action, Notification, Review, User, CategoryIncome, CategoryBills, Access} = sequelize.models;

//Hacer las relaciones
// -------------relacion de user-action
User.hasMany(Action, { foreignKey: 'idUser', sourceKey: "id"});
Action.belongsTo(User, { foreignKey: 'idUser', targetId: "id" });

//------------relacion de user-access
Access.hasMany(User, { foreignKey: 'idAccess', sourceKey: "id"})
User.belongsTo(Access, { foreignKey: 'idAccess', targetId: "id"})

//---------relacion de action-category_insome & category_bills
Action.belongsTo(CategoryBills, { foreignKey: 'idCategoryBills' });
CategoryBills.hasMany(Action, { foreignKey: 'idCategoryBills' });

Action.belongsTo(CategoryIncome, { foreignKey: 'idCategoryIncome' });
CategoryIncome.hasMany(Action, { foreignKey: 'idCategoryIncome' });


//---------relacion USER-REVIEW ------
User.hasMany(Review, { foreignKey: 'idUser' });
Review.belongsTo(User, { foreignKey: 'idUser' });

//-----------relacion de USER-NOTIFICATION
User.hasMany(Notification, { foreignKey: 'idUser' });
Notification.belongsTo(User, { foreignKey: 'idUser' });



  module.exports = {
    ...sequelize.models, 
    conn: sequelize,
  };
  