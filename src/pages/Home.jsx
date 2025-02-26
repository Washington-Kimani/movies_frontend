import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Home = ({ movies }) => {
    const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

    useEffect(() => {
        // Automatically change the banner every 5 seconds
        const interval = setInterval(() => {
            setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
        }, 5000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, [movies.length]);

    const currentMovie = movies[currentMovieIndex];

    if(!currentMovie) {
        return (
            <div className="w-full h-full flex gap-3 justify-center items-center">
                <div className={"rounded-full w-12 h-12 border-b-2 border-gray-200 animate-spin"}></div>
                <h3>Loading...</h3>
            </div>
        )
    }

    return (
        <div className="w-full min-h-screen bg-gray-900 text-white">
            {/* Banner Section */}
            <section className="relative h-[85vh] transition-all duration-500 ease-in-out">
                <img
                    src={currentMovie?.banner}
                    alt={currentMovie.name}
                    className="w-full h-full object-cover opacity-70  aspect-video"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50"></div>
                <div className="absolute bottom-4 left-6 text-left max-w-xl z-10">
                    <h1 className="text-4xl font-bold mb-3">{currentMovie.name}</h1>
                    <p className="text-xl mb-4">{currentMovie.description}</p>
                    <p className="text-lg">Release Year: {currentMovie.release_year}</p>
                    <p className="text-lg">Rating: {currentMovie.rating}</p>
                </div>

                <Link to={`/movies/${currentMovie._id}`} className={"absolute bottom-4 right-6 text-black bg-amber-300 px-4 py-2 rounded-md"}>
                    Visit Movie
                </Link>
            </section>

            <h1 className={"text-start text-3xl font-bold my-6 ml-4"}>Trending Movies</h1>

            {/* Movie List Section */}
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
                {movies.slice(0, 8).map((movie, index) => (
                    <div key={index} className="bg-slate-800 rounded-lg shadow-md overflow-hidden">
                        <Link to={`/movies/${movie._id}`} className={"block"}>
                            <img
                                src={movie.poster}
                                alt={movie.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="p-4">
                                <h2 className="text-md font-semibold text-white">{movie.name}</h2>
                                <section className={"flex gap-3 items-center py-2 text-sm text-gray-400"}>
                                    <p className="text-gray-400">Release Year: {movie.release_year}</p>
                                    <p className="text-gray-400">Rating: {movie.rating}</p>
                                </section>
                            </div>
                        </Link>
                    </div>
                ))}
            </section>
        </div>
    );
};

export default Home;