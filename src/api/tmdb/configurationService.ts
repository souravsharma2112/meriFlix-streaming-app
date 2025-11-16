import axiosInstance from "../axiosInstance"

export const getGenreMovieList= async() => {
    try {
        const response = await axiosInstance.get("/genre/movie/list")        
        return response?.data
    } catch (error) {
        // console.log(error);
    }
}