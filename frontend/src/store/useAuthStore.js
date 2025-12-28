import { create } from "zustand"
import { axiosInstance } from '../lib/axios.js'
import toast from "react-hot-toast";
import {io} from 'socket.io-client'

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp:false,
    isLogginIn:false,
    socket:null,
    OnlineUser:[],

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/auth/check")
            set({ authUser: res.data })
            get().conectSocket()
        } catch (error) {
            console.log("error in authcheck :", error)
            set({ authUser: null })
        }
        finally {
            set({ isCheckingAuth: false })
        }
    },

    signup:async(data)=>{

        set({isSigningUp:true})

        try {
           const res=await axiosInstance.post("/auth/signup",data)
           
           set({authUser:res.data})
           toast.success("account created SuccessFully")
           get().conectSocket()
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
        finally{
            set({isSigningUp:false})

        }

    },

     login:async(data)=>{

        set({isLogginIn:true})

        try {
           const res=await axiosInstance.post("/auth/login",data)
           
           set({authUser:res.data})
           toast.success("Logged in  SuccessFully")
           get().conectSocket()
            
        } catch (error) {
            toast.error(error.response.data.message)
            
        }
        finally{
            set({isLogginIn:false})

        }

    },

    logout:async()=>{
        try{
            await axiosInstance.post("/auth/logout")
            set({authUser:null})
            toast.success("logged out successfully")
            get().disconnectSocket()

        }
        catch(error){
            toast.error("errorr logging out ")

        }

    },

    updateProfile:async(data)=>{

        try {

            const res=await axiosInstance.put("/auth/update-profile",data)
            set({authUser:res.data})
            toast.success("Profile updated Successfully ")
            
        } catch (error) {

            console.log("error in update profile ")
            toast.error(error.response.data.message)
            
        }


    },

    conectSocket:()=>{
        const { authUser } = get();
    if (!authUser || get().socket?.connected) return;

    const socket = io(BASE_URL, {
      withCredentials: true, 
    });

    socket.connect();

    set({ socket });

    socket.on("getOnlineUsers",(userIds)=>{
        set({OnlineUser:userIds})
    })

},


 disconnectSocket: () => {
    if (get().socket?.connected) get().socket.disconnect();
  },


}));