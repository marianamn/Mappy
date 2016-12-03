/* globals module */

module.exports = function(params) {
    let { data, validator } = params;
    return {
        getAllAnalytics(req, res) {
            data.getAllAnalyticsData()
                .then(analytics => {
                    let user = req.user;

                    res.status(200).render("analytics/all-analytics-data", {
                        analytics,
                        user
                    });
                });
        },
        getAllAnalyticsPerUser(req, res) {
            let dataId = req.params.dataId;

            if (!validator.validateIsStringValid(dataId)) {
                return res.redirect("/admin/panel");
            }

            data.getAnalyticsById(dataId)
                .then(userAnalytics => {
                    if (!userAnalytics) {
                        return res.redirect("/admin/panel");
                    }
                    let user = req.user;

                    res.status(200).render("analytics/detail-analytics", {
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