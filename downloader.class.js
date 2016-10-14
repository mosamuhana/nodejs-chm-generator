const fs = require('fs');
const path = require('path');
const https = require('https');
const config = require('./config');
const logger = require('./logger');

function checkDir() {
	var dir = config.options.outDir;
	if (!fs.existsSync(dir)) fs.mkdirSync(dir);
	if (!fs.existsSync(`${dir}/assets`)) fs.mkdirSync(`${dir}/assets`);
}

class Downloader {

	constructor() {
		this.baseUrl = `https://nodejs.org/docs/${config.nodeVersion}/api`;
		let t = new Date();
		this.time = {
			start: t,
			end: t,
			total: 0
		};
		this.files = {};

		config.files.html.forEach(file => this.files[file] = false);
		config.files.assets.forEach(file => this.files['assets/' + file] = false);
	}

	downloadFile(fileName) {
		this.files[fileName] = false;
		return new Promise((resolve, reject) => {
			let req = https.request(`${this.baseUrl}/${fileName}`, res => {
				res.setEncoding('utf8');
				let data = '';
				res.on('data', chunk => data += chunk);
				res.on('end', () => {
					fs.writeFile(path.join(config.options.outDir, fileName), data, {encoding:'utf8'}, err => {
						if (err) {
							logger.error(`  - Download '${fileName}' Fail`);
							reject(err);
						} else {
							this.files[fileName] = true;
							logger.info(`  - Download '${fileName}' OK`);
							resolve(true);
						}
					});
				});
			});
			req.on('error', err => reject(err));
			req.end();
		});
	}

	download() {
		checkDir();
		this.time.start = new Date();
		return new Promise((resolve, reject) => {
			return Promise.all(Object.keys(this.files).map(fileName => this.downloadFile(fileName)))
				.then(res => {
					this.time.end = new Date();
					this.time.total = this.time.end.getTime() - this.time.start.getTime();
					resolve();
				})
				.catch(reason => {
					reject(reason);
				});
		});
	}

}

module.exports = Downloader;
