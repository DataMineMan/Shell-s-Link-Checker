/**
 * @title   Shell's Link Checker
 * @author  Jon Taylor
 * @since   0.2
 */
'use strict';
const crypto = require('crypto');

const User = class User {
  constructor() {
    this.id = null;
    this.firstName = null;
    this.lastName = null;
    this.email = null;
    this.username = null;
    this.socket = null;
    this.page = null;
    this.session = null;
    this.error = null;
  }
  data() {
    return {
      id: this.id,
      firstName: this.firstName,
      lastName: this.lastName,
      email: this.email,
      username: this.username,
      page: this.page,
      socket: this.socket
    }
  }
  createToken() {
    let
      user = this.data(),
      token = {
        expires: new Date().getTime()+86400000,
        user: user
    };
    this.session = encrypt(token);
    return this;
  }
  readToken(token) {
    let untoken = null;
    try {
      untoken = decrypt(token)
    } catch(err) {
      this.error = 'Token not recognized.';
      return this;
    }
    if(new Date().getTime() > untoken.expires) {
      this.error = 'Token has expired.';
      return this;
    }
    this.id = untoken.user.id;
    this.firstName = untoken.user.firstName;
    this.lastName = untoken.user.lastName;
    this.email = untoken.user.email;
    this.username = untoken.user.username;
    this.session = token;
    return this;
  }
};

module.exports = User;

function encrypt(token) {
  let algorithm = 'aes-256-ctr',
    password = 'NoMoreSecrets!!!',
    cipher = crypto.createCipher(algorithm, password),
    encrypted = cipher.update(JSON.stringify(token), 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return Buffer.from(encrypted, 'ascii').toString('base64');
}
function decrypt(encryption) {
  let algorithm = 'aes-256-ctr',
    password = 'NoMoreSecrets!!!',
    decipher = crypto.createDecipher(algorithm, password),
    decrypted = decipher.update(Buffer.from(encryption, 'base64').toString('ascii'), 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return JSON.parse(decrypted);
}