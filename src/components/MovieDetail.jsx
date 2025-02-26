import { useParams } from 'react-router-dom';
import * as FaIcons from "react-icons/fa";

const MovieDetail = ({ movies }) => {
    // To get the movie ID from the URL
    const { movieId } = useParams();  
    const movie = movies.find((movie) => movie._id === movieId);

    if (!movie) {
        return <div>Movie not found!</div>;
    }

    return (
        <div className="w-[80%] mx-auto p-6">
            <div className={"w-full flex justify-between items-center"}>
                <h1 className="text-3xl font-bold mb-6">Movie Detail</h1>
                <button className="flex gap-2 items-center text-white bg-blue-600 rounded-md px-4 py-2" onClick={() => window.history.back()}>
                    <FaIcons.FaArrowLeft className="text-white" />
                    <p>Back</p>
                </button>
            </div>
            <div className="flex flex-col sm:flex-row bg-slate-900 rounded-lg shadow-lg overflow-hidden p-4 space-y-4 sm:space-y-0 sm:space-x-6">
                <img
                    src={movie.poster}
                    alt={movie.name}
                    className="w-full sm:w-64 h-96 object-cover rounded-lg shadow-md"
                />
                <section className="flex flex-col justify-between text-white">
                    <h2 className="text-3xl font-bold">Title: {movie.name}</h2>
                    <p className="text-xl text-gray-300 mt-2">{movie.description}</p>
                    <div className="mt-2">
                        <p className="text-gray-400">Release Year: {movie.release_year}</p>
                        <p className="text-gray-400">Rating: {movie.rating}</p>
                        <p className="text-gray-400">Genre: {movie.genre.join(', ')}</p>
                        <p className="text-gray-400">Director: {movie.director}</p>
                        <p className="text-gray-400">Actors: {movie.actors.join(', ')}</p>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default MovieDetail;
