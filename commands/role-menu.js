const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role-menu')
		.setDescription('Display info about yourself.'),
	async execute(interaction) {
		
		const btn1 = new MessageButton()
        .setStyle('SECONDARY')
		.setEmoji("🍕")
		.setLabel('Pizza')
        .setCustomId('pizza')
		.setDisabled(false);
			
		const btn2 = new MessageButton()
        .setStyle('SECONDARY')
        .setEmoji("🍔")
        .setLabel('Burger')
        .setCustomId('burger')
        .setDisabled(false);

        const row = new MessageActionRow().addComponents(btn1).addComponents(btn2);

        const embed = new MessageEmbed()
			.setColor('#0099ff')
			.setTitle('Role Menu')
			.setDescription('Pick a role!');

		return interaction.reply({ embeds: [embed], components: [row] });
	},
};