//Command to retrieve score of game
const { SlashCommandBuilder } = require('discord.js');
const Discord = require(`discord.js`);
const fetch = require(`node-fetch-commonjs`);
const fs = require(`fs`);
const path = require(`path`);
const moment = require(`moment-timezone`);

// Functions
const getHTML = require(`../functions/getHTML.js`);

//Export run method
module.exports = {
    data: new SlashCommandBuilder()
		.setName(`scores`)
		.setDescription(`Returns NBA scores from today or a specified date.`)
		.addStringOption(option => option.setName(`date`).setDescription(`Today/yesterday/tomorrow or a date in mm/dd/yyyy format.`))
		.addStringOption(option => option.setName(`team`).setDescription(`The specific team whose score you want to see.`)),
    
    async execute(interactionSource) {
		// Getting date
		let requestedDate = interactionSource.options.getString('date');

		// Getting team
		let requestedTeam = interactionSource.options.getString(`team`);

		console.log(requestedDate);
		console.log(requestedTeam);
	}
};