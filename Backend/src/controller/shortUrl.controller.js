 import { getShortUrl } from "../dao/shortUrl.js";
import wrapAsync from "../utils/tryCatchWrapper.js";
import { createShortUrlWithUser, createShortUrlWithoutUser } from "../services/shortUrl.service.js";

export const createShortUrl = wrapAsync(async (req, res) => {
    const data = req.body;
    let shortUrl;
    if(req.user){
        shortUrl = await createShortUrlWithUser(data.url, req.user.id,data.slug);
    }else{
        shortUrl = await createShortUrlWithoutUser(data.url);
    }
    res.status(200).json({ shortUrl: process.env.APP_URL + shortUrl });
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