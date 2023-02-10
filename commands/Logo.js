const { SlashCommandBuilder } = require('discord.js');
const fetch = require('node-fetch-commonjs');
const config = require('../config.json');
var teamID = 2;

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
    name: 'logo',
    async execute(message, clarification) {
        if(clarification==="boston") teamID='2';
        const teamLogo = await getTeamLogo(teamID);
        console.log("command executed");
        //message.channel.send(teamLogo);
        message.reply(teamLogo);
    }
    
};