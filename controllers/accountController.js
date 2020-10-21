const accountModel = require("../models/accountModel.js");
const mongoose = require("../models/connectMongo.js").mongoose;

class accountController {
  constructor() {
    if (accountController.exist) {
      return accountController.instance;
    }

    this._accountModel = accountModel;
    this.accountModelInstance = new accountModel();
    accountController.instance = this;

    accountController.exist = true;

    return this;
  }

  async registerAccount(user) {
    let usernameRegex = /^[a-z0-9]+$/;

    if (!usernameRegex.test(user.username)) {
      return 0;
    }

    //password should be longer than 5 and string
    if (user.password.length < 5 || typeof user.password !== "string") {
      return 2;
    }

    //check the username already exist
    let isUsernameExist = await this.checkUser(user.username);

    if (isUsernameExist) return 3;

    let account = new accountModel({
      username: user.username,
      password: user.password,
      email: user.email,
      role: user.role,
    });
    //encrypt it with hash
    account.password = account.generateHash(account.password);

    await accountModel.collection.insertOne(account).catch((err) => {
      if (err) {
        throw err;
      }
    });
    return 1;
  }

  async checkUser(username) {
    //check the username already exist
    return await accountModel.exists({ username: username }).catch((err) => {
      if (err) throw err;
    });
  }

  async signIn({ username, password }) {
    //password is not a string consider as wrong password
    if (typeof password !== "string") {
      return 0;
    }

    let jsonDoc = await accountModel.findOne({ username: username }).lean();

    //user not not exisiting
    if (!jsonDoc) {
      return 2;
    }

    //check password if passwords is wrong
    if (!this.accountModelInstance.compareHash(password, jsonDoc.password)) {
      return 0;
    }

    return 1;
  }

  //get email
  async getEmail(username) {
    let emailJson = await accountModel.findOne({ username: username }).lean();
    if (!emailJson) {
      return "";
    }
    return emailJson.email;
  }

  //get user info JSON
  async getInfoJSON(username) {
    let userJson = await accountModel.findOne({ username: username }).lean();
    if (!userJson) {
      return "";
    }
    return JSON.stringify({
      username: userJson.username,
      email: userJson.email,
      role: userJson.role,
    });
  }

  //get user info
  async getInfo(username) {
    let userJson = await accountModel.findOne({ username: username }).lean();
    if (!userJson) {
      return "";
    }
    return JSON.parse(userJson);
  }

  //get role
  async getRole(username) {
    let roleJson = await accountModel.findOne({ username: username }).lean();
    if (!roleJson) {
      return "";
    }
    return roleJson.role;
  }

  //delete every documents
  async deleteAccount(username) {
    const session = await mongoose.startSession();
    session.startTransaction();

    await accountModel.deleteOne({ username: username }).session(session);

    await session.commitTransaction();
    session.endSession();
  }

  //delete every documents
  async deleteEveryAccount() {
    await accountModel.deleteMany({});
  }
}

module.exports = accountController;
