
// Системные модули
const path = require('path');
const userSeetings = require('./user.seetings.js');
// Путь к корню проекта
const rootPath = path.resolve(__dirname, '..');

// Обьект конфигурации

console.log(rootPath);
let config =

module.exports = {
	rootPath : rootPath,
	// entries : entries ,
	userSeetings : userSeetings,
	'123': '123'
}
