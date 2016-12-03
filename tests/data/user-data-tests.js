/* globals require describe it beforeEach afterEach */

const chai = require("chai");
const sinonModule = require("sinon");

let expect = chai.expect;

describe("Test user data", () => {
    let sinon;
    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    class User {
        constructor(properties) {
            this.id = properties.id || 1;
            this.username = properties.username;
            this.firstName = properties.firstName;
            this.lastName = properties.lastName;
            this.email = properties.email;
            this.profileImgURL = properties.profileImgURL;
            this.salt = properties.salt;
            this.hashPass = properties.hashPass;
        }

        save() { }

        static findOne() { }
    }

    class Validator {
        static validateIsStringValid() { }
        static validateStringLength() { }
        static validateIfNumber() { }
        static validateEmail() { }
        static validateImageUrl() { }
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


});