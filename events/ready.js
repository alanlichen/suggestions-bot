const { version } = require('../package.json');
require('dotenv-flow').config();

const versions = {
  production: 'Production',
  development: 'Development'
};

module.exports = class {
  constructor(client) {
    this.client = client;
  }

  async run() {
    await this.client.wait(1000);

    this.client.appInfo = await this.client.fetchApplication();
    setInterval(async () => {
      this.client.appInfo = await this.client.fetchApplication();
    }, 60000);

    let guildCount;
    try {
      guildCount = await this.client.shard.fetchClientValues('guilds.size')
        .then(res => res.reduce((prev, count) => prev + count, 0));
    } catch (error) {
      guildCount = this.client.guilds.size;
    }

    await this.client.logger.log(`Version ${version} of the bot loaded.`);
    await this.client.logger.log(`${versions[process.env.NODE_ENV]} version of the bot loaded.`);
    this.client.mongoose.init(); // initialize connection to the database
    await this.client.logger.log(`Logged in as ${this.client.user.tag} (${this.client.user.id}) in ${guildCount} server(s) on shard ${this.client.shard.id}.`, 'ready');

    this.client.botPresence();

    // If the bot was invited to a guild while it was offline, the "ready" event will
    // be emitted (ONLY IN PRODUCTION)
    if (process.env.NODE_ENV === 'production') {

      // handle posting stats to bot lists
      require('../utils/voting')(this.client);
    }
  }
};
