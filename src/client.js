'use strict';

const firebase = require('firebase-admin');
const twilio = require('twilio');
let instance;

class Client {
  constructor(Config) {
    if (!instance) {
      this.Config = Config;
      this.firebase = firebase.initializeApp({
        credential: firebase.credential.applicationDefault(),
        databaseURL: Config.firebase.database.url,
      });
      this.twilio = twilio(Config.twilio.account_sid, Config.twilio.authentication_token);
      instance = this;
    }

    return instance;
  }

  async createBinding(token, tag) {
    const tokens = [token];
    await this.firebase
      .messaging()
      .subscribeToTopic(tokens, `${tag}-${this.Config.firebase.enviroment}`);
  }

  async removeBinding(token, tag) {
    const tokens = [token];
    await this.firebase
      .messaging()
      .unsubscribeFromTopic(tokens, `${tag}-${this.Config.firebase.enviroment}`);
  }

  async sendPush(tokens, { title, body, data }) {
    const message = {
      notification: {
        title,
        body,
      },
      apns: {
        payload: {
          aps: {
            sound: 'default',
          },
        },
      },
      android: {
        notification: {
          priority: 'high',
          sound: 'default',
        },
      },
      data: data || {},
      tokens,
    };

    await this.firebase.messaging().sendMulticast(message);
  }

  async sendSms(number, message) {
    const notificationOpts = {
      toBinding: JSON.stringify({
        binding_type: 'sms',
        address: number,
      }),
      body: message,
    };

    this.twilio.notify
      .services(this.Config.twilio.notification_service)
      .notifications.create(notificationOpts)
      .then(notification => {
        return notification;
      });
  }

  async sendWhatsappMessage(number, message) {
    this.twilio.messages
      .create({
        from: `whatsapp:${this.Config.twilio.whatsapp.number}`,
        body: message,
        to: `whatsapp:${number}`,
      })
      .then(notification => {
        return notification;
      });
  }
}

module.exports = Client;
