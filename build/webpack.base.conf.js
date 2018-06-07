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
const { VueLoaderPlugin } = require('vue-loader');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');


let folders_for_copying = ['img', 'fonts', 'api'];
let fpfc = [
	{
		from: path.resolve(config.rootPath, `.tmp`),
		to: path.resolve(config.rootPath, `dist/bundles`)
	}
];

folders_for_copying.map(folder => {
	fpfc.push({
		from: path.resolve(config.rootPath, `src/${folder}`),
		to: path.resolve(config.rootPath, `dist/${folder}`)
	})
})

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
		publicPath: '',
		filename: 'bundles/[name].js'
	},

	resolve: {
		alias: {
			'__components': path.join(config.rootPath, 'src/includes/components'),
			'__assets': path.join(config.rootPath, 'src/assets'),
			'__scss': path.join(config.rootPath, 'scss'),
			'__styles': path.join(config.rootPath, 'src/styles'),
			'__page': path.join(config.rootPath, ''),
			'__libs': path.join(config.rootPath, 'libs')
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
					name: path.join('fonts', '[name].[hash:7].[ext]')
				}
			},
			// {
			// 	test: /\.(png|jpg|gif|svg|woff2?|eot|ttf|otf)$/,
			// 	loader: 'ignore-loader'
			// }
		]
	},

	plugins: [
		new VueLoaderPlugin(),

		new CleanWebpackPlugin([path.resolve(config.rootPath, 'dist/*'),path.resolve(config.rootPath, '.tmp/*'),path.resolve(config.rootPath, 'php/*')], {
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

		new webpack.NamedModulesPlugin(),


		new ExtractTextPlugin(path.join('bundles','common.css')),

		new webpack.ProvidePlugin({
			$: "jquery",
			jQuery: "jquery",
			"window.jQuery": "jquery",
			Vue: ['vue/dist/vue.esm.js', 'default']
		}),

		new CopyWebpackPlugin(fpfc ,
		{copyUnmodified: true}),

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
