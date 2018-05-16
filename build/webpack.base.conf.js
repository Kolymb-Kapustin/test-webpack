
// Системные модули
const path = require('path');

// Файлы конфигурации
const config = require('./config');
var pages = require('./pages');
// console.log(pages.pageNames);

pages = 'index.js'
// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
	context: config.rootPath,
	entry: config.entries,

	output: {
		path: path.resolve(config.rootPath, 'dist'),
		filename: 'bundles/[name].js',
		publicPath: ''
	},

	plugins: [

		new CleanWebpackPlugin([path.resolve(config.rootPath, 'dist/*')], {
			verbose: true,
			root: config.rootPath
		}),

		new HtmlWebpackPlugin({
			title: `${config.pageNames[0]}`,
			filename: path.resolve(config.rootPath, 'dist', pages),
			inject: true
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
	// Вывод событий Webpack
	stats: {
		children: false,
		entrypoints: false
	},
	// Лимит памяти точки входа
	performance: {
  	hints: false
	},
}
