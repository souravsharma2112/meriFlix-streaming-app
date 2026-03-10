import { useQuery } from "@tanstack/react-query";
import { getMoviesDetailsByID, getMoviesVideoDetailsByID, getPopularMovies, getTrendingNowMovies,getTrendingWeekMovies, getUpcomingMovies } from "../../api/tmdb/movieService";

export const usePopularMovies = () => {
    return useQuery({
        queryKey : ["popular-movies"],
        queryFn : getPopularMovies,
        retry : false
    })
}
export const useUpcomingMovies = () => {
    return useQuery({
        queryKey : ["upcoming-movies"],
        queryFn : getUpcomingMovies,
        retry : false
    })
}
export const useTrendingNowMovies = () => {
    return useQuery({
        queryKey : ["trending-now-movies"],
        queryFn : getTrendingNowMovies,
        retry : false
    })
}
export const useTrendingWeekMovies = () => {
    return useQuery({
        queryKey : ["trending-week-movies"],
        queryFn : getTrendingWeekMovies,
        retry : false
    })
}
export const useMovieDetailsByID = (id: number) => {
  return useQuery({
    queryKey: ["movie-details", id],
    queryFn: () => getMoviesDetailsByID(id),
    retry: false,
    staleTime: 0,                  
    refetchOnMount: "always",           
    refetchOnWindowFocus: true,
  });
};
export const useMovieVideoDetailsByID = (id: number) => {
  return useQuery({
    queryKey: ["movie-video-details", id],
    queryFn: () => getMoviesVideoDetailsByID(id),
    retry: false,
    staleTime: 0,                  
    refetchOnMount: "always",           
    refetchOnWindowFocus: true,
  });
};