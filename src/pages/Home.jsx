import React, { useEffect, useState } from 'react';
import { useDebounce } from 'react-use';

import Search from '../components/Search';
import LoadingSpinner from '../components/LoadingSpinner';
import MovieCard from '../components/MovieCard';
import { getTrendingMovies, updateSearchCount } from '../appwrite';
import TrendingMovie from '../components/TrendingMovie';
import Pagination from '../components/Pagination';

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [debounceSearchTerm, setDebounceSearchTerm] = useState('');

    const [movieList, setMovieList] = useState([]);

    const [trendingMovie, setTrendingMovie] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    const [totalPages, setTotalPages] = useState(1);

    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [sortBy, setSortBy] = useState('popularity.desc');

    const [errorFetchMessage, setErrorFetchMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useDebounce(() => setDebounceSearchTerm(searchTerm), 500, [searchTerm]);

    const API_BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const API_OPTIONS = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
    };

    const fetchGenres = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/genre/movie/list`,
                API_OPTIONS,
            );
            const data = await response.json();
            setGenres(data.genres || []);
        } catch (err) {
            console.error('Error fetching genres:', err);
        }
    };

    const fetchMovies = async (
        query = '',
        page = 1,
        genre = '',
        sort = 'popularity.desc',
    ) => {
        setIsLoading(true);
        setErrorFetchMessage('');

        try {
            let endpoint;

            if (query) {
                endpoint = `${API_BASE_URL}/search/movie?query=${encodeURIComponent(
                    query,
                )}&page=${page}`;
            } else {
                endpoint = `${API_BASE_URL}/discover/movie?sort_by=${sort}&page=${page}`;
                if (genre) {
                    endpoint += `&with_genres=${genre}`;
                }
            }

            const response = await fetch(endpoint, API_OPTIONS);

            if (!response.ok) {
                throw new Error('Failed to fetch');
            }

            const data = await response.json();

            if (data.Response === 'false') {
                setErrorFetchMessage(data.Error || 'Failed to fetch movies');
                setMovieList([]);
                return;
            }

            setMovieList(data.results || []);
            setTotalPages(Math.min(data.total_pages || 1, 500)); // TMDB API limit
            setCurrentPage(page);

            if (query && data.results.length > 0) {
                await updateSearchCount(query, data.results[0]);
            }
        } catch (err) {
            console.error(`Error fetching: ${err}`);
            setErrorFetchMessage('Error fetching movies. Please try again');
        } finally {
            setIsLoading(false);
        }
    };

    const loadingTrendingMovie = async () => {
        try {
            const movies = await getTrendingMovies();
            setTrendingMovie(movies);
        } catch (err) {
            console.log('Failed to fetch trending movies: ', err);
        }
    };

    const handlePageChange = (page) => {
        fetchMovies(debounceSearchTerm, page, selectedGenre, sortBy);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleGenreChange = (genre) => {
        setSelectedGenre(genre);
        setCurrentPage(1);
        fetchMovies(debounceSearchTerm, 1, genre, sortBy);
    };

    const handleSortChange = (sort) => {
        setSortBy(sort);
        setCurrentPage(1);
        fetchMovies(debounceSearchTerm, 1, selectedGenre, sort);
    };

    useEffect(() => {
        fetchMovies(debounceSearchTerm, currentPage, selectedGenre, sortBy);
    }, [debounceSearchTerm]);

    useEffect(() => {
        loadingTrendingMovie();
        fetchGenres();
    }, []);

    return (
        <main>
            <div className="pattern"></div>
            <div className="wrapper">
                <header>
                    <img src="./hero-img.png" alt="hero" />
                    <h1>
                        Find <span className="text-gradient">Movies</span>
                        You'll Enjoy Without Hassle
                    </h1>
                    <Search
                        searchTerm={searchTerm}
                        setSearchTerm={setSearchTerm}
                    />
                </header>

                {trendingMovie.length > 0 && !debounceSearchTerm && (
                    <TrendingMovie movies={trendingMovie} />
                )}

                {/* Filters */}
                <div className="filters">
                    <div className="filter-group">
                        <label htmlFor="genre-select">Genre:</label>
                        <select
                            id="genre-select"
                            value={selectedGenre}
                            onChange={(e) => handleGenreChange(e.target.value)}
                            className="filter-select"
                        >
                            <option value="">All Genres</option>
                            {genres.map((genre) => (
                                <option key={genre.id} value={genre.id}>
                                    {genre.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="sort-select">Sort by:</label>
                        <select
                            id="sort-select"
                            value={sortBy}
                            onChange={(e) => handleSortChange(e.target.value)}
                            className="filter-select"
                        >
                            <option value="popularity.desc">
                                Most Popular
                            </option>
                            <option value="release_date.desc">
                                Newest First
                            </option>
                            <option value="release_date.asc">
                                Oldest First
                            </option>
                            <option value="vote_average.desc">
                                Highest Rated
                            </option>
                            <option value="vote_count.desc">Most Voted</option>
                        </select>
                    </div>
                </div>

                <section className="all-movies">
                    <h2>
                        {debounceSearchTerm
                            ? `Search results for "${debounceSearchTerm}"`
                            : 'All movies'}
                    </h2>
                    {isLoading ? (
                        <LoadingSpinner />
                    ) : errorFetchMessage ? (
                        <p className="error-message">{errorFetchMessage}</p>
                    ) : (
                        <>
                            <ul className="movie-grid">
                                {movieList.map((movie) => (
                                    <MovieCard key={movie.id} movie={movie} />
                                ))}
                            </ul>

                            {movieList.length > 0 && (
                                <Pagination
                                    currentPage={currentPage}
                                    totalPages={totalPages}
                                    onPageChange={handlePageChange}
                                />
                            )}
                        </>
                    )}
                </section>
            </div>
        </main>
    );
}

export default Home;
