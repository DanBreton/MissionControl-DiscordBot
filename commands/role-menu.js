const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { roleMenus } = require('../roleMenus.json');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('role-menu')
		.setDescription('Display info about yourself.')
		.addStringOption(option => option.setName('menu').setDescription('The role menu to create.')),
	async execute(interaction) {
		
		const embed = new MessageEmbed();
		const row = new MessageActionRow();

		let menuFound = false;
		for (let i = 0; i < roleMenus.length; i++) {
			let roleMenu = roleMenus[i];
			if(roleMenu.name == interaction.options.getString('menu'))
			{
				embed.setTitle(roleMenu.title);
				embed.setDescription(roleMenu.description);

				for(let j = 0; j < roleMenu.buttons.length; j++)
				{
					let button = roleMenu.buttons[j];
					const msgBtn = new MessageButton()
					.setStyle(button.style)
					.setEmoji(button.emoji)
					.setLabel(button.label)
					.setCustomId(button.customId);
					row.addComponents(msgBtn);
				}
				menuFound = true;
				break;
			}
		}

		if(menuFound)
		{
			return interaction.reply({ embeds: [embed], components: [row] });
		}
		return interaction.reply('Unable to find menu!');
	},
};