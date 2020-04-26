'use strict';

class PushService {
  constructor(Config, Client) {
    this.Config = Config;
    this.Client = Client;
  }

  async saveDevice(token, tag) {
    await this.Client.createBinding(token, tag);
  }

  async send(tokens, payload) {
    await this.Client.sendPush(tokens, payload);
  }
}

module.exports = PushService;
