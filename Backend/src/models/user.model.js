import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
        select: false,
    },
    avatar:{    
        type: String,
        required: false,
        default:"https://cdn-icons-png.flaticon.com/512/149/149071.png"                                        
    } 
});

userSchema.methods.comparePassword = async function (password) {                    
    return await bcrypt.compare(password, this.password);
}



const User = mongoose.model("User", userSchema);

export default User;