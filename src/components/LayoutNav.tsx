import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Shrub, Home, Settings, LayoutDashboard, Sun, Moon, LogOut, Target, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useTheme } from "../contexts/ThemeContext";
import { useAuth } from "../contexts/AuthContext";

const LayoutNav = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);
    const { user, logout } = useAuth();
    const { darkMode, toggleDarkMode } = useTheme();
    const navigate = useNavigate();

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

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: Home },
        { name: 'Habits', path: '/habits', icon: Target },
        { name: 'Progress', path: '/progress', icon: BarChart3 },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    const sidebarVariants = {
        hidden: { x: "-100%" },
        visible: { x: 0, transition: { type: "tween", duration: 0.3 } },
        exit: { x: "-100%", transition: { type: "tween", duration: 0.3 } }
    };

    const overlayVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { duration: 0.3 } },
        exit: { opacity: 0, transition: { duration: 0.3 } }
    };

    return (
        <>
            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mx-auto p-6 py-5 flex justify-between lg:justify-center items-center bg-white/60 backdrop-blur-xl fixed top-0 left-0 right-0 w-full z-10 border-b custom-colors dark:bg-gray-900/80 dark:border-gray-700"
            >
                <Link to="/" className="flex items-center text-3xl font-bold font-poppins text-deep-purple dark:text-purple-400"
                >
                    GrowMate
                    <Shrub className="ml-[2px] text-green-500 rotate-[15deg]" size={34} />
                </Link>

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

            <AnimatePresence>
                {!isDesktop && isMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={overlayVariants}
                            onClick={closeMenu}
                            className="fixed inset-0 bg-black bg-opacity-50 z-30"
                        />

                        <motion.div
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            variants={sidebarVariants}
                            className="fixed top-0 bottom-0 left-0 w-64 bg-white shadow-lg z-40 overflow-y-auto dark:bg-gray-800"
                        >
                            <div className="flex justify-between items-center p-6 border-b border-gray-200 dark:border-gray-700 text-deep-purple dark:text-purple-400">
                                <Link to="/" className="text-2xl font-bold flex"
                                    onClick={closeMenu}
                                >
                                    GrowMate <Shrub className="ml-[2px] text-green-500 rotate-[15deg]" size={30} />
                                </Link>
                                <motion.button
                                    exit={{
                                        opacity: 0
                                    }}
                                    transition={{
                                        duration: 1,
                                        ease: "linear"
                                    }}
                                    className="cursor-pointer text-deep-purple dark:text-white p-2 rounded-full hover:bg-purple-200 duration-300"
                                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                                    aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                                >
                                    {isMenuOpen ? <X size={30} /> : <Menu size={30} />}
                                </motion.button>
                            </div>

                            <div className="p-6">
                                <p className="text-sm text-gray-600 dark:text-gray-200 mt-1 font-inter">
                                    Welcome back, <strong className='text-dark-slate dark:text-white'>{user?.name} !</strong>
                                </p>
                            </div>

                            <nav className="flex-1 p-4">
                                <ul className="space-y-2">
                                    {navItems.map((item) => (
                                        <li key={item.name}>
                                            <NavLink
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    `flex items-center p-3 rounded-tr-lg rounded-bl-lg transition-colors font-inter ${isActive
                                                        ? 'bg-purple-100 dark:bg-purple-900 text-deep-purple dark:text-purple-300'
                                                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                                                    }`
                                                }
                                            >
                                                <item.icon className="w-5 h-5 mr-3" />
                                                <span className="font-medium">{item.name}</span>
                                            </NavLink>
                                        </li>
                                    ))}
                                </ul>
                            </nav>

                            <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                                <button
                                    onClick={toggleDarkMode}
                                    className="flex items-center w-full p-3 rounded-tr-lg rounded-bl-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors mb-2"
                                >
                                    {darkMode ? <Sun className="w-5 h-5 mr-3" /> : <Moon className="w-5 h-5 mr-3" />}
                                    <span className="font-medium font-inter">{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="flex items-center w-full p-3 rounded-tr-lg rounded-bl-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
                                >
                                    <LogOut className="w-5 h-5 mr-3" />
                                    <span className="font-medium font-inter">Logout</span>
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default LayoutNav;