import supabase from "../config/supabase.js";
import { generateShortCode } from "../utils/generateShortCode.js";

export const createShortUrl = async (originalUrl) => {

    const shortCode = generateShortCode();

    const { data, error } = await supabase
        .from("links")
        .insert([
            {
                original_url: originalUrl,
                short_code: shortCode
            }
        ])
        .select()
        .single();

    if (error) {
        throw error;
    }

    return data;
};


export const getOriginalUrl = async (shortCode) => {
    const { data, error } = await supabase
        .from("links")
        .select("*")
        .eq("short_code", shortCode)
        .single();

    if (error) {
        throw error;
    }

    return data;
};