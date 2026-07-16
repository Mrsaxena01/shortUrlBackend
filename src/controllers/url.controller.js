import { createShortUrl, getOriginalUrl } from "../services/url.service.js";

export const shortenUrl = async (req, res) => {

    try {

        const { url } = req.body;

        if (!url) {
            return res.status(400).json({
                success: false,
                message: "URL is required"
            });
        }

        const link = await createShortUrl(url);

        return res.status(201).json({
            success: true,
            data: {
                id: link.id,
                originalUrl: link.original_url,
                shortCode: link.short_code,
                shortUrl: `${process.env.BASE_URL}/${link.short_code}`
            }
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

}



export const redirectToOriginalUrl = async (req, res) => {
    try {

        const { shortCode } = req.params;

        const link = await getOriginalUrl(shortCode);

        return res.redirect(link.original_url);

    } catch (error) {

        return res.status(404).json({
            success: false,
            message: "Short URL not found"
        });

    }
};