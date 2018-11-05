const Command = require('../../base/Command');

module.exports = class Ping extends Command {
    constructor(client) {
        super(client, {
            name: 'ping',
            category: 'General',
            description: 'View the latency of the bot and API.',
            usage: 'ping',
            aliases: ['pong']
        });
    }

    async run(message, args) {
        try {
            const msg = await message.channel.send('🏓 Ping!');
            return msg.edit(`Pong! Latency is \`${msg.createdTimestamp - message.createdTimestamp}ms\`. API Latency is \`${Math.round(this.client.ping)}ms\`.`);
        } catch (e) {
            console.log(e);
            return message.channel.send(`Error running this command: **${e.message}**.`);
        }
    }
};