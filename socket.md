## **Socket.io Notes (Client & Server)**  

### **1. What is Socket.io?**  
Socket.io is a JavaScript library for real-time, bidirectional communication between **client and server** using WebSockets and fallback mechanisms (like polling).  

---

### **2. Basic Setup**  

#### **Server (Node.js + Express)**  
```javascript
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('User connected:', socket.id);

    socket.on('message', (data) => {
        console.log('Message received:', data);
        io.emit('message', data); // Broadcast to all clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected');
    });
});

server.listen(3000, () => console.log('Server running on port 3000'));
```

---

#### **Client (HTML + JS)**  
```html
<script src="/socket.io/socket.io.js"></script>
<script>
    const socket = io(); // Connect to server

    socket.on('message', (data) => {
        console.log('Received:', data);
    });

    socket.emit('message', 'Hello from client');
</script>
```

---

### **3. Key Methods in Socket.io**  

| **Method**       | **Description** |
|------------------|----------------|
| `io.on('connection', callback)` | Listens for new client connections. |
| `socket.on('event', callback)`  | Listens for an event from the client. |
| `socket.emit('event', data)`    | Sends data to a specific client. |
| `io.emit('event', data)`        | Broadcasts to all connected clients. |
| `socket.broadcast.emit('event', data)` | Sends to all clients except the sender. |
| `socket.disconnect()`           | Disconnects a client. |

This is a **brief** overview of **Socket.io**. Let me know if you need more details! 🚀

