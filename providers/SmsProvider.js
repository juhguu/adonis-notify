'use strict';

const { ServiceProvider } = require('@adonisjs/fold');
const Client = require('../src/client');

class SmsProvider extends ServiceProvider {
  register() {
    this.app.singleton('Adonis/Notify/Sms', () => {
      const Config = this.app.use('Adonis/Src/Config');
      const _Client = new Client(Config.get('notification'));
      const Push = require('../src/Sms/index');
      return new Push(Config.get('notification'), _Client);
    });
  }
}

module.exports = SmsProvider;
