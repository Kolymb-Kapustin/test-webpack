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
									minimize: true,
									url: false
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
								sourceMap: false,
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
	},
}
module.exports = buildConfig;
