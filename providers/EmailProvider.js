'use strict';

const { ServiceProvider } = require('@adonisjs/fold');

class EmailProvider extends ServiceProvider {
  register() {
    this.app.singleton('Adonis/Notify/Email', () => {
      const Config = this.app.use('Adonis/Src/Config');
      const Mail = this.app.use('Adonis/Addons/Mail');
      const Email = require('../src/Email/index');
      return new Email(Config.get('notification'), Mail);
    });
  }
}

module.exports = EmailProvider;
