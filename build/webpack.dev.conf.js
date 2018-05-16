const notifier = require('node-notifier');

const devConfig = {
	mode: 'development',
	devServer: {
		quiet: true,
		stats: {
			children: false,
			entrypoints: false,
		}
	},
	plugins: []
}
module.exports = devConfig;
