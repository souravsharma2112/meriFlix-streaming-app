import { useQuery } from "@tanstack/react-query"
import { getYoutubeVideoURL } from "../../api/youtube/youtubeService"

export const useGetYoutubeDirectURL = (videoID:string) => {
    return useQuery({
        queryKey : ["youtube-video-url" , videoID],
        queryFn : () => getYoutubeVideoURL(videoID),
        retry : false
    })
}