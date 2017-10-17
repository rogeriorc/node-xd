#!/usr/bin/env node
'use strict';

const path = require('path'),
	convert = require('.');

let pkg = require('./package.json'),
	args = process.argv.slice(2);

if (args.length < 1 || args[0] === `--help`) {
	let usage = `Usage:\n`;
	usage += `    xdump <input> [output]\n`;
	usage += `\n`;
	usage += `Example: convert file.zip to file.h\n`;
	usage += `    xdump file.zip\n`;
	usage += `\n`;
	usage += `Version:\n    ${pkg.version}\n`;

	console.log(usage);

	process.exit(1);
}

if (args[0] === '--version' || args[0] === '-V') {
	console.log(`${pkg.version}`);
	process.exit(0);
}

const inputFile = args[0];
const outputFile = args[1] || replaceExt(inputFile, '.h');

convert(inputFile, outputFile, {});

process.exit();

function replaceExt(npath, ext) {
	var nFileName = path.basename(npath, path.extname(npath)) + ext;
	return path.join(path.dirname(npath), nFileName);
}
