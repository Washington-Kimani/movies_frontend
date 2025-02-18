import {useState, useEffect} from "react";
import axios from "../configs/axios.js";
import {Link} from "react-router-dom";

const Movies = ({setAllMovies}) => {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    //fetch all movies from API and set them to state
    useEffect(() => {
        //fetch all movies from API and set them to state
        const getMovies = async () => {
            try {
                const response = await axios.get('/movies');
                setMovies(response.data);
                setAllMovies(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        }

        getMovies();
    }, []);

    if (loading) {
        return <div className="w-full h-full flex gap-3 justify-center items-center">
            <div className={"rounded-full w-12 h-12 border-b-2 border-gray-200 animate-spin"}></div>
            <h3>Loading Movies...</h3>
        </div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return (
        <div className={"w-full min-h-full bg-transparent"}>
            <section>

            </section>
            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-6 gap-4 p-4">
                {
                    movies && movies.map((movie, index) => (
                        <div key={index} className="bg-slate-900 h-fit rounded-lg shadow-md overflow-hidden">
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
                    ))
                }
            </section>
        </div>
    )
}

export default Movies;