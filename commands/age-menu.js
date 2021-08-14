const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('age-menu')
		.setDescription('Display info about yourself.'),
	async execute(interaction) {
		
		agemenu = new MessageSelectMenu()
		.setCustomId('select')
		.setPlaceholder('Nothing selected')
		.addOptions([
			{
				label: '18 - 25',
				description: 'Younglings',
				value: 'first_option',
			},
			{
				label: '26 - 30',
				description: 'Middlings',
				value: 'second_option',
			},
			{
				label: '30+',
				description: 'Boomers',
				value: 'third_option',
			},
		]);

        const row = new MessageActionRow().addComponents(agemenu);

        const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Age Menu')
			.setDescription('Pick an age!');

		return interaction.reply({ embeds: [embed], components: [row] });
	},
};