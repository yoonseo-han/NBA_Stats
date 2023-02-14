//Act as a server to connect to discord bot
const Discord = require('discord.js');
const {Client,Events, GatewayIntentBits} = require('discord.js');
const config = require('./config.json');
const TOKEN = config.chatbot_token;
const fetch = require('node-fetch-commonjs');
const fs = require('fs');
const path = require('node:path');
const { REST, Routes } = require('discord.js');
// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(TOKEN);

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const commandsStore = [];

const Team = require('./dbObjects');


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

//Define event handler variables
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

//Event handler
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (client) => event.execute(client));
        if(event.name === Events.ClientReady) {
			deploy_commands();
		}
	} else {
		client.on(event.name, (interaction) => event.execute(interaction));
	}
}

client.login(TOKEN);