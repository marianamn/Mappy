/* globals require describe it beforeEach afterEach before */

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

    let countries = [spain, switzerland];

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

    // describe("Test getAllCountries", () => {
    //     beforeEach(() => {
    //         sinon.stub(Country, "exec", cb => {
    //             let foundCountries = countries.sort(c => c.name).limit(12);
    //             cb(null, foundCountries);
    //         });

    //         sinon.stub(Country, "count", ())
    //     });

    //     afterEach(() => {
    //         sinon.restore();
    //     });

    //     it("Expect")
    // });

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
        before(() => {
            sinon.stub(Country, "findOne", (query, cb) => {
                let euValue = query.euValue;
                let foundCountry = countries.find(c => c.euValue === euValue);
                cb(null, foundCountry);
            });
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