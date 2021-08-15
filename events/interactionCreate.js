var indexFileInclude = require('../index.js');
const client = indexFileInclude.client;

module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction) {
		if (!interaction.isCommand()) return;
		const { commandName } = interaction;
		if (!client.commands.has(commandName)) return;

		try {
			await client.commands.get(commandName).execute(interaction);
		} catch (error) {
			console.error(error);
			return interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
		} 
	},
};