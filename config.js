const ENV = process.env;

const PORT = ENV.PORT || 2998;
const SECRET = ENV.SECRET || 'cc4e411e2e706253d2c1fc81e904c9f418da361624188f9e';
const CLIENT_ID = ENV.CLIENT_ID || 'localdlux.app';
const REDIRECT_URI = ENV.REDIRECT_URI || 'http://localhost:3000/auth/oauth/oauth2/callback';

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
