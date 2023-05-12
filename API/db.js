// --DB configuration--

// Require: Sequelize for the conection
const { Sequelize } = require("sequelize");
// Require: the config for the environment variables
require("dotenv").config();

const fs = require("fs");
const path = require("path");

// Declares: Environment Variables
const { DB_USER, DB_PASSWORD, DB_HOST, DB_DEPLOY } = process.env;

// Instance: Conection from DB to Sequelize
// UDI: string conection DB ( DBMS, User Postgres, Password Postgres, Puerto, DB name )

const sequelize = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/mueblesdelestero`, {
  logging: false, // set to console.log to see the raw SQL queries
 native: false, // lets Sequelize know we can use pg-native for ~30% more speed
})


// const sequelize = new Sequelize(DB_DEPLOY, {
//   logging: false, // set to console.log to see the raw SQL queries
//   native: false, // lets Sequelize know we can use pg-native for ~30% more speed
// })

//
const basename = path.basename(__filename);

// Array for the models
const modelDefiners = [];

// Read: all files from the Models folder, require them, and add to the modelDefiners array
fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

// Inject: the connection (sequelize) to all models
modelDefiners.forEach((model) => model(sequelize));

// Capitalize: model names ie: product => Product
let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

// Destructures: the models to make relationships
const {
  User,
  Purchase,
  Product,
} = sequelize.models;

// Declare: relationship
User.hasMany(Purchase, {foreignKey: "userId", as: "purchase"})
Purchase.belongsTo(User, {foreignKey: "userId", as: "user"})

module.exports = {
  // Export: the property where all models are to be saved
  ...sequelize.models,
  // Export: to connect the DB
  conn: sequelize,
};