const notifier = require('node-notifier');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const config = require('./config');


const devConfig = {
	mode: 'development',

	devServer: {
		quiet: true,
		stats: {
			children: false,
			entrypoints: false,
		}
	},
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: [
					{ loader: "style-loader" },
					{
						loader: "css-loader",
						options: {
							sourceMap: true,
							url: false
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
							importer: function(url, prev) {
								if(url.indexOf('@material') === 0) {
									var filePath = url.split('@material')[1];
									var nodeModulePath = './node_modules/@material/' + filePath;
									return { file: require('path').resolve(nodeModulePath) };
								}

								if(url.indexOf('material-components-web') === 0) {
									var nodeModulePath = './node_modules/material-components-web/material-components-web';
									return { file: require('path').resolve(nodeModulePath) };
								}

								return { file: url };
							}
						}
					}
				]
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: false,
							interpolate: 'require',
							attrs: ['require:url']
						}
					}
				]
			},
		]
	},
}
module.exports = devConfig;
