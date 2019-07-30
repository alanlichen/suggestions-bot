const { RichEmbed } = require('discord.js');
const moment = require('moment');

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run(guild) {

    const { guildStatusColors: { deleted } } = this.client.config;

    const oldServer = new RichEmbed()
      .setTitle('Removed')
      .setDescription(`
        **ID:** \`${guild.id}\`
        **Name:** \`${guild}\`
        **Members:** \`${guild.members.size}\`
        **Joined:** \`${moment(guild.me.joinedAt).fromNow()}\`
        **Owner:** ${guild.owner} \`[${guild.owner.user.tag}]\`
      `)
      .setColor(deleted)
      .setTimestamp();

    try {
      await this.client.settings.deleteGuild(guild);
    } catch (err) {
      this.client.logger.error(err.stack);
    }

    switch (process.env.NODE_ENV) {
    // 345753533141876737 = Nerd Cave Testing
    case 'development': {
      const logGuild = this.client.guilds.get('345753533141876737');
      const logChannel = logGuild.channels.find(c => c.name === 'server_logs');
      await logChannel.send(oldServer);
      break;
    }
    // 480231440932667393 = Nerd Cave Development
    // 602332466476482616 = server_logs
    default: {
      // const logGuild = this.client.guilds.get('480231440932667393');
      // const logChannel = logGuild.channels.find(c => c.name === 'server_logs');
      // await logChannel.send(oldServer);
      this.client.shard.broadcastEval('this.channels.get("602332466476482616");')
        .then(async channelArr => {
          const found = channelArr.find(c => c);
          if (!found) return;

          await found.send(oldServer);
        })
        .catch(err => this.client.logger.error(err));
      break;
    }
    }

  }
};
