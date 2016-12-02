/* globals module */

module.exports = function(params) {
    let { data, validator } = params;
    return {
        getAllAnalytics(req, res) {
            data.getAllAnalyticsData()
                .then(analytics => {
                    let user = req.user;

                    res.render("analytics/all-analytics-data", {
                        analytics,
                        user
                    });
                });
        },
        getAllAnalyticsPerUser(req, res) {
            let userId = req.params.userId;

            if (!validator.validateIsStringValid(userId)) {
                return res.redirect("/admin/panel");
            }

            data.getAnalyticsByUserId(userId)
                .then(userAnalytics => {
                    if (!userAnalytics) {
                        return res.redirect("/admin/panel");
                    }
                    let user = req.user;

                    res.render("analytics/detail-analytics", {
                        userAnalytics,
                        user
                    });
                })
                .catch(() => {
                    res.redirect("/admin/panel");
                });
        }
    };
};