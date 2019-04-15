const app = module.exports = require('express')();

const {
    formCookie,
    fetchCookie,
} = require('../actions').cookies;

app.post('/', (request, response) => {
    if (request.body.id === undefined) {
        response.status(400).send({message: "Request body must have id"});
    }

    response.setHeader('set-cookie', formCookie(request).toString());
    response.send();
});

app.get('/', (request, response) => {
    response.send(fetchCookie(request))
        .catch(error => {
            response.status(400).send(error);
        });
});

// the catch all route
app.all('*', (req, res) => {
    res.status(404).send({message: 'Route invalid'});
});
