const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('./config');
const fs = require('fs-extra');

// Чтение файлов
let files = fs.readdirSync(config.rootPath, (err,data) => {
	if(err){
		throw err
	}
});

// Масив страниц, имен страниц, точки входа проекта
let pages = [];
let pageNames = [];
let entries = {};

// // Фильтр html файлов
files.map((file) => {
	if(path.extname(file) == '.html'){
		pageNames.push(path.basename(file,'.html'));
	}
});
pageNames.forEach(function(name) {
  entries[name] = path.resolve(config.rootPath, `entries`, `${name}.js`);
	pages.push(new HtmlWebpackPlugin({
		title: `${name}`,
		filename: path.resolve(config.rootPath, `dist/${name}.html`),
		template: path.resolve(config.rootPath, `${name}.html`),
		chunks: [ name, 'common' ]
		// chunks: ['commons', name]
	}))
});

// console.log(pages);
console.log(entries);

module.exports = {
	pages : pages,
	entries: entries
}
