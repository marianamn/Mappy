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

    class Validator {
        static validateIsStringValid() { }

        static validateStringLength() {
            // return min < value.length && value.length < max;
        }

        static validateIfNumber() {
            // return typeof number === "number";
        }

        static validateEmail() {
            // return email.match(emailRegex);
        }

        static validateImageUrl() {
            // return imageUrl.match(imgURLPattern);
        }
    }

    let data = require("../data/question-data")({ Question }, Validator);

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

        beforeEach(() => {
            sinon.stub(Validator, "validateIsStringValid", (value) => {
                if (value) {
                    let valueToCheck = value.trim();
                    return valueToCheck !== "";
                }

                return false;
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to throw then question title is empty", done => {
            data.createQuestion("", [], "England")
                .catch(err => {
                    expect(err).to.be.equal("Question name fail");
                    done();
                });
        });
    });

    // describe("Test createFraction()", () => {
    //     afterEach(() => {
    //         sinon.restore();
    //     });

    //     // it("Expect to save the fraction", done => {
    //     //     sinon.stub(Fraction.prototype, "save", cb => {
    //     //         cb(null);
    //     //     });

    //     //     let name = "John's group";
    //     //     data.createFraction(name, "Good", [], [])
    //     //         .then(actualFraction => {
    //     //             expect(actualFraction.name).to.equal(name);
    //     //             done();
    //     //         });
    //     // });

    //     // it("Expect to fail, when name is empty", done => {
    //     //     sinon.stub(Fraction.prototype, "save", cb => {
    //     //         cb(null);
    //     //     });

    //     //     let name = "";
    //     //     data.createFraction(name, "Good", [], [])
    //     //         .catch(err => {
    //     //             expect(err).not.to.be.null;
    //     //             done();
    //     //         });
    //     // });

    //     // it("Expect to fail, when alignment is empty", done => {
    //     //     sinon.stub(Fraction.prototype, "save", cb => {
    //     //         cb(null);
    //     //     });

    //     //     let name = "";
    //     //     data.createFraction(name, "Good", [], [])
    //     //         .catch(err => {
    //     //             expect(err).not.to.be.null;
    //     //             done();
    //     //         });
    //     // });

    //     // it("Expect to fail, when alignment is invalid", done => {
    //     //     // Good, Evil, Neutral
    //     //     sinon.stub(Fraction.prototype, "save", cb => {
    //     //         cb(null);
    //     //     });

    //     //     let name = "";
    //     //     data.createFraction(name, "Good", [], [])
    //     //         .catch(err => {
    //     //             expect(err).not.to.be.null;
    //     //             done();
    //     //         });
    //     // });

    // });
});