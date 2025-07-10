import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Star, Trash2 } from 'lucide-react';
import { getFavorites, removeFromFavorites } from '../appwrite';
import LoadingSpinner from '../components/LoadingSpinner';

function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    const loadFavorites = async () => {
        try {
            setIsLoading(true);
            const favMovies = await getFavorites();
            console.log('Loaded favorites:', favMovies);
            setFavorites(favMovies);
        } catch (err) {
            console.error('Error loading favorites:', err);
            setError('Không thể tải danh sách yêu thích');
        } finally {
            setIsLoading(false);
        }
    };

    const handleRemoveFavorite = async (movieId) => {
        try {
            await removeFromFavorites(movieId);
            setFavorites((prev) =>
                prev.filter((movie) => movie.movie_id !== movieId),
            );
        } catch (err) {
            console.error('Error removing favorite:', err);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner />
            </div>
        );
    }

    return (
        <div className="favorites-page">
            <div className="container">
                <header className="page-header">
                    <div className="header-content">
                        <Heart className="page-icon" size={32} />
                        <div>
                            <h1>My Favorites</h1>
                            <p>Movies you've saved for later</p>
                        </div>
                    </div>
                    <Link to="/" className="back-link">
                        Back to Home
                    </Link>
                </header>

                {error && (
                    <div className="error-message">
                        <p>{error}</p>
                        <p>
                            Lưu ý: Tính năng yêu thích cần có Appwrite
                            Collection ID hợp lệ. Vui lòng kiểm tra cấu hình
                            Appwrite.
                        </p>
                    </div>
                )}

                {favorites.length === 0 && !isLoading && !error ? (
                    <div className="empty-state">
                        <Heart size={64} className="empty-icon" />
                        <h2>No favorites yet</h2>
                        <p>
                            Start adding movies to your favorites to see them
                            here!
                        </p>
                        <Link to="/" className="cta-button">
                            Discover Movies
                        </Link>
                    </div>
                ) : (
                    <div className="favorites-grid">
                        {favorites.map((movie) => (
                            <div key={movie.movie_id} className="favorite-card">
                                <Link
                                    to={`/movie/${movie.movie_id}`}
                                    className="movie-link"
                                >
                                    <img
                                        src={
                                            movie.poster_URL &&
                                            movie.poster_URL !==
                                                'https://image.tmdb.org/t/p/w500null '
                                                ? movie.poster_URL.trim()
                                                : '/No-Poster.png'
                                        }
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                    <div className="movie-info">
                                        <h3>{movie.title}</h3>
                                        {movie.vote_average && (
                                            <div className="rating">
                                                <Star size={16} />
                                                <span>
                                                    {movie.vote_average.toFixed(
                                                        1,
                                                    )}
                                                </span>
                                            </div>
                                        )}
                                        {movie.release_date && (
                                            <p className="release-year">
                                                {
                                                    movie.release_date.split(
                                                        '-',
                                                    )[0]
                                                }
                                            </p>
                                        )}
                                        {movie.overview && (
                                            <p className="overview">
                                                {movie.overview.length > 150
                                                    ? `${movie.overview.substring(
                                                          0,
                                                          150,
                                                      )}...`
                                                    : movie.overview}
                                            </p>
                                        )}
                                    </div>
                                </Link>
                                <button
                                    onClick={() =>
                                        handleRemoveFavorite(movie.movie_id)
                                    }
                                    className="remove-button"
                                    title="Remove from favorites"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Favorites;
