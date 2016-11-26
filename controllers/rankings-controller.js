/* globals module */

module.exports = function(data) {
    return {
        ranking(req, res) {
            return res.render("rankings/ranking");
        }
    };
};