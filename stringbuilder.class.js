class StringBuilder {
	constructor() {
		this.lines = [];
	}
	clear() {
		this.lines = [];
		return this;
	}
	add(line) {
		this.lines.push(line);
		return this;
	}
	addLine(line) {
		this.lines.push(line + '\n');
		return this;
	}
	toString() {
		return this.lines.join('');
	}
}

StringBuilder.create = () => new StringBuilder();

module.exports = StringBuilder;
