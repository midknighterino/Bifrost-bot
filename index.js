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
	
	else if (message.content == 0){
		message.delete()
		return;
	}
	
	else if (message.content.startsWith("%")){
		if (message.content === "%info"){
			message.reply("Github: <https://github.com/midknighterino/Bifrost-bot> \n\nLicense: <https://choosealicense.com/licenses/agpl-3.0/>")
			return;
		}
		else {
			return;
		}
	}
	
	console.log(`Content: ${message.content} \n\nServer: ${message.guild.name} \n\nAuthor: ${message.author.username} (${message.author.id})`)

	let sentiment = vader.SentimentIntensityAnalyzer.polarity_scores(message.content);

	if (sentiment.compound >= 0.034){

		message.delete()

		const bifrostEmbed = new Discord.MessageEmbed ()
		.setAuthor (`${message.author.username}`,`${message.author.avatarURL()}`)
		.setDescription (`${message.content}`)
		.setColor (`228B22`)
		.setFooter (`Server: ${message.guild.name} • User: ${message.author.id} • P/N/C: ${Math.round(sentiment.pos*100)}%/${Math.round(sentiment.neg*100)}%/${Math.round(sentiment.compound*100)}`)
	
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
		.setFooter (`Server: ${message.guild.name} • User: ${message.author.id} • P/N/C: ${Math.round(sentiment.pos*100)}%/${Math.round(sentiment.neg*100)}%/${Math.round(sentiment.compound*100)}`)
	
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
		.setFooter (`Server: ${message.guild.name} • User: ${message.author.id} • P/N/C: ${Math.round(sentiment.pos*100)}%/${Math.round(sentiment.neg*100)}%/${Math.round(sentiment.compound*100)}`)
	
		whitelistedChannelIDs.forEach(function(entry) {
			client.channels.cache
				.get(entry)
				.send(bifrostEmbed)
		})
	}

});
client.login(token);
