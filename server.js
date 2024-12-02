const http = require('http'); // Correct module import with quotes

const hostname = '127.0.0.1'; // Ensure hostname is a string
const port = 3000;

const server = http.createServer((req, res) => { // Corrected method name and parameter
    res.statusCode = 200; // Use 'res' to set status code
    res.setHeader('Content-Type', 'text/plain'); // Fixed method and syntax for setting header
    res.end('Hello World'); // End the response with 'Hello World'
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`); // Fixed string interpolation and syntax
});
