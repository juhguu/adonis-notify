'use strict';

class WhatsappService {
  constructor(Config, Client) {
    this.Config = Config;
    this.Client = Client;
  }

  async send(number, message) {
    await this.Client.sendWhatsappMessage(number, message);
  }
}

module.exports = WhatsappService;
