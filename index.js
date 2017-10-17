'use strict';

const fs = require('fs');

module.exports = function convert(inputFile, outputFile, options) {
	let varName = options.variableName || 'xd_data',
		file = fs.readFileSync(inputFile);

	let content = `unsigned char ${varName}[] = {\n`;

	for (let i = 0; i < file.length; i += 1) {
		let rowIndex = i % 16,
			isLast = (i === file.length - 1);

		if (rowIndex === 0) {
			content += options.ident || `    `;
		}

		content += format(file.readUInt8(i));

		if (rowIndex < 15 && !isLast) {
			content += `, `;
		}
		else if (rowIndex === 15 && !isLast) {
			content += `,\n`;
		}
		else {
			content += `\n`;
		}
	}
	content += `};\n`;

	console.log(`Convert done`);

	console.log(`Saving...`);
	fs.writeFileSync(outputFile, content);
	console.log(`Saved as ${outputFile}`);
};


function format(value) {
	var result = value.toString(16);

	while (result.length < 2) {
		result = '0' + result;
	}

	return `0x${result}`;
}
