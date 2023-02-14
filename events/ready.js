const {Events} = require('discord.js');
const Team = require('../initDB');

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client, deploy_commands) {
		await Team.sync();
        console.log(__dirname);
        console.log(`${client.user.tag} Logged in`);
	},
};