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

// function getTeamInfo() {
//     //Work on fetching data from API
//     //console.log(config.url + 'teams?id=2');
//     return fetch(config.url + 'teams?id=2', options) 
//         .then(response => response.json())
//         .then((jsonObject) => {
//             //console.log(jsonObject['response'][0].logo);
//             //return (jsonObject['response'][0].logo);
            
//             //SEnd message to discord
//             return jsonObject;
//         })
//         .catch(err => console.log(err));
// }

client.on("ready", () => {
    console.log("Discord bot Ready");
});

client.on("messageCreate", (message) => {
    const getTeamLogo = fetch(config.url + 'teams?id=2', options)
        .then((response) => response.json())
        .then(jsonObject => {
            //console.log(jsonObject['response'][0].logo);
            return jsonObject['response'][0].logo;
        })
        .catch(err => console.log(err));
    
    const printLogo = async () => {
        const teamLogo = await getTeamLogo;
        //message.channel.send(teamLogo);
        message.reply(teamLogo);
    }

    if(message.content == "asd") {
        printLogo();
    }
});


client.login(TOKEN);