
// Системные модули
const path = require('path');
const userSeetings = require('./user.seetings.js');
// Путь к корню проекта
const rootPath = path.resolve(__dirname, '..');

// Обьект конфигурации

console.log(rootPath);

module.exports = {
	rootPath : rootPath,
	userSeetings : userSeetings
}
