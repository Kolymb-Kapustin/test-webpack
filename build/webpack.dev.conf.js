let config = require('./config');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const notifier = require('node-notifier');
const CleanWebpackPlugin = require('clean-webpack-plugin');
// var ICON = path.join(__dirname, 'icon.png');

let devMode = {

	context: config.rootPath,
	mode: 'development',
	entry: config.entries,

	output: {
		path: path.resolve(config.rootPath, './dist/bundles'),
		publicPath: 'bundles/'
	},

	devServer: {
		publicPath: 'bundles/',
		quiet: true,
		stats: {
			children: false,
			entrypoints: false,
		},
	},

	plugins: [
		new CleanWebpackPlugin([path.resolve(config.rootPath, 'dist/*')], {
			verbose: true,
			root: config.rootPath
		}),
		new HtmlWebpackPlugin({
			title: config.pageNames[0],
			filename: path.resolve(config.rootPath, `./dist/${config.pageNames[0]}.html`),
			// hash: true
		}),
		new FriendlyErrorsWebpackPlugin({
			compilationSuccessInfo: {
				messages: [`Привет ${config.userSeetings.user}, че как? тебе сюда -> http://${config.userSeetings.ip}:${config.userSeetings.port}`]
				// notes: ['ЗАМЕТКА']
			},
			onErrors: (severity, errors) => {
				if (severity !== 'error') {
					return;
				}
				const error = errors[0];
				console.log(error.webpackError);
			}
		})
	],
	stats: {
		children: false,
		entrypoints: false
	},
	performance: {
  	hints: false
	},
};

module.exports = devMode;
