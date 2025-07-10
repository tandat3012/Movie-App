import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import MovieDetail from './pages/MovieDetail';
import Favorites from './pages/Favorites';
import './App.css';
import { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen';

function App() {
    const [isVisible, setIsVisible] = useState(true);
    const [isExit, setIsExit] = useState(false);

    useEffect(() => {
        const timer1 = setTimeout(() => {
            setIsExit(true);
        }, 1500);

        const timer2 = setTimeout(() => {
            setIsVisible(false);
        }, 2500);

        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, []);
    return (
        <Router>
            <div className="app">
                {isVisible ? (
                    <LoadingScreen isExit={isExit} />
                ) : (
                    <>
                        <Navigation />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route
                                path="/movie/:id"
                                element={<MovieDetail />}
                            />
                            <Route path="/favorites" element={<Favorites />} />
                        </Routes>
                    </>
                )}
            </div>
        </Router>
    );
}

export default App;
