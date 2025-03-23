import { Server } from "socket.io";
import http from "http"
import  express from "express";

const app=express();

const server=http.createServer(app)
const io= new Server(server,{
    cors: {
        origin:["http://localhost:5173"],
        methods:["GET","POST"],
    },
});
export const getReceiverSocketId=(receiverId:string) =>{
    return userSocketMap[receiverId]
};




const userSocketMap: { [key: string]: string } = {}; // { userId: socketId }

io.on("connection",(socket)=>{
    console.log("new client connected",socket.id)

    const userId=socket.handshake.query.userId as string;

    if (userId) userSocketMap[userId]=socket.id;

    io.emit("getOnlineUers",Object.keys(userSocketMap));


    socket.on("disconnected",()=>{
        console.log("client disconnected",socket.id)
        delete userSocketMap[userId];
        io.emit("getonlineusers",Object.keys(userSocketMap));
    })

})

export {app,io,server}