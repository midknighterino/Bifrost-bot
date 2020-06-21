const Discord = require('discord.js');
const vader = require('vader-sentiment');
const client = new Discord.Client();
const { token, whitelistedChannelIDs,blacklistedUserIDs } = require('./config.json');

client.once('ready', () => {
	console.log(`Bifrost-bot is ready!`);
});

client.on('message', message => {

	if (message.author.bot){
		return;
	}
	
    else if (whitelistedChannelIDs.includes(message.channel.id) === false){
		return;
	}

	else if (blacklistedUserIDs.includes(message.author.id)){
		return;
	}
	
	else if (message.content.startsWith("%")){
	    return;
	}

	else if (message.content == 0){
		message.delete()
		return;
	}

	let sentiment = vader.SentimentIntensityAnalyzer.polarity_scores(message.content);

	if (sentiment.compound >= 0.034){

		message.delete()

		const bifrostEmbed = new Discord.MessageEmbed ()
		.setAuthor (`${message.author.username}`,`${message.author.avatarURL()}`)
		.setDescription (`${message.content}`)
		.setColor (`228B22`)
		.setFooter (`Server: ${message.guild.name} • User: ${message.author.id} • Positivity: ${sentiment.pos} • Negativity: ${sentiment.neg} • Overall: ${sentiment.compound}`)
	
		whitelistedChannelIDs.forEach(function(entry) {
			client.channels.cache
				.get(entry)
				.send(bifrostEmbed)
		})
	}

	else if (sentiment.compound <= -0.034){

		message.delete()

		const bifrostEmbed = new Discord.MessageEmbed ()
		.setAuthor (`${message.author.username}`,`${message.author.avatarURL()}`)
		.setDescription (`${message.content}`)
		.setColor (`FF0000`)
		.setFooter (`Server: ${message.guild.name} • User: ${message.author.id} • Positivity: ${sentiment.pos} • Negativity: ${sentiment.neg} • Overall: ${sentiment.compound}`)
	
		whitelistedChannelIDs.forEach(function(entry) {
			client.channels.cache
				.get(entry)
				.send(bifrostEmbed)
		})
	}

	else {
		
		message.delete()

		const bifrostEmbed = new Discord.MessageEmbed ()
		.setAuthor (`${message.author.username}`,`${message.author.avatarURL()}`)
		.setDescription (`${message.content}`)
		.setColor (`FF8C00`)
		.setFooter (`Server: ${message.guild.name} • User: ${message.author.id} • Positivity: ${sentiment.pos} • Negativity: ${sentiment.neg} • Overall: ${sentiment.compound}`)
	
		whitelistedChannelIDs.forEach(function(entry) {
			client.channels.cache
				.get(entry)
				.send(bifrostEmbed)
		})
	}

});
client.login(token);
