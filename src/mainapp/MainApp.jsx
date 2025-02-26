import { Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../configs/axios.js";

// import components
import Navbar from "../components/Navbar.jsx";
import MovieDetail from "../components/MovieDetail.jsx";

// import pages
import Home from "../pages/Home.jsx";
import Movies from "../pages/Movies.jsx";
import Actors from "../pages/Actors.jsx";

// MainApp component
const MainApp = () => {
    const [movies, setMovies] = useState([]);
    const [actors, setActors] = useState([]);
    const location = useLocation();  // Hook to get current page location

    // Fetch movies on mount
    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const res = await axios.get('/movies');
                setMovies(res.data);  // Store all movies
            } catch (err) {
                console.log('Error fetching movies:', err);
            }
        };
        fetchMovies();
    }, []);  // Only fetch once when the component mounts

    // Fetch actors on mount
    useEffect(() => {
        const fetchActors = async () => {
            try {
                const res = await axios.get('/actors');
                setActors(res.data);  // Store all actors
            } catch (err) {
                console.log('Error fetching actors:', err);
            }
        };
        fetchActors();
    }, []);  // Only fetch once when the component mounts

    // Handle search based on query
    const handleSearch = async (query, page) => {
        if (page === "movies") {
            try {
                const res = await axios.post(`/movies/search?q=${query}`);
                if (res.data) {
                    // set new value to movies state
                    setMovies(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        } else if (page === "actors") {
            try {
                const res = await axios.post(`/actors/search?q=${query}`);
                if (res) {
                    // set new value to actors state
                    setActors(res.data);
                }
            } catch (err) {
                console.log(err);
            }
        }
    };

    // Reset state when navigating back to Movies or Actors pages
    useEffect(() => {
        if (location.pathname === '/movies') {
            const fetchMovies = async () => {
                try {
                    const res = await axios.get('/movies');
                    setMovies(res.data);  // Reset to all movies
                } catch (err) {
                    console.log('Error fetching movies:', err);
                }
            };
            fetchMovies();
        }
        if (location.pathname === '/actors') {
            const fetchActors = async () => {
                try {
                    const res = await axios.get('/actors');
                    setActors(res.data);  // Reset to all actors
                } catch (err) {
                    console.log('Error fetching actors:', err);
                }
            };
            fetchActors();
        }
    }, [location]);  // Run every time the location changes (page changes)

    return (
        <div>
            <Navbar onSearch={handleSearch} />
            <section className="w-full min-h-screen flex flex-col items-center justify-center p-6">
                <Routes>
                    <Route path="/" element={<Home movies={movies} />} />
                    <Route path="/movies" element={<Movies movies={movies} />} />
                    <Route path="/movies/:movieId" element={<MovieDetail movies={movies} />} />
                    <Route path="/actors" element={<Actors actors={actors} />} />
                </Routes>
            </section>
        </div>
    );
};

export default MainApp;
