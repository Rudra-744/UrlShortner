
import urlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";



export const saveShortUrl = async (shortUrl,longUrl ,userid)=>{
    try{

        const newUrl = new urlSchema({           
            full_Url: longUrl, 
            short_Url: shortUrl,
        })
        
        if(userid){
            newUrl.user = userid 
        }
        await newUrl.save();
    }catch(err){
        if(err.code === 11000){
            throw new ConflictError(err);
        }
        throw new Error(err) 
    }
}

export const getShortUrl = async (shortUrl)=>{
    return await urlSchema.findOneAndUpdate({short_Url:shortUrl},{$inc:{clicks:1}} )
}
export const getCustomShortUrl = async (slug)=>{
    return await urlSchema.findOne({short_Url:slug})
}