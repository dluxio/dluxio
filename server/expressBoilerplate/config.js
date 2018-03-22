let config = {
    port: 3000,
    auth: {
        client_id: 'dlux',
        redirect_uri: 'http://localhost:3000/auth/'
    },
    session: {
        secret: 'ask @disregardfiat'
    }
};

module.exports = config;
