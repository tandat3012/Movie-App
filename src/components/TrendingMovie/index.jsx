import React from 'react';
import { Link } from 'react-router-dom';

function TrendingMovie({ movies }) {
    // Limit to top 5 trending movies for perfect single row layout
    const topMovies = movies.slice(0, 5);

    return (
        <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
                {topMovies.map((movie, i) => (
                    <li key={movie.$id}>
                        <p>{i + 1}</p>
                        <Link to={`/movie/${movie.movie_id}`}>
                            <img
                                src={
                                    movie.poster_URL?.trim() || '/No-Poster.png'
                                }
                                alt={movie.searchTerm || 'Movie'}
                            />
                        </Link>
                    </li>
                ))}
            </ul>
        </section>
    );
}

export default TrendingMovie;
