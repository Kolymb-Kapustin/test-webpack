const ExtractTextPlugin = require("extract-text-webpack-plugin");
const config = require('./config');
const path = require('path');


const testConfig = {
	mode: 'porduction',
	module: {
		// Настройка модулей
		rules: [
			// Правила для модулей (configure loaders, parser options, etc.)
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: "css-loader",
							options: {
									sourceMap: true,
									url: false
									// minimize: process.env.NODE_ENV != 'production' ? false : true
							}
						},
						{
							loader: "sass-loader",
							options: {
								sourceMap: true
							}
						},
						{
							loader: 'alias-resolve-loader',
							options: {
								alias: {
									"@material": "~@material"
								}
							}
						},
					]
				})
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
	}
}
module.exports = testConfig;
