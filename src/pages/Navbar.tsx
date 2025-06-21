import { motion } from "framer-motion";
import { Menu, X, Shrub, LogOut } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const { isAuthenticated, setUser } = useAuth();
    const navigate = useNavigate();
    const { user, logout } = useAuth();

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

    const handleLogout = () => {
        logout();
        navigate('/');
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
            link: "/about-us"
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
                        {isAuthenticated ?
                            (<>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center p-3 rounded-tr-lg rounded-bl-lg text-red-600 hover:bg-red-100 transition-colors"
                                >
                                    <LogOut className="w-5 h-5 mr-3" />
                                    <span className="font-medium font-inter">Logout</span>
                                </button>
                                <Link
                                    to="/dashboard"
                                    className="rounded-full"
                                >
                                    <img className="rounded-full w-10" src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?uid=R204309784&ga=GA1.1.1840392417.1724061476&semt=ais_hybrid&w=740" alt="user" />
                                </Link>
                            </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-deep-purple hover:text-teal font-medium transition-colors duration-300 font-inter py-2"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-deep-purple text-white px-6 py-2 rounded-tr-xl rounded-bl-xl hover:bg-purple-800 transition-colors font-medium duration-300 text-inter"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )
                        }

                    </div>
                )}

                {!isDesktop && (
                    <motion.button
                        exit={{
                            opacity: 0
                        }}
                        transition={{
                            duration: 1,
                            ease: "linear"
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
                        {isAuthenticated ?
                            (<>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center p-3 rounded-tr-lg rounded-bl-lg text-red-600 hover:bg-red-100 transition-colors"
                                >
                                    <LogOut className="w-5 h-5 mr-3" />
                                    <span className="font-medium font-inter">Logout</span>
                                </button>
                                <Link
                                    to="/dashboard"
                                    className="rounded-full"
                                >
                                    <img className="rounded-full w-12 my-2" src="https://img.freepik.com/premium-vector/avatar-icon0002_750950-43.jpg?uid=R204309784&ga=GA1.1.1840392417.1724061476&semt=ais_hybrid&w=740" alt="user" />
                                </Link>
                            </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className="text-deep-purple hover:text-teal font-medium transition-colors duration-300 font-inter py-2"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/signup"
                                        className="bg-deep-purple text-white px-6 py-2 rounded-tr-xl rounded-bl-xl hover:bg-purple-800 transition-colors font-medium duration-300 text-inter"
                                    >
                                        Get Started
                                    </Link>
                                </>
                            )
                        }
                    </div>
                </motion.nav>
            )}
        </>
    );
};

export default Navbar;