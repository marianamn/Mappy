/* globals module */

function addUserAgent(req) {
    let userAgent = req.get("User-Agent");
    req.session.userAgent = userAgent;
}

function getTimeStamp() {
    let now = new Date();
    let datetime = now.getDate() + "/" +
        (now.getMonth() + 1) + "/" +
        now.getFullYear() +
        now.getHours() + ":" +
        now.getMinutes() + ":" +
        now.getSeconds();

    return datetime;
}

function addPageBeforeLogin(req) {
    if (!req.session.pagesBeforeLogin) {

        req.session.arriveTimeStamp = getTimeStamp();

        req.session.cameFrom = req.header("Referer");

        req.session.pagesBeforeLogin = [];
    }

    let pageBeforeLogin = req.originalUrl;

    if (pageBeforeLogin === "/api/register") {
        req.session.hasRegistered = true;
        req.session.registeredTimeStamp = getTimeStamp();
    }

    req.session.pagesBeforeLogin.push(pageBeforeLogin);
}

function addPageAfterLogin(req) {
    if (!req.session.pagesAfterLogin) {

        req.session.loginTimeStamp = getTimeStamp();

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

    return next();
};