/* globals require describe it beforeEach afterEach */

const chai = require("chai");
const sinonModule = require("sinon");
const encrypt = require("../../utils/encryption");

let expect = chai.expect;

describe("Test user data", () => {
    let sinon;
    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    class User {
        constructor(properties) {
            this.id = properties.id || 1;
            this.testYourKnowledgeScore = properties.testYourKnowledgeScore || 0;
            this.guessTheCountryScore = properties.guessTheCountryScore || 0;
            this.username = properties.username;
            this.firstName = properties.firstName;
            this.lastName = properties.lastName;
            this.email = properties.email;
            this.profileImgURL = properties.profileImgURL;
            this.salt = properties.salt;
            this.hashPass = properties.hashPass;
        }

        save() {}

        static findOne() {}
        static findById() {}
    }

    class Validator {
        static validateIsStringValid() {}
        static validateStringLength() {}
        static validateIfNumber() {}
        static validateEmail() {}
        static validateImageUrl() {}
    }

    let data = require("../../data/user-data")({ User }, Validator);

    describe("createuser()", () => {
        let username = "testuser";
        let firstName = "testFirstName";
        let lastName = "testLastName";
        let email = "testEmail";
        let profileImgURL = "http://test";
        let hashPass = "testHashpass";
        let salt = "testsalt";

        let expectedUser = new User({
            username,
            firstName,
            lastName,
            email,
            profileImgURL,
            hashPass,
            salt
        });
        beforeEach(() => {
            sinon.stub(User.prototype, "save", cb => {
                cb(null, expectedUser);
            });
        });


        describe("createUser() if all properties are valid", () => {
            beforeEach(() => {
                sinon.stub(Validator, "validateIsStringValid", () => {
                    return true;
                });
                sinon.stub(Validator, "validateStringLength", () => {
                    return true;
                });
                sinon.stub(Validator, "validateEmail", () => {
                    return true;
                });
                sinon.stub(Validator, "validateImageUrl", () => {
                    return true;
                });
            });

            afterEach(() => {
                sinon.restore();
            });

            it("Expect to get created user if all properties are valid", done => {
                data.createUser(username, firstName, lastName, email, profileImgURL, salt, hashPass)
                    .then(resUser => {
                        expect(resUser).to.be.eql(expectedUser);
                        done();
                    });
            });

            it("Expect returned user not to be null", done => {
                data.createUser(username, firstName, lastName, email, profileImgURL, salt, hashPass)
                    .then(resUser => {
                        expect(resUser).not.to.be.eql(null);
                        done();
                    });
            });
        });

        describe("createUser() if properties are not valid", () => {
            afterEach(() => {
                sinon.restore();
            });

            it("Expect to reject if some property is not valid string", done => {
                sinon.stub(Validator, "validateIsStringValid", () => {
                    return false;
                });
                sinon.stub(Validator, "validateStringLength", () => {
                    return true;
                });
                sinon.stub(Validator, "validateEmail", () => {
                    return true;
                });
                sinon.stub(Validator, "validateImageUrl", () => {
                    return true;
                });

                data.createUser(username, firstName, lastName, email, profileImgURL, salt, hashPass)
                    .catch((errMsg) => {
                        expect(errMsg).not.to.be.equal(null);
                        done();
                    });
            });

            it("Expect to reject if some property is with valid string length", done => {
                sinon.stub(Validator, "validateIsStringValid", () => {
                    return true;
                });
                sinon.stub(Validator, "validateStringLength", () => {
                    return false;
                });
                sinon.stub(Validator, "validateEmail", () => {
                    return true;
                });
                sinon.stub(Validator, "validateImageUrl", () => {
                    return true;
                });

                data.createUser(username, firstName, lastName, email, profileImgURL, salt, hashPass)
                    .catch((errMsg) => {
                        expect(errMsg).not.to.be.equal(null);
                        done();
                    });
            });

            it("Expect to reject if email is not valid", done => {
                sinon.stub(Validator, "validateIsStringValid", () => {
                    return true;
                });
                sinon.stub(Validator, "validateStringLength", () => {
                    return true;
                });
                sinon.stub(Validator, "validateEmail", () => {
                    return false;
                });
                sinon.stub(Validator, "validateImageUrl", () => {
                    return true;
                });

                data.createUser(username, firstName, lastName, email, profileImgURL, salt, hashPass)
                    .catch((errMsg) => {
                        expect(errMsg).not.to.be.equal(null);
                        done();
                    });
            });

            it("Expect to reject if profile img is not valid", done => {
                sinon.stub(Validator, "validateIsStringValid", () => {
                    return true;
                });
                sinon.stub(Validator, "validateStringLength", () => {
                    return true;
                });
                sinon.stub(Validator, "validateEmail", () => {
                    return true;
                });
                sinon.stub(Validator, "validateImageUrl", () => {
                    return false;
                });

                data.createUser(username, firstName, lastName, email, profileImgURL, salt, hashPass)
                    .catch((errMsg) => {
                        expect(errMsg).not.to.be.equal(null);
                        done();
                    });
            });

            it("Expect to reject correct message if salt is null", done => {
                sinon.stub(Validator, "validateIsStringValid", () => {
                    return true;
                });
                sinon.stub(Validator, "validateStringLength", () => {
                    return true;
                });
                sinon.stub(Validator, "validateEmail", () => {
                    return true;
                });
                sinon.stub(Validator, "validateImageUrl", () => {
                    return true;
                });

                data.createUser(username, firstName, lastName, email, profileImgURL, null, hashPass)
                    .catch((errMsg) => {
                        expect(errMsg).to.be.equal("Salt must exists");
                        done();
                    });
            });

            it("Expect to reject correct message if hashPass is null", done => {
                sinon.stub(Validator, "validateIsStringValid", () => {
                    return true;
                });
                sinon.stub(Validator, "validateStringLength", () => {
                    return true;
                });
                sinon.stub(Validator, "validateEmail", () => {
                    return true;
                });
                sinon.stub(Validator, "validateImageUrl", () => {
                    return true;
                });

                data.createUser(username, firstName, lastName, email, profileImgURL, salt, null)
                    .catch((errMsg) => {
                        expect(errMsg).to.be.equal("Hash pass must exists");
                        done();
                    });
            });
        });
    });

    describe("createFacebookUser()", () => {
        let username = "testuser";
        let firstName = "testFirstName";
        let lastName = "testLastName";
        let profileImgURL = "http://test";
        let facebookId = "aksjhdaskhdasjk";

        let expectedFbUser = new User({
            username,
            firstName,
            lastName,
            profileImgURL,
            facebookId
        });
        beforeEach(() => {
            sinon.stub(User.prototype, "save", cb => {
                cb(null, expectedFbUser);
            });
        });

        describe("createFacebookUser() with valid properties", () => {
            beforeEach(() => {
                sinon.stub(Validator, "validateIsStringValid", () => {
                    return true;
                });
                sinon.stub(Validator, "validateStringLength", () => {
                    return true;
                });
                sinon.stub(Validator, "validateImageUrl", () => {
                    return true;
                });
            });

            afterEach(() => {
                sinon.restore();
            });

            it("Expect to return correct user when all properties are valid", done => {
                data.createFacebookUser(username, firstName, lastName, profileImgURL, facebookId)
                    .then((resUser) => {
                        expect(resUser).to.be.eql(expectedFbUser);
                        done();
                    });
            });

            it("Expect to returned user not to be null", done => {
                data.createFacebookUser(username, firstName, lastName, profileImgURL, facebookId)
                    .then((resUser) => {
                        expect(resUser).not.to.be.eql(null);
                        done();
                    });
            });
        });

        describe("createFacebookUser() with some invalid properties", () => {
            afterEach(() => {
                sinon.restore();
            });

            it("Expect to reject if some of properties is invalid string", done => {
                sinon.stub(Validator, "validateIsStringValid", () => {
                    return false;
                });
                sinon.stub(Validator, "validateStringLength", () => {
                    return true;
                });
                sinon.stub(Validator, "validateImageUrl", () => {
                    return true;
                });

                data.createFacebookUser(username, firstName, lastName, profileImgURL, facebookId)
                    .catch((errMsg) => {
                        expect(errMsg).not.to.be.equal(null);
                        done();
                    });
            });

            it("Expect to reject if some of properties is with invalid string length", done => {
                sinon.stub(Validator, "validateIsStringValid", () => {
                    return true;
                });
                sinon.stub(Validator, "validateStringLength", () => {
                    return false;
                });
                sinon.stub(Validator, "validateImageUrl", () => {
                    return true;
                });

                data.createFacebookUser(username, firstName, lastName, profileImgURL, facebookId)
                    .catch((errMsg) => {
                        expect(errMsg).not.to.be.equal(null);
                        done();
                    });
            });

            it("Expect to reject if profileImg is not valid", done => {
                sinon.stub(Validator, "validateIsStringValid", () => {
                    return true;
                });
                sinon.stub(Validator, "validateStringLength", () => {
                    return true;
                });
                sinon.stub(Validator, "validateImageUrl", () => {
                    return false;
                });

                data.createFacebookUser(username, firstName, lastName, profileImgURL, facebookId)
                    .catch((errMsg) => {
                        expect(errMsg).not.to.be.equal(null);
                        done();
                    });
            });
        });
    });

    describe("updateUser()", () => {
        let username = "testuser";
        let firstName = "testFirstName";
        let lastName = "testLastName";
        let email = "testEmail";
        let profileImgURL = "http://test";

        let expectedUser = new User({
            username,
            firstName,
            lastName,
            email,
            profileImgURL
        });

        describe("updateUser should change properties if user is found", () => {
            beforeEach(() => {
                sinon.stub(User.prototype, "save", cb => {
                    cb(null, expectedUser);
                });
                sinon.stub(User, "findOne", (_, cb) => {
                    cb(null, expectedUser);
                });
            });

            afterEach(() => {
                sinon.restore();
            });

            it("Expect profileImg to be changed", done => {
                let expectedProfileImg = "http://changed";
                data.updateUser({ profileImgURL: expectedProfileImg })
                    .then(resUser => {
                        expect(resUser.profileImgURL).to.be.equal(expectedProfileImg);
                        done();
                    });
            });

            it("Expect firstName to be changed", done => {
                let expectedFirstName = "changedFirstname";
                data.updateUser({ firstName: expectedFirstName })
                    .then(resUser => {
                        expect(resUser.firstName).to.be.equal(expectedFirstName);
                        done();
                    });
            });

            it("Expect lastname to be changed", done => {
                let expectedLastName = "changedLastname";
                data.updateUser({ lastName: expectedLastName })
                    .then(resUser => {
                        expect(resUser.lastName).to.be.equal(expectedLastName);
                        done();
                    });
            });

            it("Expect email to be changed", done => {
                let expectedemail = "changedEmail";
                data.updateUser({ email: expectedemail })
                    .then(resUser => {
                        expect(resUser.email).to.be.equal(expectedemail);
                        done();
                    });
            });
        });

        describe("update user() should reject if user is not found", () => {
            beforeEach(() => {
                sinon.stub(User.prototype, "save", cb => {
                    cb(null, expectedUser);
                });
                sinon.stub(User, "findOne", (_, cb) => {
                    cb(null, null);
                });
            });

            afterEach(() => {
                sinon.restore();
            });

            it("Expect to reject if user is null", done => {
                data.updateUser({ lastname: "test" })
                    .catch(errMsg => {
                        expect(errMsg).to.be.equal("User is not found");
                        done();
                    });
            });
        });
    });

    describe("increaseUserScore", () => {
        let id = 1;
        let username = "testuser";
        let firstName = "testFirstName";
        let lastName = "testLastName";
        let email = "testEmail";
        let profileImgURL = "http://test";
        let guessTheCountryScore = 0;
        let testYourKnowledgeScore = 0;

        let expectedUser = new User({
            id,
            username,
            firstName,
            lastName,
            email,
            profileImgURL,
            guessTheCountryScore,
            testYourKnowledgeScore
        });
        let guessTheCountryScoreType = "guessTheCountryScore";
        let testYourKnowledgeScoreType = "testYourKnowledgeScore";
        let increasingValue = 1;

        describe("increaseUserScore when cannot find user", () => {
            beforeEach(() => {
                sinon.stub(User, "findById", (_, cb) => {
                    cb(null, null);
                });
            });

            afterEach(() => {
                sinon.restore();
            });

            it("Expect to reject with correcct message when cannot find user", done => {
                data.increaseUserScore(null, guessTheCountryScoreType, increasingValue)
                    .catch((msgErr) => {
                        expect(msgErr).to.be.equal("User cannot be found");
                        done();
                    });
            });
        });

        describe("increaseUserScore when user is found", () => {
            beforeEach(() => {
                sinon.stub(User, "findById", (_, cb) => {
                    cb(null, expectedUser);
                });
            });

            afterEach(() => {
                sinon.restore();
            });

            it("Expect to reject with correct message when score type is not valid", done => {
                data.increaseUserScore(null, "notCorrectScoreType", increasingValue)
                    .catch((msgErr) => {
                        expect(msgErr).to.be.equal("Score type is not correct");
                        done();
                    });
            });

            it("Expect to reject with correct message when incresing value is negative", done => {
                data.increaseUserScore(null, guessTheCountryScoreType, -1)
                    .catch((msgErr) => {
                        expect(msgErr).to.be.equal("Increasing value is not correct");
                        done();
                    });
            });

            it("Expect to increase guess the country score when all params are valid", done => {
                sinon.stub(User.prototype, "save", cb => {
                    cb(null, expectedUser);
                });
                data.increaseUserScore(null, guessTheCountryScoreType, increasingValue)
                    .then((resExpectedUser) => {
                        expect(resExpectedUser.guessTheCountryScore).to.be.equal(1);
                        done();
                    });
            });

        });
    });

    describe("getUserById", () => {
        let username = "testuser1";
        let firstName = "testFirstName1";
        let lastName = "testLastName1";
        let email = "testEmail1";
        let profileImgURL = "http://test1";

        let expectedUser1 = new User({
            id: 1,
            username,
            firstName,
            lastName,
            email,
            profileImgURL
        });

        let username2 = "testuser2";
        let firstName2 = "testFirstName2";
        let lastName2 = "testLastName2";
        let email2 = "testEmail2";
        let profileImgURL2 = "http://test2";

        let expectedUser2 = new User({
            id: 2,
            username2,
            firstName2,
            lastName2,
            email2,
            profileImgURL2
        });

        let users = [expectedUser1, expectedUser2];

        beforeEach(() => {
            sinon.stub(User, "findById", (id, cb) => {
                let foundUser = users.find(u => u.id === id);
                cb(null, foundUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to find correct user", done => {
            let existingId = 1;

            data.getUserById(existingId)
                .then(resUser => {
                    expect(resUser).to.eql(expectedUser1);
                    done();
                });
        });
    });
});