const ExtractTextPlugin = require("extract-text-webpack-plugin");

const buildConfig = {
	mode: 'porduction',
	module: {
		rules: [
			{
				test: /\.s?css$/,
				use: ExtractTextPlugin.extract({
					use: [
						{
							loader: "css-loader",
							options: {
									sourceMap: false,
									minimize: true
							}
						},
						{
							loader: 'postcss-loader',
							options: {
								plugins: () => [require('autoprefixer')({
									'browsers': ['> 1%', 'last 2 versions']
								})],
							}
						},
						{
							loader: "sass-loader",
							options: {
									sourceMap: false
							}
						}
					]
				})
			},
		]
	},
}
module.exports = buildConfig;
