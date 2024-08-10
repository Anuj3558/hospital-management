import mongoose from "mongoose";

const connectToDb = async (url)=>{
    try{
        await mongoose.connect(url);
         console.log("Monogo db connected succesfully");
    }
    catch(err){
        console.log("Error: "+err);
    }
}
export default connectToDb;