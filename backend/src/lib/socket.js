import {Server} from 'socket.io'
import http from "http"
import express from 'express'
import {ENV} from './env.js'
import { socketAuthMiddleware } from '../middleware/socket.uuth.middleware.js'

const app=express()

const server=http.createServer(app)

const io=new Server(server,{
    cors:{
     origin:[ENV.CLIENT_URL],
     credentials:true,
    }
})

io.use(socketAuthMiddleware)

export function getReceiverSocketId(userId){
    return userSocketMap[userId]
}

// online user ke liye
const userSocketMap={}

io.on("connection",(socket)=>{
    console.log("A user connected ",socket.user.fullName)
    const userId=socket.userId
    userSocketMap[userId]=socket.id
    

    io.emit("get Online User",Object.keys(userSocketMap))

    socket.on("disconnect",()=>{
        console.log("a user disconnected",socket.user.fullName);
        delete userSocketMap[userId]
         io.emit("get Online User",Object.keys(userSocketMap))
    })


})

export {io,app,server}





