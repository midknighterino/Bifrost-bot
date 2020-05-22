
const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix, opUserIDs, whitelistedChannelIDs,blacklistedUserIDs } = require('./config.json');

client.once('ready', () => {
	console.log('Bifrost-bot Ready!');
});

client.on('message', message => {

	if (message.author.bot){
		return;
	}
	else if (blacklistedUserIDs.includes(message.author.id)){
		return;
	}
	else if (whitelistedChannelIDs.includes(message.channel.id) === false){
		return;
	}

	const isOP = opUserIDs.includes(message.author.id)

	const bifrostEmbed = new Discord.MessageEmbed ()
	.setAuthor (`${message.author.username}`,`${message.author.avatarURL()}`)
	.setDescription (`${message.content}`)
	.setFooter (`UID: ${message.author.id}, S: ${message.guild.name}, OP: ${isOP}`)

	function notSourceChannel (string){
		return string != message.channel.id;
	}

	const destinationChannelIDs = whitelistedChannelIDs.filter(notSourceChannel);

	destinationChannelIDs.forEach(function(entry) {
		client.channels.cache.get(entry).send(bifrostEmbed)
		});
});

client.login(token);

/*To do
1. uses manual mod */