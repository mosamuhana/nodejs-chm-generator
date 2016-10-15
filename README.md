# Generate nodejs.chm documentation

Generate Microsoft HTML Help (CHM) file for Node.js site

### Latest version
```sh
https://nodejs.org/docs/latest/api/
```

## Start

Run
```sh
npm install
```

Then
```sh
npm start
or
node create.js 
```

## Usage

```sh
const Manual = require('nodejs-chm-generator');
// or const Manual = require('nodejs-chm-generator/manual.class');

const manual = new Manual('docs');
manual.make();
```

### To generate help file for other versions than 'latest'

change 'nodeVersion' in 'config.js' file

example: nodeVersion = 'v4.0.0'

To see what versions you can generate visit:

```sh
https://nodejs.org/docs/ 
```
