const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch-commonjs');
const config = require('../config.json');
var teamID = 0;

const Sequelize = require('sequelize');

const sequelize = new Sequelize('NBA', `${config.DB_user}`, `${config.DB_password}`, {
	host: 'localhost',
	dialect: 'mysql',
	logging: false,
});

const Team = require('../models/Team.js')(sequelize, Sequelize.DataTypes);

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': config.headers["X-RapidAPI-Key"],
		'X-RapidAPI-Host': config.headers["X-RapidAPI-Host"]
	}
};


const getTeamLogo = async (teamID) => {
    const logo = fetch(config.url + `teams?id=${teamID}`, options)
    .then((response) => response.json())
    .then(jsonObject => {
        //console.log(jsonObject['response'][0].logo);
        return jsonObject['response'][0].logo;
    })
    .catch(err => console.log(err));

    return logo;
} 

//Export run method
module.exports = {
    data: new SlashCommandBuilder()
        .setName('logo')
        .setDescription('Show team logo')
        .addStringOption(option =>
            option.setName('city')
                .setDescription('Which team logo to show')
                .setRequired(true)
                .addChoices(
                    {name: 'Boston', value: 'boston'},
                    {name: 'Chicago', value: 'chicago'},
                    {name: 'Detroit', value: 'detroit'},
                    {name: 'Golden state', value: 'golden state'}
                )),
    async execute(interaction) {
        const clarification = interaction.options.getString("city");
        const team = await Team.findOne({where: {city_name: `${clarification}`}});

        const teamLogo = await getTeamLogo(team.team_id);
        console.log("command executed");
        //message.channel.send(teamLogo);
        interaction.reply(teamLogo);
    }
};