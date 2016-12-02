/* globals module */

function addUserAgent(req) {
    let userAgent = req.get("User-Agent");
    req.session.userAgent = userAgent;
}

function addPageBeforeLogin(req) {
    if (!req.session.pagesBeforeLogin) {
        let now = new Date();
        let datetime = now.getDate() + "/" +
            (now.getMonth() + 1) + "/" +
            now.getFullYear() +
            now.getHours() + ":" +
            now.getMinutes() + ":" +
            now.getSeconds();

        req.session.arriveTime = datetime;

        req.session.cameFrom = req.header("Referer");

        req.session.pagesBeforeLogin = [];
    }

    let pageBeforeLogin = req.originalUrl;

    req.session.pagesBeforeLogin.push(pageBeforeLogin);
}

function addPageAfterLogin(req) {
    if (!req.session.pagesAfterLogin) {
        let now = new Date();
        let datetime = now.getDate() + "/" +
            (now.getMonth() + 1) + "/" +
            now.getFullYear() +
            now.getHours() + ":" +
            now.getMinutes() + ":" +
            now.getSeconds();


        req.session.loginTime = datetime;
        req.session.pagesAfterLogin = [];
    }

    let pageAfterLogin = req.originalUrl;
    req.session.pagesAfterLogin.push(pageAfterLogin);
}

module.exports = function(req, res, next) {

    if (!req.session.userAgent) {
        addUserAgent(req);
    }

    if (!req.session.passport) {
        addPageBeforeLogin(req);
        return next();
    }

    addPageAfterLogin(req);

    console.log(req.session);

    return next();
};