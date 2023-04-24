const {Events} = require('discord.js');
const config = require('../config.json');

const Team = require('../dbObjects');


module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if (!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName);

        if (!command) {
            console.error(`No command matching ${interaction.commandName} was found.`);
            return;
        }
        try {
            // APPLY EXECUTE FUJNCTION HANDLING HERE
            console.log(command.data.name);
            await command.execute(interaction);
        } catch(err) {
            console.error(error);
            await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
        }
    }
}