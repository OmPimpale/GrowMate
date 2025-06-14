import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const SectionCTA = () => {
    return (
        <>
            <section className="bg-gradient-to-r from-deep-purple to-teal py-20 text-white">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h3 className="text-4xl font-bold font-poppins mb-4">
                            Ready to Start Your Growth Journey?
                        </h3>
                        <p className="text-xl mb-8 opacity-90 text-inter">
                            Join thousands of people who are building better habits every day
                        </p>
                        <Link
                            to="/signup"
                            className="bg-white text-deep-purple px-8 py-4 rounded-tr-xl rounded-bl-xl hover:bg-gray-100 transition-all transform hover:scale-105 font-medium text-lg inline-block duration-300 text-inter"
                        >
                            Get Started for Free
                        </Link>
                    </motion.div>
                </div>
            </section>
        </>
    )
}
export default SectionCTA;