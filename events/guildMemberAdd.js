const { MessageEmbed } = require('discord.js')
const { welcomeChannelId, welcomeImageUrl } = require('../config.json');
var indexFileInclude = require('../index.js');
const client = indexFileInclude.client;

module.exports = {
	name: 'guildMemberAdd',
	once: false,
	execute(member) {
        const count = member.guild.memberCount.toString()
        const end = count[count.length-1]
        const suffixed = end == 1 ? count + "st" : end == 2 ? count + "nd" : end == 3 ? count + "rd" : count + "th" 
        const guildspot = member.guild
        const embed = new MessageEmbed()
        .setTitle(`🔮 | ${member.displayName} joined!!`)
        .setDescription(`Welcome to ${guildspot}, **${member.user}**! \nYou are the **${suffixed}** member!\n`)
        .setColor("RANDOM")
        .setImage(welcomeImageUrl)
        .setTimestamp();
        client.channels.cache.get(welcomeChannelId).send({embeds: [embed]});
	},
};