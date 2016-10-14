module.exports = {

	options: {
		outDir:      'docs',
		outFile:     'nodejs.chm',
		indexFile:   'nodejs.hhk',
		contentFile: 'nodejs.hhc',
		projectFile: 'nodejs.hhp',
		defaultFile: 'index.html',
	},

	nodeVersion: 'latest',

	files: {
		html: [
			//'_toc.html',
			'index.html',
			'synopsis.html',
			'addons.html',
			'assert.html',
			'buffer.html',
			'child_process.html',
			'cli.html',
			'cluster.html',
			'console.html',
			'crypto.html',
			'debugger.html',
			'dgram.html',
			'dns.html',
			'documentation.html',
			'domain.html',
			'errors.html',
			'events.html',
			'fs.html',
			'globals.html',
			'http.html',
			'https.html',
			'modules.html',
			'net.html',
			'os.html',
			'path.html',
			'process.html',
			'punycode.html',
			'querystring.html',
			'readline.html',
			'repl.html',
			'stream.html',
			'string_decoder.html',
			'timers.html',
			'tls.html',
			'tty.html',
			'url.html',
			'util.html',
			'v8.html',
			'vm.html',
			'zlib.html'
		],
		assets: [
			'style.css',
			'sh.css',
			'sh_javascript.min.js',
			'sh_main.js'
		]
	}

};
