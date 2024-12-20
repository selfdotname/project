const http = require('node:http');

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'content-type': 'text/html' });
  res.end('<h1>Obaro</h1>');
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('server is listening on port 3000');
});
