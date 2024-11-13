const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 5001 });

wss.on('connection', (ws) => {
	console.log('Client connected');

	ws.on('message', (message) => {
		console.log('Received message:', message.toString('utf-8'));
		ws.send('dummy response!');
	});

	ws.on('close', () => {
		console.log('Client disconnected');
	});
});

console.log('WebSocket server listening on port 5001');

const express = require('express');
const http = require('http');
const app = express();
const server = http.createServer(app);

app.get('/', (req, res) => {
	res.send('test');
});

server.listen(5000);

console.log('HTTP server listening on port 5000');
