const cookieParser = require('cookie');
const identificator = process.env.COOKIE_NAME;

function formCookie(request) {
    return `${identificator}=${request.body.id}`;
}

function fetchCookie(request) {
    let cookies = cookieParser.parse(request.headers.cookie);

    return cookies[identificator].toString();
}

module.exports = {
    formCookie,
    fetchCookie,
};
