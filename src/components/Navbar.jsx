import {Link} from "react-router-dom";
// import icons
import * as FaIcons from "react-icons/fa";

const Navbar = () => {

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
            icon: <FaIcons.FaFilm size={20} />,
            text: "Actors"
        }
    ]
    return (
        <div className={"w-full bg-[#011820] h-fit flex items-center justify-around px-10 py-5"}>
            <section>
                <Link to="/" className={"text-white text-2xl font-bold"}>Movies</Link>
            </section>
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