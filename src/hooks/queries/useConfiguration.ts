import { useQuery } from "@tanstack/react-query";
import { getGenreMovieList } from "../../api/tmdb/configurationService";

export const useGenreMovieList= () => {
    return useQuery({
        queryKey : ["genre-movies"],
        queryFn : getGenreMovieList,
        retry : false
    })
}