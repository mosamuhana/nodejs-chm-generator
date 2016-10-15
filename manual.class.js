const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const chalk = require('chalk');
const StringBuilder = require('./stringbuilder.class');
const Downloader = require('./downloader.class');
const config = require('./config');
const logger = require('./logger');

function getFileName(file) {
	let name = path.basename(file, '.html');
	if (name == 'index') return 'Home';
	return name[0].toUpperCase() + name.substr(1);
}

function createFileList() {
	const sb = StringBuilder.create()
		.addLine('\t<ul>');

	config.files.html.forEach(file => {
		sb
			.addLine('\t\t<li><object type="text/sitemap">')
			//.addLine('\t\t\t<object type="text/sitemap">')
			.addLine(`\t\t\t\t<param name="Name" value="${getFileName(file)}">`)
			.addLine(`\t\t\t\t<param name="Local" value="${file}">`)
			.addLine('\t\t\t</object>')
			.addLine('\t\t</li>')
	});

	sb.addLine('\t</ul>')

	return sb.toString();
}

// ===================================================================================

class Manual {

	constructor(outDir) {
		this.outDir = outDir;
		this.options = config.options;
	}

	make() {
		logger.log('Start: Downloading document files...');
		(new Downloader(this.outDir)).download()
			.then(_ => {
				logger.info('Finish: Downloading document files... OK\n');

				logger.log('Start: Create Help Index...');
				this.createIndexFile();
				logger.info('Finish: Create Help Index... OK\n');

				logger.log('Start: Create Help Content...');
				this.createContentFile();
				logger.info('Finish: Create Help Content... OK\n');

				logger.log('Start: Create Help Project...');
				this.createProjectFile();
				logger.info('Finish: Create Help Project... OK\n');

				logger.log('Start: Help Compilation...');
				exec('hhc ' + path.join(this.outDir, this.options.projectFile), {encoding:'utf8'}, (err) => {
					if (err) {
						//console.error(err);
					}
					logger.info('Finish: Help Compilation... OK\n');
					//resolve();
				});
			})
			.catch(x => {
				logger.error(x);
			});
	}

	createProjectFile() {
		const sb = StringBuilder.create()
			.addLine('[OPTIONS]')
			.addLine('Auto Index=Yes')
			.addLine('Binary TOC=No')
			.addLine('Binary Index=Yes')
			.addLine('Compatibility=1.1 or later')
			.addLine(`Title=Node.js Documentation`)
			.addLine('Full-text search=Yes')
			.addLine('Display compile progress=Yes')
			.addLine('Display compile notes=Yes')
			.addLine('Default window=main')
			.addLine(`Compiled file=${this.options.outFile}`)
			.addLine(`Contents file=${this.options.contentFile}`)
			.addLine(`Index file=${this.options.indexFile}`)
			.addLine(`Default topic=${this.options.defaultFile}`)
			//.addLine('Language=0x409 English (United States)')
			.addLine('')

			.addLine('[WINDOWS]')
			.addLine(`main=,"${this.options.contentFile}","${this.options.indexFile}","${this.options.defaultFile}","${this.options.defaultFile}",,,,,0x23520,222,0x1046,[10,10,780,560],0xB0000,,,1,,,0`)
			.addLine('')

			.addLine('[FILES]');

		config.files.html.forEach(x => sb.addLine(x));

		fs.writeFileSync(path.join(this.outDir, this.options.projectFile), sb.toString());
	}

	createIndexFile() {
		const sb = StringBuilder.create()
			.addLine('<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">')
			.addLine('<html>')
			.addLine('<head>')
			.addLine('\t<meta name="generator" content="Microsoft&reg; HTML Help Workshop 4.1">')
			.addLine('\t<!-- Sitemap 1.0 -->')
			.addLine('</head>')
			.addLine('<body>')
			.addLine('\t<object type="text/site properties"></object>')
			.addLine(createFileList())
			.addLine('</body>')
			.addLine('</html>');

		fs.writeFileSync(path.join(this.outDir, this.options.indexFile), sb.toString());
	}

	createContentFile() {
		const sb = StringBuilder.create()
			.addLine('<!DOCTYPE HTML PUBLIC "-//IETF//DTD HTML//EN">')
			.addLine('<html>')
			.addLine('<head>')
			.addLine('\t<meta name="generator" content="Microsoft&reg; HTML Help Workshop 4.1">')
			.addLine('\t<!-- Sitemap 1.0 -->')
			.addLine('</head>')
			.addLine('<body>')
			.addLine('\t<object type="text/site properties">')
			.addLine('\t\t<param name="Window Styles" value="0x800025">')
			.addLine('\t\t<param name="comment" value="title:">')
			.addLine('\t\t<param name="comment" value="base:">')
			.addLine('\t</object>')
			.addLine(createFileList())
			.addLine('</body>')
			.addLine('</html>');

		fs.writeFileSync(path.join(this.outDir, this.options.contentFile), sb.toString());
	}

}

module.exports = Manual;
