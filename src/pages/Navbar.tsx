import { motion } from "framer-motion"
import { Menu, Shrub } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [toggleBtn, setToggleBtn] = useState(false);
    const size = 768;

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setToggleBtn(width > size);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const navLinks = [
        {
            id: 1,
            name: "Home",
            link: "/",
        },
        {
            id: 2,
            name: "About Us",
            link: "about-us"
        },
        {
            id: 3,
            name: "Login",
            link: "login",
        },
    ]

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto p-6 flex justify-between items-center bg-white fixed top-0 left-0 right-0 w-full z-50"
            >
                <Link to="/" className="flex items-center text-3xl font-bold font-poppins text-deep-purple">
                    GrowMate
                    <Shrub className="ml-[2px] text-green-500 rotate-[15deg]" size={34} />
                </Link>
                <Menu
                    className={`cursor-pointer text-deep-purple p-2 rounded-full hover:bg-purple-200 duration-300 ${toggleBtn ? "hidden" : "inline-block"
                        }`}
                    size={38}
                    onClick={() => {
                        if (toggleBtn) {
                            setToggleBtn(false);
                        } else {
                            setToggleBtn(true);
                        }
                    }}
                />
                {toggleBtn ? (
                    <div className="space-x-10">
                        {navLinks.map((data) =>
                            <Link
                                to={data.link}
                                className="text-deep-purple hover:text-teal font-medium transition-colors duration-300 text-inter"
                                key={data.id}>
                                {data.name}
                            </Link>
                        )}
                        <Link
                            to="/signup"
                            className="bg-deep-purple text-white px-6 py-2 rounded-tr-xl rounded-bl-xl hover:bg-purple-800 transition-colors font-medium duration-300 text-inter"
                        >
                            Get Started
                        </Link>
                    </div>
                ) : (
                    <div className="space-x-4 hidden">
                        <Link
                            to="/login"
                            className="text-deep-purple hover:text-purple-800 font-medium transition-colors text-inter"
                        >
                            Login
                        </Link>
                        <Link
                            to="/signup"
                            className="bg-deep-purple text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition-colors font-medium duration-300 text-inter"
                        >
                            Get Started
                        </Link>
                    </div>
                )}
            </motion.header>
        </>
    )
}

export default Navbar;