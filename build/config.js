const path = require('path');
const fs = require('fs-extra');
const userSeetings = require('./user.seetings.js');
// Путь к корню проекта
const rootPath = path.resolve(__dirname, '..');

// Перечень html файлов в корне
let files = fs.readdirSync(path.resolve(rootPath), (err,data) => {
	if(err){
		throw err
	}
});

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

console.log(pages);
console.log(pageNames);


// Обьект конфигурации
config = {
	rootPath : rootPath,
	entries : path.resolve(rootPath,'./entries/index.js'),
	userSeetings : userSeetings,
	pages: pages,
	pageNames: pageNames
}

module.exports = config;
