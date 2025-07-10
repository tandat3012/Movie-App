import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart, Home } from 'lucide-react';

function Navigation() {
    return (
        <nav className="navigation">
            <div className="nav-container">
                <Link to="/" className="nav-logo">
                    <img src="/Logo.png" alt="Movie App" />
                    <span>CineMax</span>
                </Link>

                <div className="nav-links">
                    <NavLink to="/" className="nav-link" end>
                        <Home size={20} />
                        <span>Home</span>
                    </NavLink>

                    <NavLink to="/favorites" className="nav-link">
                        <Heart size={20} />
                        <span>Favorites</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
}

export default Navigation;
