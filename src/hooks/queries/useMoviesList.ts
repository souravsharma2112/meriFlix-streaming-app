import { usePopularMovies, useTrendingNowMovies, useTrendingWeekMovies, useUpcomingMovies } from "./useMovies";

export type MovieListType = "upcoming" | "popular" | "trendingNow" | "trendingWeek";

export const useMoviesList = (type: MovieListType) => {
  switch (type) {
    case "upcoming":
      return useUpcomingMovies();

    case "popular":
      return usePopularMovies();

    case "trendingNow":
      return useTrendingNowMovies();

    case "trendingWeek":
      return useTrendingWeekMovies();

    default:
      throw new Error("Invalid movie list type");
  }
};