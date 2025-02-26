import {Link} from "react-router-dom";
import { useLocation } from "react-router-dom";
// import icons
import * as FaIcons from "react-icons/fa";
import Search from "./Search.jsx";

// eslint-disable-next-line react/prop-types
const Navbar = ({onSearch}) => {
    const location = useLocation();
    // logic to show search bar only on 2 pages
    const movieActorsPage = location.pathname === "/movies" || location.pathname === "/actors";

    // Determine the page using the search bar
    let page = "";

    if(location.pathname.includes("/actors")){
        page = "actors";
    }else if(location.pathname.includes("/movies")){
        page = "movies";
    }

    const links = [
        {
            path: "/",
            icon: <FaIcons.FaHome size={20} />,
            text: "Home"
        },
        {
            path: "/movies",
            icon: <FaIcons.FaFilm size={20} />,
            text: "Movies"
        },
        {
            path: "/actors",
            icon: <FaIcons.FaUser size={20} />,
            text: "Actors"
        }
    ]
    return (
        <div className={"w-full bg-[#011820] h-fit flex items-center justify-around px-10 py-5 sticky top-0 z-50"}>
            <section>
                <Link to="/" className={"text-white text-2xl font-bold"}>Movies</Link>
            </section>

            {/* Search Bar (Visible only on `/items` page) */}
            {movieActorsPage && <Search handleSearch={onSearch} page={page} />}

            <section className={"flex items-center gap-5"}>
                {links.map((link, index) => (
                    <Link key={index} to={link.path} className={"text-white flex gap-2 items-center mr-5"}>
                        <span>{link.icon} </span>
                        <span>{link.text} </span>
                    </Link>
                ))}
            </section>
        </div>
    )
}

export default Navbar;