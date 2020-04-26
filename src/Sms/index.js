'use strict';

class SmsService {
  constructor(Config, Client) {
    this.Config = Config;
    this.Client = Client;
  }

  async send(number, message) {
    await this.Client.sendSms(number, message);
  }
}

module.exports = SmsService;
