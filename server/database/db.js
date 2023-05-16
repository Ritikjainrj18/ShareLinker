import mongoose from "mongoose";

const DBConnection=async ()=>{
    try{
         await mongoose.connect(process.env.DB_URL,{useNewUrlParser:true})
         console.log("DB connected")
    } catch(error){
        console.error('Error while connecting with database',error.message);
    }
}

export default DBConnection;