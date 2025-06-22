import Footer from "../pages/Footer";
import Navbar from "../pages/Navbar";
import notFoundImg from "../images/NotFound.jpg"
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <>
            <section>
                <Navbar />
                <div className="py-12 px-5 mt-[86.8px] lg:mt-[80.8px] max-w-3xl mx-auto">
                    <h4 className="text-center font-poppins text-dark-slate text-3xl mb-5">Page Not Found 🙈</h4>
                    <p className="text-center mb-10 font-inter text-xl">Looks like you've taken a detour from your growth journey.</p>
                    <img src={notFoundImg} alt="Page Not Found" loading="lazy" className="rounded-lg shadow-2xl shadow-gray-400" />
                    <p className="text-center mt-10 font-inter text-xl">But don’t worry — every habit journey has a few bumps.</p>
                    <Link to="/" className="flex justify-center">
                        <button className="bg-deep-purple text-white px-6 py-3 rounded-tr-xl rounded-bl-xl hover:bg-purple-800 transition-colors font-medium text-inter mt-10">
                            Get Back on Track
                        </button>
                    </Link>
                </div>
                <Footer />
            </section>
        </>
    )
}

export default NotFound;