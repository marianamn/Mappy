/* globals module */

const DEFAULT_PAGE = 1,
    PAGE_SIZE = 10;

module.exports = function (data) {
    return {
        search(req, res) {
            let pattern = req.query.pattern || "";
            let page = Number(req.query.page || DEFAULT_PAGE);

            // resolve some promises and
            // .then((result) => {
            //     retur res.render("search/search", { objectModelForRendering });
            // });

        }
    };
};