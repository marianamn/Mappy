/* globals module */
const COUNTRIES_PER_PAGE = 12;

module.exports = function(params) {
    let { data, validator } = params;

    return {
        allCountries(req, res) {
            let page = Number(req.query.page);

            data.getAllCountries({ page, pageSize: COUNTRIES_PER_PAGE })
                .then(result => {
                    let user = req.user;
                    let {
                        countries,
                        count
                    } = result;

                    if (count === 0) {
                        res.render("countries/all-countries", {
                            model: countries,
                            user,
                            params: { page, pages: 0 }
                        });
                    }

                    if (page < 1) {
                        return res.redirect("/countries?page=1");
                    }

                    let pages = count / COUNTRIES_PER_PAGE;
                    if (parseInt(pages, 10) < pages) {
                        pages += 1;
                        pages = parseInt(pages, 10);
                    }

                    if (page > pages) {
                        page = pages;
                        return res.redirect(`/countries?page=${page}`);
                    }

                    return res.render("countries/all-countries", {
                        model: countries,
                        user,
                        params: { page, pages }
                    });
                });
        },
        countryDetails(req, res) {
            let id = req.params.id;
            if (!validator.validateIsStringValid(id)) {
                return res.redirect("/countries");
            }

            data.getCountryById(id)
                .then(country => {
                    if (!country) {
                        return res.redirect("/countries");
                    }
                    let user = req.user;

                    res.render("countries/detail-country", {
                        country,
                        user
                    });
                })
                .catch(() => {
                    res.redirect("/countries");
                });
        },
        getAllCountriesNames(req, res) {
            data.getAllCountryNames()
                .then(countriesNames => {
                    res.json({ countriesNames });
                });
        }
    };
};