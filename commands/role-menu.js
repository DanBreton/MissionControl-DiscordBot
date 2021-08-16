const { SlashCommandBuilder, SlashCommandStringOption } = require('@discordjs/builders');
const { MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const { roleMenus } = require('../roleMenus.json');

function buildSlashCommand()
{
	let command = new SlashCommandBuilder()
	.setName('role-menu')
	.setDescription('Generate interactive role menu.');

	let stringOption = new SlashCommandStringOption() 
	stringOption.setName('menu');
	stringOption.setDescription('The role menu to create.');
	stringOption.setRequired(true);

	for (let i = 0; i < roleMenus.length; i++) {
		let roleMenu = roleMenus[i];
		console.log(roleMenu.name);
		stringOption.addChoice(roleMenu.name, roleMenu.name);
	}

	command.addStringOption(stringOption);

	return command;
}

module.exports = {
	data: buildSlashCommand(),
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