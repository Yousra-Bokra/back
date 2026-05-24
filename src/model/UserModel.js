import mongoose from "mongoose";

const UserModel = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minLength: [4, "minimum 4 required"]

    },
    email: {
        type: String,
        unique:true,
        required:true

    },
   
    password:{
        type:String,
        required:true,
        minLength:[8,"mini 8 characters"]
    },


    role:{
        type:String,
        enum:['user','admin'],
        default:'user'

    }

},

    {

    timestamps:true
})

const Yousra = mongoose.model('user', UserModel); //schema me variable ka name UsreModal rahkah hai
export default Yousra
