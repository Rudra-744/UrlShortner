
import urlSchema from "../models/shortUrl.model.js";
import { ConflictError } from "../utils/errorHandler.js";



export const saveShortUrl = async (shortUrl, longUrl, userId) => {
    try {
        console.log('Saving URL:', { shortUrl, longUrl, userId });
        
        const newUrl = new urlSchema({
            full_Url: longUrl,
            short_Url: shortUrl,
            user: userId || undefined
        });
        
        const savedUrl = await newUrl.save();
        console.log('URL saved successfully:', savedUrl);
        return savedUrl;
    } catch (err) {
        console.error('Error saving URL:', err);
        if (err.code === 11000) {
            throw new ConflictError('This short URL already exists');
        }
        throw new Error(err.message || 'Failed to save URL');
    }
}

export const getShortUrl = async (shortUrl)=>{
    return await urlSchema.findOneAndUpdate({short_Url:shortUrl},{$inc:{clicks:1}} )
}

export const getCustomShortUrl = async (customSlug) => {
    return await urlSchema.findOne({ short_Url: customSlug });
}

