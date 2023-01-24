//Act as a server to connect to discord bot


const {Client,Events, GatewayIntentBits} = require('discord.js');
const config = require('./config.json');
const TOKEN = config.chatbot_token;
//const {Team_Stats} = require('./Team_Info.js');
const fetch = require('node-fetch-commonjs');
const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });


const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': config.headers["X-RapidAPI-Key"],
		'X-RapidAPI-Host': config.headers["X-RapidAPI-Host"]
	}
};

async function getTeamInfo() {
    //Work on fetching data from API
    console.log(config.url + 'teams?id=2');
    fetch(config.url + 'teams?id=2', options) 
        .then(response => response.json())
        .then((jsonObject) => {
            console.log(typeof(jsonObject));
            return jsonObject;
        })
        .catch(err => console.log(err));
}

client.on("ready", () => {
    console.log("Discord bot Ready");
});

client.on("messageCreate", (message) => {
    let jsonObject = getTeamInfo();
    console.log(typeof(jsonObject));
});


client.login(TOKEN);