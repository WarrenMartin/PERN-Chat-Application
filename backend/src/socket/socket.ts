import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
	cors: {
		origin: ["http://localhost:5173"],
		methods: ["GET", "POST"],
	},
});

export const getReceiverSocketId = (receiverId: string) => {
	return userSocketMap[receiverId];
};

const userSocketMap: { [key: string]: string } = {}; // {userId: socketId}

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId as string;
  
	if (userId) userSocketMap[userId] = socket.id;
  
	io.emit("getOnlineUsers", Object.keys(userSocketMap));
  
	// Add this event handler for message sending
	socket.on("sendMessage", (message) => {
	  const receiverSocketId = userSocketMap[message.receiverId];
	  if (receiverSocketId) {
		// Forward the message to the specific recipient
		io.to(receiverSocketId).emit("newMessage", message);
	  }
	});
  
	socket.on("disconnect", () => {
	  delete userSocketMap[userId];
	  io.emit("getOnlineUsers", Object.keys(userSocketMap));
	});
  });

export { app, io, server };