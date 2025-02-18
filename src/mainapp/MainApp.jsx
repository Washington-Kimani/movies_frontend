import {Routes, Route} from "react-router-dom";
import {useState} from "react";

// import components
import Navbar from "../components/Navbar.jsx";
import MovieDetail from "../components/MovieDetail.jsx";

// import pages
import Home from "../pages/Home.jsx"
import Movies from "../pages/Movies.jsx";
import Actors from "../pages/Actors.jsx";

// MainApp component
const MainApp = () => {
    const [allMovies, setAllMovies] = useState([]);

    return (
        <div>
            <Navbar />
            <section className="w-full min-h-screen flex flex-col items-center justify-center p-6">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/movies" element={<Movies setAllMovies={setAllMovies} />} />
                    <Route path="/movies/:movieId" element={<MovieDetail movies={allMovies} />} />
                    <Route path="/actors" element={<Actors />} />
                </Routes>
            </section>
        </div>
    )
}

export default MainApp;