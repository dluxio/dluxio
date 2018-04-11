var ipfsAPI = require('ipfs-api');

var ipfs = ipfsAPI('ipfs-dev.dlux.io', '443', {protocol: 'https'})

module.exports = ipfs;
