import React from 'react';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
    return (
        <li className="movie-card">
            <Link to={`/movie/${movie.id}`}>
                <img
                    src={
                        movie.poster_path
                            ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                            : '/No-Poster.png'
                    }
                    alt={movie.title}
                    loading="lazy"
                />
                <h3>{movie.title}</h3>
                <div className="content">
                    <div className="rating">
                        <img src="/star.svg" alt="rating" />
                        <p>
                            {movie.vote_average
                                ? movie.vote_average.toFixed(1)
                                : 'N/A'}
                        </p>
                    </div>
                    <span className="lang">
                        {movie.original_language?.toUpperCase()}
                    </span>
                    <span className="year">
                        {movie.release_date
                            ? movie.release_date.split('-')[0]
                            : 'N/A'}
                    </span>
                </div>
            </Link>
        </li>
    );
}

export default MovieCard;
