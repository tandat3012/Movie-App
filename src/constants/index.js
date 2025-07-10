// API Configuration
export const API_CONFIG = {
    BASE_URL: 'https://api.themoviedb.org/3',
    IMAGE_BASE_URL: 'https://image.tmdb.org/t/p/',
    YOUTUBE_BASE_URL: 'https://www.youtube.com/watch?v=',
    IMAGE_SIZES: {
        POSTER: {
            SMALL: 'w185',
            MEDIUM: 'w300',
            LARGE: 'w500',
            ORIGINAL: 'original',
        },
        BACKDROP: {
            SMALL: 'w300',
            MEDIUM: 'w780',
            LARGE: 'w1280',
            ORIGINAL: 'original',
        },
        PROFILE: {
            SMALL: 'w45',
            MEDIUM: 'w185',
            LARGE: 'h632',
            ORIGINAL: 'original',
        },
    },
};

// App Configuration
export const APP_CONFIG = {
    NAME: 'Movie Discovery App',
    VERSION: '1.0.0',
    DEFAULT_PAGE_SIZE: 20,
    MAX_PAGES: 500, // TMDB API limit
    SEARCH_DEBOUNCE_DELAY: 500,
    ANIMATION_DURATION: 300,
};

// Route Paths
export const ROUTES = {
    HOME: '/',
    MOVIE_DETAIL: '/movie/:id',
    FAVORITES: '/favorites',
    SEARCH: '/search',
};

// Local Storage Keys
export const STORAGE_KEYS = {
    FAVORITES: 'movieapp_favorites',
    SEARCH_HISTORY: 'movieapp_search_history',
    USER_PREFERENCES: 'movieapp_preferences',
    THEME: 'movieapp_theme',
};

// Sort Options
export const SORT_OPTIONS = [
    { value: 'popularity.desc', label: 'Most Popular' },
    { value: 'popularity.asc', label: 'Least Popular' },
    { value: 'release_date.desc', label: 'Newest First' },
    { value: 'release_date.asc', label: 'Oldest First' },
    { value: 'vote_average.desc', label: 'Highest Rated' },
    { value: 'vote_average.asc', label: 'Lowest Rated' },
    { value: 'vote_count.desc', label: 'Most Voted' },
    { value: 'vote_count.asc', label: 'Least Voted' },
    { value: 'title.asc', label: 'A-Z' },
    { value: 'title.desc', label: 'Z-A' },
];

// Movie Genres (commonly used ones)
export const COMMON_GENRES = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western',
};

// Rating Thresholds
export const RATING_THRESHOLDS = {
    EXCELLENT: 8.0,
    GOOD: 7.0,
    AVERAGE: 6.0,
    POOR: 4.0,
};

// Color Themes
export const COLORS = {
    PRIMARY: '#e50914',
    PRIMARY_DARK: '#b8070f',
    SECONDARY: '#221f1f',
    BACKGROUND: '#0a0a0a',
    BACKGROUND_LIGHT: '#1a1a2e',
    TEXT_PRIMARY: '#ffffff',
    TEXT_SECONDARY: '#a0a0a0',
    TEXT_MUTED: '#666666',
    SUCCESS: '#4ecdc4',
    WARNING: '#feca57',
    ERROR: '#ff6b6b',
    INFO: '#45b7d1',
};

// Breakpoints for responsive design
export const BREAKPOINTS = {
    MOBILE: 768,
    TABLET: 1024,
    DESKTOP: 1280,
    LARGE: 1440,
};

// Animation Easing
export const EASING = {
    EASE_IN: 'cubic-bezier(0.4, 0, 1, 1)',
    EASE_OUT: 'cubic-bezier(0, 0, 0.2, 1)',
    EASE_IN_OUT: 'cubic-bezier(0.4, 0, 0.2, 1)',
    BOUNCE: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
};

// Error Messages
export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error. Please check your connection and try again.',
    API_ERROR: 'Failed to fetch data from the server. Please try again later.',
    NOT_FOUND: 'The requested content was not found.',
    UNAUTHORIZED: 'You are not authorized to access this content.',
    RATE_LIMITED: 'Too many requests. Please wait a moment and try again.',
    GENERIC: 'Something went wrong. Please try again.',
    NO_RESULTS: 'No results found for your search.',
    FAVORITES_ERROR: 'Failed to update favorites. Please try again.',
};

// Success Messages
export const SUCCESS_MESSAGES = {
    FAVORITE_ADDED: 'Movie added to favorites!',
    FAVORITE_REMOVED: 'Movie removed from favorites!',
    SEARCH_COMPLETED: 'Search completed successfully!',
};

// Feature Flags
export const FEATURES = {
    INFINITE_SCROLL: false,
    DARK_MODE_TOGGLE: false,
    ADVANCED_SEARCH: true,
    MOVIE_TRAILERS: true,
    USER_REVIEWS: false,
    SOCIAL_SHARING: false,
};

export default {
    API_CONFIG,
    APP_CONFIG,
    ROUTES,
    STORAGE_KEYS,
    SORT_OPTIONS,
    COMMON_GENRES,
    RATING_THRESHOLDS,
    COLORS,
    BREAKPOINTS,
    EASING,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    FEATURES,
};
