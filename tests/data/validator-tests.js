/* globals require describe it */

const chai = require("chai");
let expect = chai.expect;

describe("Test chat data", () => {
    let validator = require("../../utils/validator");

    describe("validateIsStringValid()", () => {
        it("Expect to return true when string is valid", () => {
            let result = validator.validateIsStringValid("Smith");
            expect(result).to.be.true;
        });

        it("Expect to return false when string is empty", () => {
            let result = validator.validateIsStringValid("");
            expect(result).to.be.false;
        });

        it("Expect to return false when string is null", () => {
            let result = validator.validateIsStringValid(null);
            expect(result).to.be.false;
        });

        it("Expect to return false when string is undefined", () => {
            let result = validator.validateIsStringValid(undefined);
            expect(result).to.be.false;
        });
    });

    describe("validateStringLength()", () => {
        it("Expect to return true when string is in valid range", () => {
            let result = validator.validateStringLength("Smith", 3, 10);
            expect(result).to.be.true;
        });

        it("Expect to return false when string is smaller than min", () => {
            let result = validator.validateStringLength("Sm", 3, 10);
            expect(result).to.be.false;
        });

        it("Expect to return false when string is bigger than max", () => {
            let result = validator.validateStringLength("SmithSmith50", 3, 10);
            expect(result).to.be.false;
        });
    });

    describe("validateIfNumber()", () => {
        it("Expect to return true if value is of type number", () => {
            let result = validator.validateIfNumber(3);
            expect(result).to.be.true;
        });

        it("Expect to return false if value is not of type number", () => {
            let result = validator.validateIfNumber("Not a number");
            expect(result).to.be.false;
        });
    });

    describe("validateEmail()", () => {
        it("Expect to return true if value is valid email", () => {
            let result = validator.validateEmail("test@email.bg");
            expect(result).to.be.true;
        });

        it("Expect to return false if value is not valid email", () => {
            let result = validator.validateEmail("test@email");
            expect(result).to.be.false;
        });
    });

    describe("validateImageUrl()", () => {
        it("Expect to return true if value is valid image url", () => {
            let result = validator.validateImageUrl("somewebsite://someimage.bg");
            expect(result).to.be.true;
        });

        it("Expect to return false if value is not valid email", () => {
            let result = validator.validateImageUrl("invalid image url");
            expect(result).to.be.false;
        });
    });
});