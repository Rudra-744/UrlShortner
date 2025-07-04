import { generateNanoId } from "../utils/helper.js";
import { getCustomShortUrl, saveShortUrl } from "../dao/shortUrl.js";




 export const createShortUrlWithoutUser = async (url)=>{
 const shortUrl = generateNanoId(7);
 if(!shortUrl) throw new Error("Short URL not generated")
 await saveShortUrl(shortUrl,url)
 return shortUrl
}                                   
export const createShortUrlWithUser = async (url, userId, slug = null) => {
    console.log('createShortUrlWithUser called with:', { url, userId, slug });
    
    const shortUrl = slug || generateNanoId(7);
    console.log('Using short URL:', shortUrl);
    
    // Only check for existing custom URLs if a slug is provided
    if (slug) {
        console.log('Checking if custom URL exists:', slug);
        const exists = await getCustomShortUrl(slug);
        console.log('Custom URL check result:', exists);
        
        if (exists) {
            console.log('Custom URL already exists');
            throw new Error("This Custom URL already exists");
        }
    }
    
    console.log('Saving short URL to database');
    const savedUrl = await saveShortUrl(shortUrl, url, userId);
    console.log('Short URL saved successfully:', savedUrl);
    
    return savedUrl.short_Url; // Return the short URL string
}                                   