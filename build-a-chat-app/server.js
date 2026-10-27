import http from 'http';
import fs from 'fs';
import { WebSocketServer } from 'ws';

const PORT = 3001;

const server = http.createServer((req, res) => {
  fs.readFile("./public/index.html", (err, data) => {
    if (err) {
      res.writeHead(500)
      res.end("Error loading page");
      return
    }
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(data);
  })
})

const wss = new WebSocketServer({ server })

wss.on("connection", (socket, req) => {
  const username = new URL(req.url, "http://localhost").searchParams.get("username",)
  let message = { "type": "system", "text": `${username} joined` }
  let parsedMessage = JSON.stringify(message)
  
   wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(parsedMessage);
    }
  });

  socket.on("message", (data) => {
    console.log('data', data.toString())
    let message = JSON.parse(data.toString())
    message.type = "chat"
    
    let parsedMessage = JSON.stringify(message)
    console.log(parsedMessage)
   wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(parsedMessage);
    }
  });
  })

  socket.on("close", () => {
    let message = { "type": "system", "text": `${username} left` }
    let parsedMessage = JSON.stringify(message)
    
   wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(parsedMessage);
    }
  });
  })
})

server.listen(PORT, console.log("Chat server running at http://localhost:3001"))