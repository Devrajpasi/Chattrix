import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'
import cors from 'cors'


import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { ENV } from './lib/env.js'

import { connectDB } from './lib/db.js'



const app=express()

const PORT=ENV.PORT || 3000

app.use(express.json())
app.use(cors({origin:ENV.CLIENT_URL,credentials:true} ))
app.use(cookieParser())


app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)


app.listen(PORT,()=>{
    console.log('server is running on port ' + PORT)
    connectDB()
})