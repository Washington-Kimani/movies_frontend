import {useEffect, useState} from "react";
import axios from "../configs/axios.js";

const Actors = () => {
    const [actors, setActors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const getActors = async () => {
            try {
                const response = await axios.get("/actors");
                setActors(response.data);
                setLoading(false);
            }catch(err) {
                setError(err);
                setLoading(false);
            }
        }

        getActors();
    }, []);

    if (loading) {
        return <div className="w-full h-full flex gap-3 justify-center items-center">
            <div className={"rounded-full w-12 h-12 border-b-2 border-gray-200 animate-spin"}></div>
            <h3>Loading Actors...</h3>
        </div>
    }

    if (error) {
        return <div>Error: {error.message}</div>
    }

    return(
        <div className={"w-full mx-auto flex flex-col items-center justify-center gap-4"}>
            {
                actors.map((actor, index) => (
                    <div className="w-[70%] grid grid-cols-1 md:grid-cols-2 gap-8 p-6 mx-auto bg-slate-600 rounded-lg shadow-lg" key={index}>
                        {/* Left Column - Photo */}
                        <div className="flex justify-center items-center">
                            <img
                                src={actor.photo}
                                alt={actor.name}
                                className="rounded-lg shadow-lg max-w-6xl object-cover"
                            />
                        </div>

                        {/* Right Column - Information */}
                        <div>
                            <h2 className="text-3xl font-semibold text-gray-800 mb-2">{actor.name}</h2>
                            <p className="text-gray-100 mb-4">
                                <strong>Age:</strong> {actor.age} years
                            </p>
                            <p className="text-gray-100 mb-4">
                                <strong>Born:</strong> {new Date(actor.birthDate).toLocaleDateString()} in {actor.birthPlace}
                            </p>
                            <p className="text-gray-300 mb-6">{actor.bio}</p>

                            {/* Movies */}
                            <div>
                                <h3 className="font-semibold text-lg text-gray-800 mb-2">Movies:</h3>
                                <ul className="list-disc pl-5 text-gray-300">
                                    {actor.movies.map((movie, index) => (
                                        <li key={index}>{movie}</li>
                                    ))}
                                </ul>
                            </div>

                            {/* Children */}
                            <div className="mt-4">
                                <h3 className="font-semibold text-lg text-gray-800 mb-2">Children:</h3>
                                <ul className="list-disc pl-5 text-gray-400">
                                    {actor.children.map((child, index) => (
                                        <li key={index}>{child}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default Actors;