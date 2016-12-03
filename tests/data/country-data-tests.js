/* globals require describe it beforeEach afterEach */

const chai = require("chai");
const sinonModule = require("sinon");

let expect = chai.expect;

describe("Test country data", () => {
    let sinon;
    beforeEach(() => {
        sinon = sinonModule.sandbox.create();
    });

    class Country {
        static find() {
            return this;
        }

        static findById() { }

        static findOne() { }

        static sort() {
            return this;
        }

        static limit() {
            return this;
        }

        static skip() {
            return this;
        }

        static exec() { }

        static count() { }
    }

    let data = require("../../data/country-data")({ Country });

    let spain = {
        _id: 1,
        name: "Spain",
        capital: "Madrid",
        currency: "Euro",
        euValue: 1
    };

    let switzerland = {
        _id: 2,
        name: "Switzerland",
        capital: "Bern",
        currency: "Swiss franc",
        euValue: 2
    };

    let country3 = {
        name: "A"
    };

    let country4 = {
        name: "B"
    };
    let country5 = {
        name: "C"
    };
    let country6 = {
        name: "D"
    };
    let country7 = {
        name: "E"
    };
    let country8 = {
        name: "F"
    };
    let country9 = {
        name: "G"
    };
    let country10 = {
        name: "H"
    };
    let country11 = {
        name: "I"
    };
    let country12 = {
        name: "J"
    };
    let country13 = {
        name: "K"
    };
    let country14 = {
        name: "L"
    };
    let countries = [
        spain,
        switzerland,
        country3,
        country4,
        country5,
        country6,
        country7,
        country8,
        country9,
        country10,
        country11,
        country12,
        country13,
        country14];

    describe("getAllcountryNames()", () => {
        let countryNames = ["Albania", "Bulgaria"];
        beforeEach(() => {
            sinon.stub(Country, "find", (_, __, cb) => {
                cb(null, countryNames);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return all country names", done => {
            data.getAllCountryNames()
                .then(resCountryNames => {
                    expect(resCountryNames).to.eql(countryNames);
                    done();
                });
        });
    });

    describe("Test getAllCountries", () => {
        let foundCountries = countries.sort(c => c.name).slice(0, 12);
        beforeEach(() => {
            sinon.stub(Country, "exec", cb => {
                cb(null, foundCountries);
            });

            sinon.stub(Country, "count", cb => {
                let count = countries.length;
                cb(null, count);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it(
            "Expect foundCountries to be 12 and all acountries count to be correct if no page and size params are passed",
            done => {
                let page = null;
                let pageSize = null;
                data.getAllCountries({ page, pageSize })
                    .then(result => {
                        expect(result.countries.length).to.be.equal(foundCountries.length);
                        expect(result.count).to.be.equal(result.count);
                        done();
                    });
            });
    });

    describe("getCountryById()", () => {
        beforeEach(() => {
            sinon.stub(Country, "findById", (id, cb) => {
                let foundCountry = countries.find(c => c._id === id);
                cb(null, foundCountry);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to find correct country", done => {
            let existingId = 1;

            data.getCountryById(existingId)
                .then(resCountry => {
                    expect(resCountry).to.eql(spain);
                    done();
                });
        });

        it("Expect to return null if no country with passed id", done => {
            let nonExistingId = 10;

            data.getCountryById(nonExistingId)
                .then(country => {
                    expect(country).to.equal(null);
                    done();
                });
        });
    });

    describe("getCountryByEuValue()", () => {
        beforeEach(() => {
            sinon.stub(Country, "findOne", (query, cb) => {
                let euValue = query.euValue;
                let foundCountry = countries.find(c => c.euValue === euValue);
                cb(null, foundCountry);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return correct country", done => {
            let existingEuValue = 1;
            data.getCountryByEuValue(existingEuValue)
                .then(resCountry => {
                    expect(resCountry).to.eql(spain);
                    done();
                });
        });

        it("Expect to return null if no country with passed euValue", done => {
            let existingEuValue = 10;
            data.getCountryByEuValue(existingEuValue)
                .then(resCountry => {
                    expect(resCountry).to.eql(null);
                    done();
                });
        });
    });

    describe("Test getGameData", () => {
        beforeEach(() => {
            sinon.restore();
            sinon.stub(Country, "find", (_, params, cb) => {
                let mappedObjKeys = params.split(" ");
                let mappedCountries =
                    countries
                        .map(c => {
                            return {
                                name: c[mappedObjKeys[0]],
                                euValue: c[mappedObjKeys[1]]
                            };
                        });
                cb(null, mappedCountries);
            });
        });

        afterEach(() => {
            sinon.restore();
        });

        it("Expect to return all collection with same length as all countries collection", done => {
            data.getGameData()
                .then(resGameData => {
                    expect(resGameData.length).to.be.equal(countries.length);
                    done();
                });
        });
    });
});