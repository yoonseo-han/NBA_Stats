//Database connection 
const Sequelize = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize('NBA', `${config.DB_user}`, `${config.DB_password}`, {
	host: 'localhost',
	dialect: 'mysql',
	logging: false,
});

const Team = require('./models/Team.js')(sequelize, Sequelize.DataTypes);

module.exports = {Team};