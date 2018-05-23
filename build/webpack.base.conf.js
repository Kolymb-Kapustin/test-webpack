// Системные модули
const path = require('path');

// Файлы конфигурации
const pageslist = require('./pages');
const config = require('./config');

// plugins
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const { VueLoaderPlugin } = require('vue-loader')

// pageslist.entries
module.exports = {
	context: config.rootPath,
	entry: pageslist.entries,

	optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
						name: "common",
						chunks: "all"
					}
				}
		}
	},
	output: {
		path: path.resolve(config.rootPath, 'dist'),
		filename: 'bundles/[name].js',
		publicPath: ''
	},

	resolve: {
		alias: {
			'__rootPath':	 	path.resolve(config.rootPath, ''),
			'__store':			path.resolve(config.rootPath, 'src/store'),
			'__components': path.resolve(config.rootPath, 'src/includes/components'),
			'__assets':			path.resolve(config.rootPath, 'src/assets'),
			'__scss':				path.resolve(config.rootPath, 'src/scss'),
			'__libs':	 			path.resolve(config.rootPath, 'libs')
		}
	},

	module: {
		// Настройка модулей
		rules: [
			// Правила для модулей (configure loaders, parser options, etc.)
			// Loader на css файлы лежит в индивидуальных конфигурациях
			{
				test: /\.js?$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				options: {
					presets: path.resolve(config.rootPath, '.babelrc')
				}
			},
			{
				test: /\.vue?$/,
				loader: 'vue-loader'
			},
			{
				enforce: 'pre',
				test: /\.(js|vue)$/,
				loader: 'eslint-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: path.join('img', '[name].[hash:7].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: path.join('fonts', '[name].[ext]')
				}
			}
		]
	},

	plugins: [
		new VueLoaderPlugin(),

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
		}),
		new ExtractTextPlugin(path.join('bundles','common.css')),


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
