const cookieParser = require('cookie');
const identificator = process.env.COOKIE_NAME;

function formCookie(request) {
    let cookies = cookieParser.parse(request.headers.cookie);

    if (cookies[identificator] !== undefined) {
        return `${identificator}=${cookies[identificator]}`;
    }
    else {
        return `${identificator}=${request.body.id}`;
    }
}

function fetchCookie(request) {
    let cookies = cookieParser.parse(request.headers.cookie);

    return cookies[identificator].toString();
}

module.exports = {
    formCookie,
    fetchCookie,
};
