import axiosInstance from "../axiosInstance"

export const getPopularMovies = async() => {
    try {
        const response = await axiosInstance.get("/movie/popular")        
        return response?.data
    } catch (error) {
        // console.log(error);
    }
}

export const getTrendingNowMovies = async() => {
    try {
        const response = await axiosInstance.get("/trending/all/day")        
        return response?.data
    } catch (error) {
        // console.log(error);
    }
}
export const getTrendingWeekMovies = async() => {
    try {
        const response = await axiosInstance.get("/trending/all/week")        
        return response?.data
    } catch (error) {
        // console.log(error);
    }
}

export const getUpcomingMovies = async() => {
    try {
        const response = await axiosInstance.get("/movie/upcoming")        
        return response?.data
    } catch (error) {
        // console.log(error);
    }
}

export const getMoviesDetailsByID = async(id: number) => {
    try {
        const response = await axiosInstance.get(`/movie/${id}`)        
        return response?.data
    } catch (error) {
        // console.log(error);
    }
}
export const getMoviesVideoDetailsByID = async(id: number) => {
    try {
        const response = await axiosInstance.get(`/movie/${id}/videos`)        
        return response?.data
    } catch (error) {
        // console.log(error);
    }
}