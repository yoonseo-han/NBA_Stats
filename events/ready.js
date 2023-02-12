const {Events} = require('discord.js');

module.exports = {
	name: Events.ClientReady,
	once: true,
	execute(client, deploy_commands) {
        console.log(__dirname);
        console.log(`${client.user.tag} Logged in`);
	},
};