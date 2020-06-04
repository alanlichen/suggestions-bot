const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');
const Command = require('../../Command');
const { version, description } = require('../../../package.json');

module.exports = class InfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'info',
      category: 'General',
      description: 'View bot information.',
      aliases: ['botinfo'],
      botPermissions: ['ADD_REACTIONS', 'EMBED_LINKS'],
      guildOnly: false,
      guarded: true
    });
  }

  async run(message, args) {

    const { embedColor, discord, owners, website } = this.client.config;

    const embed = new MessageEmbed()
      .setTitle(this.client.user.username)
      .setDescription(description)
      .setColor(embedColor)
      .setThumbnail(this.client.user.avatarURL())
      .addField(owners.length <= 1 ? 'Bot Author' : 'Bot Author(s)',
        owners.map(o => `<@${o}>`).join(', '))
      .addField('Support Discord', discord)
      .addField('Website', website)
      .addField('Bot Version', version)
      .setFooter('© 2020 Nerd Cave Development');

    return message.channel.send(embed);
  }
};
