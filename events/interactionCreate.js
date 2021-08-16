var indexFileInclude = require('../index.js');
const { roleMenus } = require('../roleMenus.json');
const client = indexFileInclude.client;

const roleInteractions = new Map();

function loadButtons()
{
	for (let i = 0; i < roleMenus.length; i++) {
		let roleMenu = roleMenus[i];
			for(let j = 0; j < roleMenu.buttons.length; j++)
			{
				let button = roleMenu.buttons[j];
				roleInteractions.set(button.customId, button.roleId);
			}
		}
}

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction) {
		if (interaction.isCommand())
		{
			const { commandName } = interaction;
			if (!client.commands.has(commandName)) return;

			try {
				await client.commands.get(commandName).execute(interaction);
			} catch (error) {
				console.error(error);
				return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
			}
		}
		else if(interaction.isButton())
		{
			if(!roleInteractions.length)
			{
				loadButtons();
			}

			let roleId = roleInteractions.get(interaction.customId);
			if(roleId)
			{
				let member = interaction.member;
				let interactedRole = member.guild.roles.cache.get(roleId);

				if(member.roles.cache.has(roleId))
				{
					interaction.member.roles.remove(roleId);
					return interaction.reply({ content: `Removed role ${interactedRole.name}!`, ephemeral: true });
				}

				interaction.member.roles.add(roleId);
				return interaction.reply({ content: `Added role ${interactedRole.name}!`, ephemeral: true });
			}
		}
	},
};