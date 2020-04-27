# Adonis Notify

Send notifications in AdonisJS using Twilio, Firebase Cloud Message and native Adonis Email service provider.

## Installation

Add the package in your Adonis project.

```bash
npm install adonis-notify --save
```

Create a config file named `notification.js` in your project `config` folder.

```javascript
'use strict';

const Env = use('Env');

module.exports = {
  twilio: {
    account_sid: '',
    authentication_token: '',
    notification_service: '',
    whatsapp: {
      number: '',
    },
  },

  firebase: {
    enviroment: '',
    database: {
      url: '',
    },
  },

  email: {
    sender: '',
  },
};
```
Add the new providers in your `app.js`

```javascript
const providers = [
  ...
  'adonis-notify/providers/EmailProvider',
  'adonis-notify/providers/PushProvider',
  'adonis-notify/providers/SmsProvider',
  'adonis-notify/providers/WhatsappProvider',
];
```

## Usage
### Push Notifications

Before sending push notifications with firebase, add the following variable to your application: `GOOGLE_APPLICATION_CREDENTIALS`

See: https://cloud.google.com/docs/authentication/getting-started

```javascript
const Push = use('Adonis/Notify/Push');

// Registering user device
Push.saveDevice(userDeviceToken, 'userTag');

// Sending pushs
const payload = {
  title: 'Your push title.',
  body: 'Your push message.'
}

Push.send([userDeviceTokens], payload);
```

You can also send an optional data attribute.
```javascript
// Custom data
const payload = {
  title: 'Your push title.',
  body: 'Your push message.',
  data: {
    foo: 'bar',
    bar: 'foo'
  }
}
```

### Sending Sms

```javascript
const Sms = use('Adonis/Notify/Sms');

Sms.send('+5582999999999', 'Hello World!');
```

### Sending Whatsapp messages

```javascript
const Whatsapp = use('Adonis/Notify/Whatsapp');

Whatsapp.send('+5582999999999', 'Hello World!');
```

### Sending Emails

Before sending emails, make sure you have set up Adonis' native email provider service.
See: https://adonisjs.com/docs/4.1/mail

```javascript
const Email = use('Adonis/Notify/Email');

const payload = {
  email: 'user@domain.com.br',
  template: 'your.edge.template',
  variables: {
    foo: 'bar',
    bar: 'foo',
  },
  subject: 'tem um paciente mudi querendo marcar uma consulta :)',
};

Email.send(payload);
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.