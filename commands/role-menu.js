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
		stringOption.addChoice(roleMenu.name, roleMenu.name);
	}

	command.addStringOption(stringOption);

	return command;
}

function removeEmojis(string)
{
	return string.replace(/([\u2700-\u27BF]|[\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])/g, '');
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

				let description = roleMenu.description + "\n\n";

				for(let j = 0; j < roleMenu.buttons.length; j++)
				{
					let button = roleMenu.buttons[j];
					const role = interaction.guild.roles.cache.get(button.roleId);

					const msgBtn = new MessageButton()
					.setStyle(button.style)
					.setEmoji(button.emoji)
					.setLabel(removeEmojis(role.name))
					.setCustomId(button.customId);
					row.addComponents(msgBtn);

					description += `${role}` + "\n";
				}

				embed.setDescription(description);
				embed.setColor(roleMenu.colour);

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