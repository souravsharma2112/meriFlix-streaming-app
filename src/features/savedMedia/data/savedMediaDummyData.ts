import { ImageSourcePropType } from 'react-native'

export type MediaTabKey = 'movies' | 'tvShows'

export type SavedMovieItem = {
  id: string
  title: string
  year: number
  image: ImageSourcePropType
  duration: string
  quality: 'HD' | 'Full HD' | '4K'
  rating: number
  genres: string[]
  badgeText: string
  caption: string
}

export type SavedTvShowItem = {
  id: string
  title: string
  year: number
  image: ImageSourcePropType
  seasonInfo: string
  nextEpisode: string
  progress: number
  episodesLeft: number
  quality: 'HD' | 'Full HD' | '4K'
  genres: string[]
  badgeText: string
  caption: string
}

export type SavedMediaDataset = {
  movies: SavedMovieItem[]
  tvShows: SavedTvShowItem[]
}

const posterA = require('../../../../assets/images/m1.png')
const posterB = require('../../../../assets/images/detail.png')

export const favouriteMediaData: SavedMediaDataset = {
  movies: [
    {
      id: 'fav-m-1',
      title: 'Midnight Echo',
      year: 2024,
      image: posterA,
      duration: '2h 08m',
      quality: '4K',
      rating: 8.8,
      genres: ['Sci-Fi', 'Drama'],
      badgeText: '98% Match',
      caption: 'Rewatched this week',
    },
    {
      id: 'fav-m-2',
      title: 'Silent Harbor',
      year: 2023,
      image: posterB,
      duration: '1h 54m',
      quality: 'Full HD',
      rating: 8.2,
      genres: ['Thriller', 'Mystery'],
      badgeText: 'Critic Pick',
      caption: 'Saved from trending',
    },
    {
      id: 'fav-m-3',
      title: 'Nova District',
      year: 2022,
      image: posterA,
      duration: '2h 19m',
      quality: '4K',
      rating: 9.1,
      genres: ['Action', 'Cyberpunk'],
      badgeText: 'Top Rated',
      caption: 'Great visuals',
    },
    {
      id: 'fav-m-4',
      title: 'Golden Summer',
      year: 2021,
      image: posterB,
      duration: '1h 46m',
      quality: 'HD',
      rating: 7.9,
      genres: ['Romance', 'Comedy'],
      badgeText: 'Comfort Watch',
      caption: 'Weekend favorite',
    },
  ],
  tvShows: [
    {
      id: 'fav-tv-1',
      title: 'Atlas Files',
      year: 2024,
      image: posterB,
      seasonInfo: 'Season 2',
      nextEpisode: 'S2:E7 - The Fault Line',
      progress: 72,
      episodesLeft: 3,
      quality: '4K',
      genres: ['Thriller', 'Investigation'],
      badgeText: 'Binge Ready',
      caption: 'Updated yesterday',
    },
    {
      id: 'fav-tv-2',
      title: 'Dreamline',
      year: 2023,
      image: posterA,
      seasonInfo: 'Season 1',
      nextEpisode: 'S1:E11 - Reentry',
      progress: 86,
      episodesLeft: 1,
      quality: 'Full HD',
      genres: ['Sci-Fi', 'Adventure'],
      badgeText: 'Almost Done',
      caption: 'Finale tonight',
    },
    {
      id: 'fav-tv-3',
      title: 'Kitchen Rebels',
      year: 2022,
      image: posterB,
      seasonInfo: 'Season 4',
      nextEpisode: 'S4:E4 - Pressure Test',
      progress: 40,
      episodesLeft: 8,
      quality: 'HD',
      genres: ['Reality', 'Food'],
      badgeText: 'Weekly Drop',
      caption: 'New episode Friday',
    },
  ],
}

export const watchlistMediaData: SavedMediaDataset = {
  movies: [
    {
      id: 'watch-m-1',
      title: 'The Last Monsoon',
      year: 2025,
      image: posterB,
      duration: '2h 02m',
      quality: '4K',
      rating: 8.5,
      genres: ['Adventure', 'Drama'],
      badgeText: 'Tonight',
      caption: 'Queued for 9:30 PM',
    },
    {
      id: 'watch-m-2',
      title: 'Signal Room',
      year: 2024,
      image: posterA,
      duration: '1h 38m',
      quality: 'Full HD',
      rating: 7.8,
      genres: ['Mystery', 'Tech'],
      badgeText: 'Priority 1',
      caption: 'Recommended for you',
    },
    {
      id: 'watch-m-3',
      title: 'Paper Crowns',
      year: 2023,
      image: posterB,
      duration: '2h 11m',
      quality: 'HD',
      rating: 8.0,
      genres: ['History', 'Drama'],
      badgeText: 'Weekend',
      caption: 'Add popcorn',
    },
    {
      id: 'watch-m-4',
      title: 'Red Orbit',
      year: 2022,
      image: posterA,
      duration: '1h 57m',
      quality: '4K',
      rating: 8.7,
      genres: ['Action', 'Sci-Fi'],
      badgeText: 'IMAX Feel',
      caption: 'Best on TV',
    },
  ],
  tvShows: [
    {
      id: 'watch-tv-1',
      title: 'Northbound',
      year: 2025,
      image: posterA,
      seasonInfo: 'Season 1',
      nextEpisode: 'Start with S1:E1 - Departure',
      progress: 0,
      episodesLeft: 10,
      quality: '4K',
      genres: ['Drama', 'Road'],
      badgeText: 'New Series',
      caption: 'Fresh release',
    },
    {
      id: 'watch-tv-2',
      title: 'Cipher Unit',
      year: 2024,
      image: posterB,
      seasonInfo: 'Season 3',
      nextEpisode: 'Continue S3:E2 - Ghost Port',
      progress: 18,
      episodesLeft: 9,
      quality: 'Full HD',
      genres: ['Crime', 'Action'],
      badgeText: 'Continue',
      caption: 'Paused last week',
    },
    {
      id: 'watch-tv-3',
      title: 'Blue House',
      year: 2023,
      image: posterA,
      seasonInfo: 'Season 2',
      nextEpisode: 'Start S2:E1 - Reopen',
      progress: 0,
      episodesLeft: 8,
      quality: 'HD',
      genres: ['Comedy', 'Family'],
      badgeText: 'Light Watch',
      caption: 'Sunday lineup',
    },
  ],
}
