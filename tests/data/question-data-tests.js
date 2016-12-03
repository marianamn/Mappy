/* globals require describe it beforeEach afterEach*/

const chai = require("chai");
const sinonModule = require("sinon");

let expect = chai.expect;

describe("Test question data", () => {
    let sinon;
    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    class Question {
        constructor(properties) {
            this.question = properties.question;
            this.answers = properties.answers;
            this.country = properties.country;
        }

        save() { }

        static find() { }
        static findOne() { }
    }

    class Country {
        static findOne() { }
    }

    class Validator {
        static validateIsStringValid() { }
        static validateStringLength() { }
        static validateIfNumber() { }
        static validateEmail() { }
        static validateImageUrl() { }
    }

    let data = require("../../data/question-data")({ Question, Country }, Validator);

    describe("getQuestionById(id)", () => {
        let existingQuestionId = 1;

        let question = {
            _id: existingQuestionId,
            name: "First"
        };

        let questions = [question];

        beforeEach(() => {
            sinon.stub(Question, "findOne", (query, cb) => {
                let id = query._id;
                let foundQuestion = questions.find(quest => quest._id === id);
                cb(null, foundQuestion);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return the question", done => {
            data.getQuestionById(existingQuestionId)
                .then(actualFraction => {
                    expect(actualFraction).to.equal(question);
                    done();
                });
        });

        it("Expect to return null, when no question with the id", done => {
            data.getQuestionById(2)
                .then(actualFraction => {
                    expect(actualFraction).to.equal(null);
                    done();
                });
        });
    });

    describe("Test getQuestionsIdsByCountry()", () => {
        let expectedCountry = "Bulgaria";
        let expectedQuestionIds = [1, 3];

        let questions = [
            {
                _id: 1,
                country: "Bulgaria"
            },
            {
                _id: 2,
                country: "Peru"
            },
            {
                _id: 3,
                country: "Bulgaria"
            }];

        beforeEach(() => {
            sinon.stub(Question, "find", (query, searchProperty, cb) => {
                let country = query.country;
                let foundQuestionIds = questions.filter(quest => quest.country === country).map(q => q._id);
                cb(null, foundQuestionIds);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return array with ids 1 and 3", done => {
            data.getQuestionsIdsByCountry(expectedCountry)
                .then(questionIds => {
                    expect(questionIds).to.eql(expectedQuestionIds);
                    done();
                });
        });

        it("Expect to return empty array", done => {
            data.getQuestionsIdsByCountry("England")
                .then(questionIds => {
                    expect(questionIds).to.eql([]);
                    done();
                });
        });
    });

    describe("Test createQuestion()", () => {
        let countries = [{ name: "Peru" }];

        beforeEach(() => {
            sinon.stub(Validator, "validateIsStringValid", () => {
                return true;
            });

            sinon.stub(Validator, "validateStringLength", () => {
                return true;
            });

            sinon.stub(Validator, "validateIfNumber", () => {
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

        it("Expect to save the question", done => {
            sinon.stub(Country, "findOne", (query, cb) => {
                let queryCountry = query.name;
                let foundCountry = countries.find(country => country.name === queryCountry);
                cb(null, foundCountry);
            });

            sinon.stub(Question.prototype, "save", cb => {
                cb(null);
            });

            let name = "Test question";
            data.createQuestion(name, [{ isCorrect: true }], "Peru")
                .then(actualQuestion => {
                    expect(actualQuestion.question).to.equal(name);
                    done();
                });
        });

        it("Expect to fail, when country is not found", done => {
            sinon.stub(Country, "findOne", (query, cb) => {
                let queryCountry = query.name;
                let foundCountry = countries.find(country => country.name === queryCountry);
                cb(null, foundCountry);
            });

            sinon.stub(Question.prototype, "save", cb => {
                cb(null);
            });

            let name = "Test";
            data.createQuestion(name, [{ isCorrect: true }], "England")
                .then(err => {
                    expect(err).to.be.equal("Country not found");
                    done();
                });
        });
    });
});