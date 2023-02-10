//Act as a server to connect to discord bot
const Discord = require('discord.js');
const {Client,Events, GatewayIntentBits} = require('discord.js');
const config = require('./config.json');
const TOKEN = config.chatbot_token;
//const {Team_Stats} = require('./Team_Info.js');
const fetch = require('node-fetch-commonjs');
const fs = require('fs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

const prefix = "!";


//Define commands cache collection in client
client.commands = new Discord.Collection();

client.commands.load = dir => {
    //Read contents of a given directory that returns all the file names
    for(const file of fs.readdirSync(dir)) {
        const cmd = require(`${dir}/${file}`);
        //Set the commands name
        client.commands.set(cmd.name, cmd);
    }
    console.log(client.commands.map(c => c.name).join(', ') + ` command stored`);
}

//ADd /commands path into the current dir
client.commands.load(__dirname + "/commands");


client.on("ready", () => {
    console.log(`${client.user.tag} Logged in`);
});

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

    if(cmd) cmd.execute(message, clarification);
});


client.login(TOKEN);