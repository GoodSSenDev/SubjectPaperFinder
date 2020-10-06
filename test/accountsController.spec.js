const close = require("../models/connectMongo").close;
const assert = require("assert");
const { getMaxListeners } = require("process");
const accountController = require("../controllers/accountController.js");


before(() => {
    //delete test data in testDatabase
    accountController.deleteEveryAccount();
    //insert test data

    const dummyAccount = {
        username: 'uki',
        password: 'qwerqwer',
        email: 'dummyemail@gmail.com',
        role: 'user'
    }
    accountController.registerAccount(dummyAccount);

});



describe("account Control test", function () {
    it("Account Controller should registers an user.", async function () {
        setTimeout(() => { }, 300);
        assert.strictEqual(accountController.checkUser('uki'), true
            , "Can not find dummy data on data base");
        setTimeout(() => { }, 300);
    });

    it("Account Controller should return (0)false when user type wrong password.", async function () {
        assert.strictEqual(accountController.signIn('uki', 'qwerqwek'), 0
            , "Cannot check wrong password");
        setTimeout(() => { }, 300);
    });

    it("Account Controller should return (1)true when user type right password.", async function () {
        assert.strictEqual(accountController.signIn('uki', 'qwerqwek'), 1
            , "Cannot check right password");
        setTimeout(() => { }, 300);
    });

    it("Account Controller should return (2)unidentified when user type right password.", async function () {
        assert.strictEqual(accountController.signIn('hoki', 'qwerqwek'), 2
            , "Cannot check undefined username");
        setTimeout(() => { }, 300);
    });

    it("Account Controller should return '' if user is not exisit while getting email", async function () {
        assert.strictEqual(accountController.getEmail('hoki'), ''
            , "Cannot return '' when getting email of undefined user");
        setTimeout(() => { }, 300);
    });
    it("Account Controller should return email of user", async function () {
        assert.strictEqual(accountController.getEmail('uki'), 'dummyemail@gmail.com'
            , "Cannot return correct email");
        setTimeout(() => { }, 300);
    });

    it("Account Controller should delete the user.", async function () {
        accountController.deleteAccount('uki');
        setTimeout(() => { }, 500);
        assert.strictEqual(accountController.checkUser('uki'), false
            , "Cannot delete the dummy data in the data base");
        setTimeout(() => { }, 300);

    });

});

after(() => {
    accountController.deleteEveryAccount();
    close();
})