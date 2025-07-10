import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
    Star,
    Calendar,
    Clock,
    Globe,
    ArrowLeft,
    Heart,
    Play,
} from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';
import { addToFavorites, removeFromFavorites, isFavorite } from '../appwrite';

function MovieDetail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [videos, setVideos] = useState([]);
    const [recommendations, setRecommendations] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isFav, setIsFav] = useState(false);

    const API_BASE_URL = 'https://api.themoviedb.org/3';
    const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

    const API_OPTIONS = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${API_KEY}`,
        },
    };

    const fetchMovieDetails = async () => {
        try {
            setIsLoading(true);

            // Fetch movie details
            const movieResponse = await fetch(
                `${API_BASE_URL}/movie/${id}`,
                API_OPTIONS,
            );
            const movieData = await movieResponse.json();

            // Fetch cast
            const castResponse = await fetch(
                `${API_BASE_URL}/movie/${id}/credits`,
                API_OPTIONS,
            );
            const castData = await castResponse.json();

            // Fetch videos
            const videosResponse = await fetch(
                `${API_BASE_URL}/movie/${id}/videos`,
                API_OPTIONS,
            );
            const videosData = await videosResponse.json();

            // Fetch recommendations
            const recResponse = await fetch(
                `${API_BASE_URL}/movie/${id}/recommendations`,
                API_OPTIONS,
            );
            const recData = await recResponse.json();

            setMovie(movieData);
            setCast(castData.cast?.slice(0, 10) || []);
            setVideos(
                videosData.results
                    ?.filter((video) => video.type === 'Trailer')
                    .slice(0, 3) || [],
            );
            setRecommendations(recData.results?.slice(0, 6) || []);

            // Check if favorite
            const favStatus = await isFavorite(id);
            setIsFav(favStatus);
        } catch (err) {
            console.error('Error fetching movie details:', err);
            setError('Failed to load movie details');
        } finally {
            setIsLoading(false);
        }
    };

    const handleFavoriteToggle = async () => {
        try {
            if (isFav) {
                console.log('Removing from favorites:', id);
                await removeFromFavorites(id);
                setIsFav(false);
                alert('Đã xóa khỏi danh sách yêu thích!');
            } else {
                console.log('Adding to favorites:', movie);
                await addToFavorites(movie);
                setIsFav(true);
                alert('Đã thêm vào danh sách yêu thích!');
            }
        } catch (err) {
            console.error('Error updating favorites:', err);
            alert(
                'Có lỗi khi cập nhật danh sách yêu thích. Vui lòng thử lại sau.!',
            );
        }
    };

    useEffect(() => {
        if (id) {
            fetchMovieDetails();
        }
    }, [id]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl text-red-500 mb-4">{error}</h2>
                    <Link to="/" className="text-blue-500 hover:underline">
                        Back to Home
                    </Link>
                </div>
            </div>
        );
    }

    if (!movie) return null;

    const formatRuntime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return `${hours}h ${mins}m`;
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className="movie-detail">
            <div
                className="hero-section"
                style={{
                    backgroundImage: movie.backdrop_path
                        ? `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`
                        : 'none',
                }}
            >
                <div className="hero-overlay">
                    <div className="container">
                        <Link to="/" className="back-button">
                            <ArrowLeft size={20} />
                            Back to Home
                        </Link>

                        <div className="hero-content">
                            <div className="movie-poster">
                                <img
                                    src={
                                        movie.poster_path
                                            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                                            : '/No-Poster.png'
                                    }
                                    alt={movie.title}
                                />
                            </div>

                            <div className="movie-info">
                                <h1>{movie.title}</h1>
                                {movie.tagline && (
                                    <p className="tagline">{movie.tagline}</p>
                                )}

                                <div className="movie-meta">
                                    <div className="rating">
                                        <Star className="star-icon" />
                                        <span>
                                            {movie.vote_average?.toFixed(1)}
                                        </span>
                                        <span className="vote-count">
                                            ({movie.vote_count} votes)
                                        </span>
                                    </div>

                                    <div className="meta-item">
                                        <Calendar size={16} />
                                        <span>
                                            {movie.release_date?.split('-')[0]}
                                        </span>
                                    </div>

                                    {movie.runtime && (
                                        <div className="meta-item">
                                            <Clock size={16} />
                                            <span>
                                                {formatRuntime(movie.runtime)}
                                            </span>
                                        </div>
                                    )}

                                    <div className="meta-item">
                                        <Globe size={16} />
                                        <span>
                                            {movie.original_language?.toUpperCase()}
                                        </span>
                                    </div>
                                </div>

                                <div className="genres">
                                    {movie.genres?.map((genre) => (
                                        <span
                                            key={genre.id}
                                            className="genre-tag"
                                        >
                                            {genre.name}
                                        </span>
                                    ))}
                                </div>

                                <div className="action-buttons">
                                    <button
                                        onClick={handleFavoriteToggle}
                                        className={`favorite-btn ${
                                            isFav ? 'active' : ''
                                        }`}
                                        title={
                                            isFav
                                                ? 'Xóa khỏi danh sách yêu thích'
                                                : 'Thêm vào danh sách yêu thích'
                                        }
                                    >
                                        <Heart
                                            size={20}
                                            fill={
                                                isFav ? 'currentColor' : 'none'
                                            }
                                        />
                                        {isFav
                                            ? 'Đã thêm vào yêu thích'
                                            : 'Thêm vào yêu thích'}
                                    </button>

                                    {videos.length > 0 && (
                                        <a
                                            href={`https://www.youtube.com/watch?v=${videos[0].key}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="trailer-btn"
                                        >
                                            <Play size={20} />
                                            Watch Trailer
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container">
                {/* Overview */}
                <section className="overview-section">
                    <h2>Overview</h2>
                    <p>{movie.overview}</p>
                </section>

                {/* Additional Info */}
                <section className="additional-info">
                    <div className="info-grid">
                        {movie.budget > 0 && (
                            <div className="info-item">
                                <h3>Budget</h3>
                                <p>{formatCurrency(movie.budget)}</p>
                            </div>
                        )}

                        {movie.revenue > 0 && (
                            <div className="info-item">
                                <h3>Revenue</h3>
                                <p>{formatCurrency(movie.revenue)}</p>
                            </div>
                        )}

                        {movie.production_companies?.length > 0 && (
                            <div className="info-item">
                                <h3>Production Companies</h3>
                                <p>
                                    {movie.production_companies
                                        .map((company) => company.name)
                                        .join(', ')}
                                </p>
                            </div>
                        )}

                        {movie.production_countries?.length > 0 && (
                            <div className="info-item">
                                <h3>Countries</h3>
                                <p>
                                    {movie.production_countries
                                        .map((country) => country.name)
                                        .join(', ')}
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                {/* Cast */}
                {cast.length > 0 && (
                    <section className="cast-section">
                        <h2>Cast</h2>
                        <div className="cast-grid">
                            {cast.map((actor) => (
                                <div key={actor.id} className="cast-card">
                                    <img
                                        src={
                                            actor.profile_path
                                                ? `https://image.tmdb.org/t/p/w185${actor.profile_path}`
                                                : '/No-Poster.png'
                                        }
                                        alt={actor.name}
                                    />
                                    <h4>{actor.name}</h4>
                                    <p>{actor.character}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Recommendations */}
                {recommendations.length > 0 && (
                    <section className="recommendations-section">
                        <h2>You might also like</h2>
                        <div className="recommendations-grid">
                            {recommendations.map((recMovie) => (
                                <Link
                                    key={recMovie.id}
                                    to={`/movie/${recMovie.id}`}
                                    className="recommendation-card"
                                >
                                    <img
                                        src={
                                            recMovie.poster_path
                                                ? `https://image.tmdb.org/t/p/w300${recMovie.poster_path}`
                                                : '/No-Poster.png'
                                        }
                                        alt={recMovie.title}
                                    />
                                    <h4>{recMovie.title}</h4>
                                    <div className="rec-rating">
                                        <Star size={14} />
                                        <span>
                                            {recMovie.vote_average?.toFixed(1)}
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </div>
    );
}

export default MovieDetail;
