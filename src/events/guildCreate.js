const { MessageEmbed } = require('discord.js-light');

const Event = require('../structures/Event');
const Logger = require('../utils/logger');
const { displayTimestamp, reportToSentry } = require('../utils/functions');

module.exports = class extends Event {
  constructor(client, name) {
    super(client, name);
  }

  async run(guild) {
    const { colors, serverLogs } = this.client.config;

    const guildOwner = await this.client.users.fetch(guild.ownerID)
      .catch(e => {
        Logger.error('GUILD_CREATE', e);
        reportToSentry(e);
      });

    const newServer = new MessageEmbed()
      .setTitle('Added')
      .setDescription(`
        **ID:** \`${guild.id}\`
        **Name:** \`${guild.name}\`
        **Members:** \`${guild.memberCount}\`
        **Created:** ${displayTimestamp(guild.createdAt, 'R')}
        **Owner:** ${guildOwner} \`[${guildOwner?.tag}]\`
      `)
      .setColor(colors.guild.created)
      .setTimestamp();

    await this.client.channels.forge(serverLogs).send(newServer).catch(e => Logger.error('GUILD_CREATE', e));
  }
};
