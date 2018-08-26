const ENV = process.env;

const PORT = ENV.PORT || 8081;
const SECRET = ENV.SECRET || 'placeholder_secret';
const CLIENT_ID = ENV.CLIENT_ID || 'dlux';
const REDIRECT_URI = ENV.REDIRECT_URI || 'https://dlux.io/auth/';

let config = {
    port: PORT,
    auth: {
        client_id: CLIENT_ID,
        redirect_uri: REDIRECT_URI
    },
    session: {
        secret: SECRET
    }
};

module.exports = config;
