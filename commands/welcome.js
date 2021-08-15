const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageEmbed } = require('discord.js')

module.exports = {
	data: new SlashCommandBuilder()
		.setName('welcome-embed-test')
		.setDescription('Display info about yourself.'),
	async execute(interaction) {

		const user = interaction.user;
		let count = 10
		let end = count[count.length-1]
		let suffixed = end == 1 ? count + "st" : end == 2 ? count + "nd" : end == 3 ? count + "rd" : count + "th" 

		let embed = new MessageEmbed()
		.setTitle(`🔮 | ${user.username} joined!!`)
		.setDescription(`Welcome to Spacebar, **${user}**! \nYou are the **${suffixed}** member!
		\n`)
		.setColor("RANDOM")
		.setImage('https://i.imgur.com/AkMLRce.gif')
		.setTimestamp()

		return interaction.reply({ embeds: [embed] });
	},
};