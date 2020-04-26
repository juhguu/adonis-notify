'use strict';

class Email {
  constructor(Config, Mail) {
    this.Config = Config;
    this.Mail = Mail;
  }

  async send({ email, template, variables, subject }) {
    await this.Mail.send(template, variables, message => {
      message
        .to(email)
        .from(this.Config.email.sender)
        .subject(subject);
    });
  }
}

module.exports = Email;
