const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const config = require('../../config');

const { database, username, password, host, port, dialect, storage } = config.sequelize;

const db = {};

let sequelize;
if (dialect === 'sqlite') {
  sequelize = new Sequelize(`sqlite:${storage}`);
} else {
  sequelize = new Sequelize(database, username, password, { host, dialect, port });
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach((file) => {
    const model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
