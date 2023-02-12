const {Events} = require('discord.js');

const prefix = "!";

module.exports = {
    name: Events.MessageCreate,
    async execute(message) {
        if(message.author.bot) return;
        //If message does not start with prefix, then return
        if(!message.content.startsWith(prefix)) return;
        if(message.content.slice(0, prefix.length) !== prefix) return;

        console.log("Message received: " + message.content.slice(1, message.content.length));
    }
}