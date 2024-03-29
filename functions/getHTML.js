// Libraries
const fetch = require(`node-fetch-commonjs`);

module.exports = async (url) => {
	return new Promise(resolve => {
		fetch(url)
			.then(res => res.text())
			.then(text => resolve(text));
	});
}