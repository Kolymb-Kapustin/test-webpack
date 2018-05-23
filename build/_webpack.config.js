// Склейка вебпак конфигураций
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.conf.js');
const devConfig = require('./webpack.dev.conf.js');
const buildConfig = require('./webpack.build.conf.js');
const testConfig = require('./webpack.test.conf.js');

module.exports = (env, options) => {
		if(process.env.NODE_ENV === 'development') {
			return merge(baseConfig,devConfig);
		} else if (process.env.NODE_ENV === 'test') {
			return merge(baseConfig,testConfig);
		} else {
			return merge(baseConfig,buildConfig);
		}
}
