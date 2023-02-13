const fetch = require('node-fetch-commonjs');
const config = require('../config.json');

const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': config.headers["X-RapidAPI-Key"],
		'X-RapidAPI-Host': config.headers["X-RapidAPI-Host"]
	}
};

module.exports = {
    async getTeamName(city) {
        
    }
}