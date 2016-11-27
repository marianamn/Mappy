/* globals module */

module.exports = function (data) {
    return {
        getTestKnowledgeQuestion(req, res) {
            return res.render("map/test-your-knowledge-map", {});
        }
    };
};