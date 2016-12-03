/* globals require describe it beforeEach afterEach*/

const chai = require("chai");
const sinonModule = require("sinon");

let expect = chai.expect;

describe("Test chat data", () => {
    let sinon;
    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    class Chat {
        constructor(properties) {
            this.user = properties.user;
            this.answer = properties.answer;
            this.datetime = properties.datetime;
        }

        save() {}

        static find() {
            return this;
        }

        static sort() {
            return this;
        }

        static limit() {
            return this;
        }

        static exec() {}
    }

    let data = require("../../data/chat-data")({ Chat });

    describe("createChatMessage()", () => {
        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return new chat message", done => {
            sinon.stub(Chat.prototype, "save", cb => {
                cb(null);
            });

            let answer = "Hello there";
            data.createChatMessage("Smith", answer, new Date())
                .then(actualMessage => {
                    expect(actualMessage.answer).to.equal(answer);
                    done();
                });
        });
    });

    describe("getLatestMessages()", () => {
        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return 3 messages", done => {
            let latestMessages = ["Hello", "Hello there", "Bye"];

            sinon.stub(Chat, "exec", cb => {
                cb(null, latestMessages);
            });

            data.getLatestMessages()
                .then(messages => {
                    expect(messages).to.be.eql(latestMessages);
                    done();
                });
        });
    });
});