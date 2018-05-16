const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const config = require('./config');
const fs = require('fs-extra');


let files = fs.readdirSync(config.rootPath, (err,data) => {
	if(err){
		throw err
	}
});
console.log(files);
// Масив страниц
let pages = [];
// Масив имен страниц
let pageNames = [];

// Фильтр html файлов
files.map((file) => {
	if(path.extname(file) == '.html'){
		pages.push(file);
		pageNames.push(path.basename(file,'.html'));
	}
})

// Перечень точек входа проекта
let entries = [];

pageNames.forEach(function(name) {
  entries.push(path.resolve(	rootPath, `entries`, `${name}.js`));
});

module.exports = {
	pages : pages,
	pageNames: pageNames
}
