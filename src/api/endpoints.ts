export const ENDPOINTS = {
    MOVIES: {
      POPULAR: '/movie/popular',
      NOW_PLAYING: '/movie/now_playing',
      UPCOMING: '/movie/upcoming',
      DETAILS: (id:  number | string) => `/movie/${id}`,
      VIDEOS: (id : number | string) => `/movie/${id}/videos`,
    },
    TV: {
      POPULAR: '/tv/popular',
      DETAILS: (id : number | string) => `/tv/${id}`,
    },
    SEARCH: {
      MULTI: '/search/multi',
    },
  };
  