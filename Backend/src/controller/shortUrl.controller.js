 import { getShortUrl } from "../dao/shortUrl.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import { createShortUrlWithUser, createShortUrlWithoutUser } from "../services/shortUrl.service.js";

export const createShortUrl = wrapAsync(async (req, res) => {
    console.log('Request body:', req.body);
    const data = req.body;
    let shortUrl;
    
    try {
        if (req.user) {
            console.log('Creating URL with user:', req.user.id, 'and slug:', data.slug);
            shortUrl = await createShortUrlWithUser(data.url, req.user.id, data.slug);
        } else {
            console.log('Creating URL without user');
            shortUrl = await createShortUrlWithoutUser(data.url);
        }
        console.log('Created short URL:', shortUrl);
        res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
    } catch (error) {
        console.error('Error in createShortUrl:', error);
        throw error; // This will be caught by the error handler
    }
});


export const redirectFromShortUrl = wrapAsync(async (req, res) => {

        const {id} = req.params;
        const url = await getShortUrl(id)
        if(!url) throw new Error("Short URL Not Found")
        res.redirect(url.full_Url)
 
})

export const createCustomShortUrl = wrapAsync(async (req,res)=>{
    const data = req.body;
    const shortUrl = await createShortUrlWithUser(data.url,data.slug)
    res.status(200).json({shortUrl : process.env.APP_URL + shortUrl})
})