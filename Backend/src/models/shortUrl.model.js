import mongoose from "mongoose";

const shortUrlSchema = new mongoose.Schema({
   full_Url:{
    type: String,
    required: true,
   },
   short_Url:{
    type: String,
    required: true,
    unique: true,
    index: true,
   },
   clicks:{
    type: Number,
    required: true,
    default: 0,
   },
   user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", 
   }
})

shortUrlSchema.index({short_Url: 1}, {unique: true});

const ShortUrl = mongoose.model("shortUrl", shortUrlSchema);

export default ShortUrl;