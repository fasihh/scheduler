const http = require('http');
const app = require('./app');

// create server with app
const server = http.createServer(app);

const port = process.env.PORT || 3000;

// start server
server.listen(port);

console.log(`server live:\nhttp://localhost:${port}`);