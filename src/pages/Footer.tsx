import { Mail, MapPin, Phone, Shrub } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
    return (
        <>
            <footer className="bg-white dark:bg-gray-800 text-deep-purple pt-10 pb-5 border-t">
                <div className="container mx-auto px-6 text-center">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-center md:text-left">
                        <div>
                            <Link to="/" className="text-xl font-bold text-dark-slate mb-4 font-poppins flex justify-center md:justify-start text-deep-purple dark:text-purple-400">GrowMate<Shrub className="ml-[2px] text-green-500 rotate-[15deg]" size={28} /></Link>
                            <p className="text-gray-600 dark:text-gray-200 leading-relaxed text-md opacity-90 font-inter">
                                Dedicated to empowering individuals in their journey of self-improvement through effective habit tracking and motivation.
                            </p>
                        </div>

                        <div className="inline-block mx-auto">
                            <h3 className="text-xl font-bold text-dark-slate dark:text-purple-400 mb-4">Quick Links</h3>
                            <ul className="space-y-2">
                                <li><Link to="/" className="text-deep-purple dark:text-white transition-colors font-medium inline-block border-deep-purple font-inter hover:text-teal dark:hover:text-teal duration-300">Home</Link></li>
                                <li><Link to="about-us" className="text-deep-purple dark:text-white transition-colors font-medium inline-block border-deep-purple font-inter hover:text-teal dark:hover:text-teal duration-300">About Us</Link></li>
                                <li>
                                    <Link
                                        to="/login"
                                        className="text-deep-purple dark:text-white transition-colors font-medium inline-block border-deep-purple font-inter hover:text-teal dark:hover:text-teal duration-300"
                                    >
                                        Sign In
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        to="/signup"
                                        className="text-deep-purple dark:text-white transition-colors font-medium inline-block border-deep-purple font-inter hover:text-teal dark:hover:text-teal duration-300"
                                    >
                                        Sign Up
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xl font-bold text-dark-slate dark:text-purple-400 mb-4 font-poppins">Contact Us</h3>
                            <ul className="space-y-2 font-inter">
                                <li className="flex items-center justify-center md:justify-start">
                                    <Mail size={16} className="mr-2 text-deep-purple dark:text-purple-400" />
                                    <a href="mailto:ompimpale@gmail.com" className="text-gray-600 dark:text-gray-200 hover:text-teal dark:hover:text-teal transition-colors duration-300 text-sm">support@growmate.com</a>
                                </li>
                                <li className="flex items-center justify-center md:justify-start">
                                    <Phone size={16} className="mr-2 text-deep-purple dark:text-purple-400" />
                                    <a href="tel:+91 12121 21212" className="text-gray-600 dark:text-gray-200 hover:text-teal dark:hover:text-teal transition-colors duration-300 text-sm">+91 12121 21212</a>
                                </li>
                                <li className="flex items-start justify-center md:justify-start">
                                    <MapPin size={16} className="mr-2 text-deep-purple dark:text-purple-400 mt-1" />
                                    <span className="text-sm text-gray-600 dark:text-gray-200">Pune, India</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="border-t border-gray-300 mt-10 pt-6 text-center text-gray-600 dark:text-gray-200 text-[13px] md:flex justify-between ">
                        <p className=" font-inter">&copy; {new Date().getFullYear()} GrowMate. All rights reserved.</p>
                        <div className="flex justify-center items-center mt-4 md:mt-0 space-x-4">
                            <Link to="#" className=" font-inter hover:text-deep-purple dark:hover:text-teal transition-colors duration-300">Privacy Policy</Link>
                            <span className="text-gray-400">|</span>
                            <Link to="/" className=" font-inter hover:text-deep-purple dark:hover:text-teal transition-colors duration300">Terms of Service</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}

export default Footer;