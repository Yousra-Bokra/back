import mongoose from 'mongoose'

const connectMongoDB = async()=> {
    try{
        console.log(process.env.MONGOURI)

       await mongoose.connect(process.env.MONGOURI)
        console.log("Mongo DB connect successfull")
    }
    catch (err) {
        console.log('Mongo db connection error' , err);
    }
}

export default connectMongoDB;



