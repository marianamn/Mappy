/* globals module */

module.exports = function(params) {
    let { data } = params;
    return {
        endSession(req, res) {
            data.createAnalytics(req.session);
            req.session.destroy();
        }
    };
};