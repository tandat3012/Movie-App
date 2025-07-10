const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${API_KEY}`,
    },
};

class TMDBService {
    async fetchData(endpoint) {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, API_OPTIONS);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.success === false) {
            throw new Error(data.status_message || 'API request failed');
        }

        return data;
    }

    async getMovies({
        query = '',
        page = 1,
        genre = '',
        sortBy = 'popularity.desc',
    } = {}) {
        let endpoint;

        if (query) {
            endpoint = `/search/movie?query=${encodeURIComponent(
                query,
            )}&page=${page}`;
        } else {
            endpoint = `/discover/movie?sort_by=${sortBy}&page=${page}`;
            if (genre) {
                endpoint += `&with_genres=${genre}`;
            }
        }

        return this.fetchData(endpoint);
    }

    async getMovieDetails(movieId) {
        return this.fetchData(`/movie/${movieId}`);
    }

    async getMovieCredits(movieId) {
        return this.fetchData(`/movie/${movieId}/credits`);
    }

    async getMovieVideos(movieId) {
        return this.fetchData(`/movie/${movieId}/videos`);
    }

    async getMovieRecommendations(movieId) {
        return this.fetchData(`/movie/${movieId}/recommendations`);
    }

    async getGenres() {
        return this.fetchData('/genre/movie/list');
    }

    async getTrendingMovies(timeWindow = 'week') {
        return this.fetchData(`/trending/movie/${timeWindow}`);
    }

    getImageUrl(path, size = 'w500') {
        if (!path) return null;
        return `https://image.tmdb.org/t/p/${size}${path}`;
    }

    getYouTubeUrl(key) {
        return `https://www.youtube.com/watch?v=${key}`;
    }
}

export const tmdbService = new TMDBService();
export default tmdbService;
