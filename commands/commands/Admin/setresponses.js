const Command = require('../../Command');

module.exports = class SetResponsesCommand extends Command {
    constructor(client) {
        super(client, {
            name: 'setresponses',
            category: 'Admin',
            description: 'Set if a response is required or not for rejecting suggestions.',
            adminOnly: true,
            botPermissions: ['MANAGE_MESSAGES'],
            usage: 'setresponses <true/false>'
        });
    }

    async run(message, args, settings) {

        await message.delete().catch(O_o => {});

        if (!args[0]) return this.client.errors.noUsage(message.channel, this, settings);

        switch(args[0]) {
            case 'true':
                try {
                    await this.client.settings.updateGuild(message.guild, { responseRequired: true });
                    message.channel.send('Responses required set to `true`. This means a response **is required** when using the `reject` command.').then(msg => msg.delete(5000));
                } catch (err) {
                    this.client.logger.error(err.stack);
                    return message.channel.send(`Error setting required responses: **${err.message}**.`);
                }
                break;
            case 'false':
                try {
                    await this.client.settings.updateGuild(message.guild, { responseRequired: false });
                    message.channel.send('Responses required set to `false`. This means a response **is not required** when using the `reject` command.').then(msg => msg.delete(5000));
                } catch (err) {
                    this.client.logger.error(err.stack);
                    return message.channel.send(`Error setting required responses: **${err.message}**.`);
                }
                break;
            default:
        }
    }
};