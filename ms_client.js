const net = require('net');

const client = new net.Socket();
client.connect(3000, '127.0.0.1', () => {
  console.log('Connected...');

  client.write(JSON.stringify({ cmd: 'sum', data: [1, 2, 3, 4, 5] }));
});

client.on('error', (err) => {
  console.log('Could not connect to socket!!');
  console.log(err);
});

client.on('data', (data) => {
  console.log('Response: ' + data);
});

client.on('close', () => {
  console.log('Connection closed!!');
});
