# Bifrost-bot
A discord bot that link channels in different servers/guilds together, allowing seamless chats between server communities

- will not respond to bots 
- must manually add channels to the config
- can set userids to ignore in the config
- messages starting with < or > will be ignored 
- messages that do not contain text will be ignored (e.g. image embeds)

Works by watching channels, deleting messages and reposting their content in all configured channels as embeds. Footer of the embeds lists server of origin, user id and sentiment score (uses VADER) 
