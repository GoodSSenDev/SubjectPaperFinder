const accountModel = require("../models/accountModel.js");

class accountController {


    async registerAccount(user) {

        let usernameRegex = /^[a-z0-9]+$/;

        if (!usernameRegex.test(user.username)) {
            return 1;
        }

        //password should be longer than 5 and string
        if (user.password.length < 5 || typeof user.password !== "string") {
            return 2;
        }
        //check the username already exist
        accountModel.findOne({ username: user.username }, (error, exists) => {
            if (error) throw error;

            //the username already exist 
            if (exists) {
                return 3;
            }

            let account = new accountModel({
                username: user.username,
                password: user.password,
                email: user.email,
                role: user.role,
            });
            //encrypt it with hash
            account.password = account.generateHash(account.password);

            account.save(error => {
                if (error) throw error;

                return 0;
            });

        });


    }

    async checkUser(username) {
        //check the username already exist
        accountModel.findOne({ username: username }, (error, exists) => {
            if (error) throw error;

            if (exists) { return true; }

        });

        return false;
    }


    async signIn({ username, password }) {

        //password is not a string consider as wrong password
        if (typeof password !== "string") {
            return 0;
        }

        accountModel.findOne({ username: username }, (error, account) => {

            if (error) throw error;

            //user not not exisiting 
            if (!account) {
                return 2;
            }

            //check password if passwords is wrong 
            if (!account.validateHash(password)) {
                return 0;
            }

            return 1;
        });
    }

    //get email
    async getEmail(username) {

        accountModel.findOne({ username: username }, (error, account) => {

            if (error) throw error;

            //user not not exisiting 
            if (!account) {
                return "";
            }

            return account.email;
        });


    }

    //get email
    async getRole(username) {

        accountModel.findOne({ username: username }, (error, account) => {

            if (error) throw error;

            //user not not exisiting 
            if (!account) {
                return "";
            }

            return account.role;
        });
    }

    //delete every documents
    deleteEveryAccount() {
        accountModel.deleteMany({});
    }

}

module.exports.accountController = accountController;