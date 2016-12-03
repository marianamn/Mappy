/* globals require describe it beforeEach afterEach*/

const chai = require("chai");
const sinonModule = require("sinon");

let expect = chai.expect;

describe("Test authentication data", () => {
    let sinon;
    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    class User {
        static findOne() { }
    }

    class Validator {

    }

    let data = require("../../data/auth-data")({ User }, Validator);

    describe("getUserByCredentials(username)", () => {
        let existingUsername = "John";

        let users = [{ username: "John" }];

        beforeEach(() => {
            sinon.stub(User, "findOne", (query, cb) => {
                let username = query.username;
                let foundUser = users.find(user => user.username === username);
                cb(null, foundUser);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return user", done => {
            data.getUserByCredentials(existingUsername)
                .then(foundUser => {
                    expect(foundUser.username).to.be.equal(existingUsername);
                    done();
                });
        });

        it("Expect to return null if user not found", done => {
            data.getUserByCredentials("Smith")
                .then(foundUser => {
                    expect(foundUser).to.be.null;
                    done();
                });
        });
    });
});