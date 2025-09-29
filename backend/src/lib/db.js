import mongoose from "mongoose";
import { ENV } from "./env.js";


export const connectDB=async()=>{
    try{   
        

        const conn=await mongoose.connect(ENV.MONGO_URI)

        console.log('mongo db connecected',conn.connection.host)

    }
    catch(error){
       console.log("error connectioin to mongodb",error)
    //    process.exit(1)
    }
}