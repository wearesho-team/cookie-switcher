const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const config = require('../config').server;

require('dotenv').config({ path: '.env' });

const routes = require('./routes');

function run() {
    const app = express();

    app.set('root', `${__dirname}/..`);

    // parse application/json
    app.use(bodyParser.json({limit: '50mb'}));
    // enable cors
    app.use(cors());

    switch (process.env.NODE_ENV) {
        case 'production':
            // trust proxy in production from local nginx front server
            app.set('trust proxy', 'loopback');

            // set the base uri
            app.set('baseUrl', config.baseUrl);

            // mount the routes
            app.use(routes);
            break;
        default:
            // handle errors and send them back to browser
            app.use(require('errorhandler'));

            // set the base uri
            app.set('baseUrl', config.baseUrl);

            // mount the routes
            app.use(routes);

            // mount server
            app.listen(config.port, config.host, () => {
                console.log(`app running on http://${config.host}:${config.port}`);
            });
            break;
    }
}

module.exports = run;

if (require.main === module) {
    run();
}
