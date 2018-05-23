const ExtractTextPlugin = require("extract-text-webpack-plugin");


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
									// minimize: process.env.NODE_ENV != 'production' ? false : true
							}
						},
						{
							loader: "sass-loader",
							options: {
									sourceMap: true
							}
						}
					]
				})
			},
		]
	}
}
module.exports = testConfig;
