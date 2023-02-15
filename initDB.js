//Database connection 
const Sequelize = require('sequelize');
const config = require('./config.json');

const sequelize = new Sequelize('NBA', `${config.DB_user}`, `${config.DB_password}`, {
	host: 'localhost',
	dialect: 'mysql',
	logging: false,
});

sequelize.authenticate().then(() => {
	console.log('Connection has been established successfully.');
}).catch((error) => {
	console.error('Unable to connect to the database: ', error);
});

const Team = require('./models/Team.js')(sequelize, Sequelize.DataTypes);

module.exports = {
    async sync() {
            sequelize.sync().then(async() => {
            const teams = [
                Team.upsert({team_id:2, team_name: "Boston Celtics", city_name: "boston"}),
                Team.upsert({team_id:6, team_name: "Chicago Bulls", city_name: "chicago"}),
                Team.upsert({team_id:10, team_name: "Detroit pistons", city_name: "detroit"}),
                Team.upsert({team_id:11, team_name: "Golden State warriors", city_name: "golden state"})
            ];
        
            await Promise.all(teams);
            console.log('Database synced');    

            sequelize.close();
        }).catch(err => console.log(err));
    }
}