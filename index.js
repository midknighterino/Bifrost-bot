const Discord = require('discord.js');
const vader = require('vader-sentiment');
const client = new Discord.Client();
const { token, whitelistedChannelIDs,blacklistedUserIDs } = require('./config.json');

var stringToColour = function(str) {
	var hash = 0;
	for (var i = 0; i < str.length; i++) {
	  hash = str.charCodeAt(i) + ((hash << 5) - hash);
	}
	var colour = '#';
	for (var i = 0; i < 3; i++) {
	  var value = (hash >> (i * 8)) & 0xFF;
	  colour += ('00' + value.toString(16)).substr(-2);
	}
	return colour;
  }

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
	
	else if (message.content.startsWith("<") || message.content.startsWith(">")){
		if (message.content === "<info" || message.content === ">info"){
		    message.delete()
			message.reply("\nGithub: <https://github.com/midknighterino/Bifrost-bot> \nLicense: <https://choosealicense.com/licenses/agpl-3.0/> \n\nVADER Citation: Hutto, C.J. & Gilbert, E.E. (2014). VADER citation: A Parsimonious Rule-based Model for Sentiment Analysis of Social Media Text. Eighth International Conference on Weblogs and Social Media (ICWSM-14). Ann Arbor, MI, June 2014.\nLink: <https://www.aaai.org/ocs/index.php/ICWSM/ICWSM14/paper/viewPaper/8109>")
			return;
		}
		else {
			return;
		}
	}
	
	console.log(`Content: ${message.content} (${message.content.length}) \nServer: ${message.guild.name} \nAuthor: ${message.author.username} (${message.author.id})`)

	if (message.content.length >= 100){

		message.delete();

		let sentiment = vader.SentimentIntensityAnalyzer.polarity_scores(message.content);
		let sentimentBig = Math.round(sentiment.compound*1000);

		let bifrostEmbed = new Discord.MessageEmbed ()
		.setAuthor (`${message.author.username}`,`${message.author.avatarURL()}`)
		.setDescription (`${message.content}`)
		.setColor (`${stringToColour(sentimentBig.toString())}`)
		.setFooter (`Server: ${message.guild.name} • User: ${message.author.id} • Sentiment: ${sentimentBig} (Zero is neutral)`)
	
		whitelistedChannelIDs.forEach(function(entry) {
			client.channels.cache.get(entry)
			.send(bifrostEmbed)
		})
		return;
	} else {

		message.delete()

		const bifrostEmbed = new Discord.MessageEmbed ()
		.setAuthor (`${message.author.username}`,`${message.author.avatarURL()}`)
		.setDescription (`${message.content}`)
		.setFooter (`Server: ${message.guild.name} • User: ${message.author.id}`)
	
		whitelistedChannelIDs.forEach(function(entry) {
			client.channels.cache
				.get(entry)
				.send(bifrostEmbed)
		})
		return;
	}
});
client.login(token);
