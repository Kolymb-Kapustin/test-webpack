
// Системные модули
const path = require('path');
const userSeetings = require('./user.seetings.js');
const pages = require('./pages.js');

// Путь к корню проекта
const rootPath = path.resolve(__dirname, '..');


// Обьект конфигурации
const config = {
	rootPath : path.resolve(__dirname, '..'),
	entries : entries ,
	userSeetings : userSeetings
}

module.exports = config;
