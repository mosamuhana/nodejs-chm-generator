const chalk = require('chalk');

module.exports = {
	log: (s) => console.log(chalk.yellow(s)),
	info: (s) => console.info(chalk.green(s)),
	error: (s) => console.error(chalk.red(s))
}
