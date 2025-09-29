import mongoose from "mongoose";
import dotenv from 'dotenv'

dotenv.config()



export const connectDB=async()=>{
    try{

        const conn=await mongoose.connect(process.env.MONGO_URL)

        console.log('mongo db connecected',conn.connection.host)

    }
    catch(error){
       console.log("error connectioin to mongodb",error)
    //    process.exit(1)
    }
}