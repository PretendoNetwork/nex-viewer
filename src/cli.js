// TESTING FOR THE "blessed" MODULE
// POSSIBLE FOR DISPLAY?

/*
const blessed = require('blessed');

const screen = blessed.screen({
	smartCSR: true
});

screen.title = 'my window title';
*/

/*

// Create a box perfectly centered horizontally and vertically.
const box = blessed.box({
	top: 'center',
	left: 'center',
	width: '50%',
	height: '50%',
	content: 'Hello {bold}world{/bold}!',
	tags: true,
	border: {
		type: 'line'
	},
	style: {
		fg: 'white',
		bg: 'magenta',
		border: {
			fg: '#f0f0f0'
		},
		hover: {
			bg: 'green'
		}
	}
});

// Append our box to the screen.
screen.append(box);

// If our box is clicked, change the content.
box.on('click', () => {
	box.setContent('{center}Some different {red-fg}content{/red-fg}.{/center}');
	screen.render();
});

// If box is focused, handle `enter`/`return` and give us some more content.
box.key('enter', () => {
	box.setContent('{right}Even different {black-fg}content{/black-fg}.{/right}\n');
	box.setLine(1, 'bar');
	box.insertLine(1, 'foo');
	screen.render();
});

// Focus our element.
box.focus();
*/

/*
const table = blessed.table();

table.setData([
	['Animals', 'Foods'],
	['Elephant', 'Apple'],
	['Bird', 'Orange']
]);

screen.append(table);

screen.key(['escape', 'q', 'C-c'], () => {
	return process.exit(0);
});

screen.render();
*/

const fs = require('fs');
const path = require('path');
const { NEXParser } = require('.');
const args = process.argv.slice(2);

const parser = new NEXParser();
const udpDumpStream = fs.createReadStream(path.resolve(args[0]));

parser.on('packet', packet => { 
	// Do something?
	console.log(packet);
});

parser.on('close', () => {
	// Render CLI UI
	console.log('Parsed pacapng');
	console.log('NEX sessions found:');
	console.log(parser.connections);
});

udpDumpStream.pipe(parser);