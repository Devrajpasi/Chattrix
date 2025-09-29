import express from 'express'
import dotenv from 'dotenv'

import authRoutes from './routes/auth.route.js'
import messageRoutes from './routes/message.route.js'
import { connectDB } from './lib/db.js'

dotenv.config()

const app=express()

const PORT=console.log(process.env.PORT) || 3000

app.use(express.json())


app.use('/api/auth',authRoutes)
app.use('/api/messages',messageRoutes)


app.listen(3000,()=>{
    console.log('server is running on port' + PORT)
    connectDB()
})