/* globals module */

module.exports = function(params) {
    let { data } = params;
    return {
        endSession(req, res) {
            console.log(req.session);
            data.createAnalytics(req.session);
            req.session.destroy();
        }
    };
};