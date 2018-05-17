// Системные модули
const path = require('path');

// Файлы конфигурации соблюдать очередность
const pageslist = require('./pages'); // 1
const config = require('./config'); // 2

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = {
	context: config.rootPath,
	entry: {
		index: pageslist.entries[0],
		search: pageslist.entries[1]
	},

	output: {
		path: path.resolve(config.rootPath, 'dist'),
		filename: 'bundles/[name].js',
		publicPath: ''
	},

	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					name: "commons",
					chunks: "initial",
					minChunks: 2
				}
			}
		}
	},

	plugins: [

		new CleanWebpackPlugin([path.resolve(config.rootPath, 'dist/*')], {
			verbose: true,
			root: config.rootPath
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

	].concat(pageslist.pages),
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
