import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import cors from 'cors'


import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { ENV } from './lib/env.js'
import { app, server } from './lib/socket.js'

import { connectDB } from './lib/db.js'





const PORT=ENV.PORT || 3000

app.use(express.json({limit :"10mb"}))
app.use(cors({origin:ENV.CLIENT_URL,credentials:true} ))
app.use(cookieParser())


app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)


server.listen(PORT,()=>{
    console.log('server is running on port ' + PORT)
    connectDB()
})