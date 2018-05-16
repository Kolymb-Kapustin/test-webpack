// Склейка вебпак конфигураций
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');
const devConfig = require('./webpack.dev.conf.js');
const buildConfig = require('./webpack.build.conf.js');

module.exports = (env, options) => {
		if(options.mode === 'development') {
			return merge(baseConfig,devConfig);
		} else {
			return merge(baseConfig,buildConfig);
		}
}
