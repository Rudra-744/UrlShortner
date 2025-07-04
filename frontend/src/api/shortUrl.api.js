import axiosInsatance from "../utils/axios.Instance";


export const createShortUrl = async (url, customSlug) => {
    const { data } = await axiosInsatance.post("/api/create", {
        url,
        slug: customSlug // Changed from customSlug to slug to match backend expectation
    });
    return data.shortUrl;
}