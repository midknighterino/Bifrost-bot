const Discord = require('discord.js');
const webhook = require("webhook-discord"); 
const client = new Discord.Client();
const { token, whitelistedChannels, blacklistedUsers, webhookURLs } = require('./config.json');

//Neat function to capitalise sentences
const capitalize = (s) => {
	if (typeof s !== 'string') return ''
	return s.charAt(0).toUpperCase() + s.slice(1)
  }

//Bot logs some info when it is ready
client.once('ready', () => { 
	console.log(`Tigris Ready!\n---\nWhitelisted Channels: ${whitelistedChannels} \nBlacklisted Users: ${blacklistedUsers}\n---`)
});

client.on('message', message => { 
	//Stops the bot from acting on its own messages. Also stops responses to other bots. 
	if (message.author.bot){
		return;
	} 
	//Stops images being sent. 
	else if (capitalize(message.content) == 0){
		message.delete()
		return;
	}	
	//Stops messages being sent by 'blacklisted' users. 
	else if (blacklistedUsers.includes(message.author.id)){
		message.react(`:zipper_mouth:`)
		return;		
	} 
	//Stops the bot from mass mentioning users. Can be used to send private messages in shared channels. 
	else if (message.content.startsWith("<") || message.content.startsWith(">")){
		if (message.content === "<info>"){
			message.reply("\nGithub: \nLicense: <https://choosealicense.com/licenses/agpl-3.0/>")
			return;
		}
		else {
			return;
		}
	}	
	else if (whitelistedChannels.includes(message.channel.id)){

		//webhooks and loops
		for (entry of webhookURLs){
			const Hook = new webhook.Webhook(entry);
 
			const msg = new webhook.MessageBuilder()
							.setName(message.author.username)
							.setAvatar(message.author.avatarURL())							
							.setText(capitalize(message.content))
			Hook.send(msg);			
		}	

		//console logging 
		console.log(`${message.author.username}(${message.author.id}): ${capitalize(message.content)} \n---`)
		
		//clean up
		message.delete()

		return;
	}
	else {
		return;
	}
});

client.login(token);
