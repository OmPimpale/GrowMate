import { motion } from "framer-motion";
import { Menu, X, Shrub } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            setIsDesktop(width >= 1024);
            if (width >= 1024) {
                setIsMenuOpen(false);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

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
    ];

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto p-6 py-5 flex justify-between items-center bg-white/60 backdrop-blur-xl fixed top-0 left-0 right-0 w-full z-50 border-b"
            >
                <Link to="/" className="flex items-center text-3xl font-bold font-poppins text-deep-purple">
                    GrowMate
                    <Shrub className="ml-[2px] text-green-500 rotate-[15deg]" size={34} />
                </Link>

                {isDesktop && (
                    <div className="flex items-center space-x-10">
                        {navLinks.map((data) =>
                            <Link
                                to={data.link}
                                className="text-deep-purple hover:text-teal font-medium transition-colors duration-300 font-inter"
                                key={data.id}
                            >
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
                )}

                {!isDesktop && (
                    <motion.button
                        exit={{
                            opacity:0
                        }}
                        transition={{
                            duration:1,
                            ease:"linear"
                        }}
                        className="cursor-pointer text-deep-purple p-2 rounded-full hover:bg-purple-200 duration-300"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                    >
                        {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
                    </motion.button>
                )}
            </motion.header>

            {!isDesktop && isMenuOpen && (
                <motion.nav
                    initial={{ opacity: 0, y: -40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -40, }}
                    transition={{ duration: 0.4 }}
                    className="fixed left-0 right-0 bg-white/60 backdrop-blur-xl shadow-lg py-4 z-40 border-t-2"
                >
                    <div className="flex flex-col items-center space-y-4">
                        {navLinks.map((data) =>
                            <Link
                                to={data.link}
                                className="text-deep-purple hover:text-teal font-medium transition-colors duration-300 text-inter text-lg block w-full text-center py-2"
                                key={data.id}
                                onClick={closeMenu}
                            >
                                {data.name}
                            </Link>
                        )}
                        <Link
                            to="/signup"
                            className="bg-deep-purple text-white px-8 py-3 rounded-tr-xl rounded-bl-xl hover:bg-purple-800 transition-colors font-medium duration-300 text-inter text-lg block w-fit text-center my-4"
                            onClick={closeMenu}
                        >
                            Get Started
                        </Link>
                    </div>
                </motion.nav>
            )}
        </>
    );
};

export default Navbar;