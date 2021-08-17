const { channelRestrictions } = require('../config.json');

module.exports = {
	name: 'messageCreate',
	once: false,
	enabled: true,
	async execute(message) {
		
		if(message.author.bot) return;

		let channel = message.channel;

		for(let i = 0; i < channelRestrictions.length; i++) 
		{
			let channelRestriction = channelRestrictions[i];
			if(channel.id === channelRestriction.channelID) 
			{
				if(channelRestriction.restriction === "imageWithText") 
				{
					if(message.attachments.size === 0)
					{
						message.delete();
						channel.send(channelRestriction.response).then(msg => { setTimeout(() => msg.delete(), 5000) });
						break;
					}
				}
			}
		}

	},
};