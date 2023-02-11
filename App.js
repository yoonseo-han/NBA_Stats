//Act as a server to connect to discord bot
const Discord = require('discord.js');
const {Client,Events, GatewayIntentBits} = require('discord.js');
const config = require('./config.json');
const TOKEN = config.chatbot_token;
//const {Team_Stats} = require('./Team_Info.js');
const fetch = require('node-fetch-commonjs');
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });
const path = require('node:path');

const { REST, Routes } = require('discord.js');

const prefix = "!";

const commandsStore = [];

// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(TOKEN);

//Define commands cache collection in client
client.commands = new Discord.Collection();

client.commands.load = dir => {
    //Read contents of a given directory that returns all the file names
    for(const file of fs.readdirSync(dir)) {
        const filePath = path.join(dir, file);
        const cmd = require(`${filePath}`);
        commandsStore.push(cmd.data);

        //Set the commands name if data and execute exist
        if('data' in cmd && 'execute' in cmd) {
            client.commands.set(cmd.data.name, cmd);
        }
        else console.log(`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`);
    }
    console.log(client.commands.map(c => c.name).join(', ') + ` command stored`);
}

//Deploy commands
async function deploy_commands() {
	try {
        commandsStore.map(command => command.toJSON());
		//console.log(`Started refreshing ${commands.length} application (/) commands.`);
        console.log("Deploy commands");
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationGuildCommands(config.clientID, config.guildID),
			{ body: commandsStore},
		);

		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
};

//Add commands path into the current dir
client.commands.load(__dirname + "/commands");


client.on("ready", () => {
    console.log(`${client.user.tag} Logged in`);
    deploy_commands();
});

//Message response
client.on("messageCreate", async (message) => {
    if(message.author.bot) return;
    //If message does not start with prefix, then return
    if(!message.content.startsWith(prefix)) return;
    if(message.content.slice(0, prefix.length) !== prefix) return;

    const messageInput = message.content.slice(prefix.length).trim().split(" ");
    const messageInputLC = messageInput.map(element => element.toLowerCase());
    
    const command = messageInputLC[0];
    const clarification = messageInputLC[1];

    //Retrieves the data with the "command" key value
    let cmd = client.commands.get(command);

    console.log(command);
});

//Slash command interaction response
client.on(Events.InteractionCreate, async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}
    try {
        await command.execute(interaction, "boston");
    } catch(err) {
        console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
    }

})


client.login(TOKEN);