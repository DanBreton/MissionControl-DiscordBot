module.exports = {
	name: 'ready',
	once: true,
	enabled: true,
	execute(client) {
		console.log(`Logged in as ${client.user.tag}`);
	},
};