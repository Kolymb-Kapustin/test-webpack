const notifier = require('node-notifier');
// const ExtractTextPlugin = require("extract-text-webpack-plugin");

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
						}
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true
						}
					}
				]
			},
		]
	},
}
module.exports = devConfig;
