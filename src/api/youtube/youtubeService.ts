import { BASE_SERVER_URL } from "@env"
import axios from "axios"

export const getYoutubeVideoURL = async(videoId: string) => {
    try{
        const response = await axios.get(`https://youtube-video-url.onrender.com/api/video?url=https://www.youtube.com/watch?v=${videoId}`)
        return response.data
    }catch(error){
        console.error("Error fetching YouTube video URL:", error);
        throw error;
    }
}