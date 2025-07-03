import axiosInsatance from "../utils/axios.Instance";


export const createShortUrl = async (url)=>{
    const {data} = await axiosInsatance.post("/api/create", {url});
    return data.shortUrl;
}