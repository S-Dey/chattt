const io = require('socket.io-client');
const readline = require('readline');

const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout
});

// const URL = 'https://chattt.glitch.me';
const URL = 'http://localhost:3000';

const socket = io(URL);

socket.on('connect', () => {
	console.log('connected');
	socket.emit('/join', {channel: 'test', user: 'avi'});

	socket.on('/msg test', function (msg) {
		if (msg.user === null){
			console.log(`[ ${msg.data} ]`);
		} else {
			console.log(`${msg.user}: ${msg.data}`);
		}
	});

	socket.on('/status', (msg) => {
		if (msg.type === 'join failed'){
			console.log(`[ ${msg.data} ]`);
		} else if (msg.type === 'joined') {
			// get user input messages
			let getInput = () => {
				rl.question('', (inp) => {
					// console.log('Got input ' + inp);
					socket.emit('/msg test', { user: 'avi', data: inp });
					// rl.close();
					getInput();
				});
			};
			getInput();
		}
	});
});
