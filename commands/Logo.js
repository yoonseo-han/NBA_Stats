const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch-commonjs');
const config = require('../config.json');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': config.headers["X-RapidAPI-Key"],
		'X-RapidAPI-Host': config.headers["X-RapidAPI-Host"]
	}
};


const getTeamLogo = fetch(config.url + 'teams?id=2', options)
    .then((response) => response.json())
    .then(jsonObject => {
        //console.log(jsonObject['response'][0].logo);
        return jsonObject['response'][0].logo;
    })
    .catch(err => console.log(err));

//Export run method
module.exports = {
    name: 'logo',
    async execute(message) {
        const teamLogo = await getTeamLogo;
        console.log("command executed");
        //message.channel.send(teamLogo);
        message.reply(teamLogo);
    }
    
};