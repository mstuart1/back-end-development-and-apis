import http from "http"
import fs from 'fs'

const PORT = 3000;

const server = http.createServer((req, res) => {
    fs.readFile("./public/index.html", (err, data) => {
        if (err) {
            res.writeHead(500)
            res.end("Error loading page");
            return
        }
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(data);
    })
})

server.listen(PORT, () => {
    console.log('The server is running at http://localhost:3000')
})

