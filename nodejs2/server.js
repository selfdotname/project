const http = require('node:http');
const fs = require('node:fs');

const server = http.createServer((req, res) => {
  console.log('request recieved');
  console.log('request url: ' + req.url);

  res.writeHead(200, { 'content-type': 'text/html' });

  const readableStream = fs.createReadStream('./index.html', {
    encoding: 'utf-8',
  });

  readableStream.pipe(res);
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
  console.log('server is listening on port 3000');
});
