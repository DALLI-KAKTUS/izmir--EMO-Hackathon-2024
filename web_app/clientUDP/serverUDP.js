const dgram = require('dgram');

// Create a UDP server
const server = dgram.createSocket('udp4');

const SERVER_PORT = 8000; // Port for the server to listen on
const HOST = 'localhost';

server.bind(SERVER_PORT, HOST, () => {
    console.log(`UDP server is running on ${HOST}:${SERVER_PORT}...`);
});

// Listen for incoming messages
server.on('message', (msg, rinfo) => {
    console.log(`Received message: ${msg.toString()} from ${rinfo.address}:${rinfo.port}`);

    // Send a response back to the client
    const response = 'Hello, Client!';
    server.send(response, rinfo.port, rinfo.address, (err) => {
        if (err) {
            console.error('Error sending response:', err);
        } else {
            console.log(`Sent response: ${response} to ${rinfo.address}:${rinfo.port}`);
        }
    });
});

// Handle error events
server.on('error', (err) => {
    console.error(`Server error:\n${err.stack}`);
    server.close();
});
