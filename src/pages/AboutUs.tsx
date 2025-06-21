import React, { useEffect, useRef } from 'react';
import { Eye, Lightbulb, } from 'lucide-react';
import Navbar from './Navbar';
import Stats from './Stats';
import Features from './Features';
import Testimonials from './Testimonials';
import SectionCTA from './SectionCTA';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import { motion } from "framer-motion";
import video from "../videos/GrowMateVideo.mp4";

// Main AboutUs component
const AboutUs: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const video = videoRef.current;
        if (!video) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    video.play().catch((error) => {
                        console.log('Auto-play prevented:', error);
                    });
                } else {
                    video.pause();
                }
            },
            { threshold: 0.5 } // Play when 50% of the video is visible
        );

        observer.observe(video);

        return () => {
            observer.unobserve(video);
        };
    }, []);

    return (
        <div className="min-h-screen">
            <Navbar />

            <motion.header
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ease: 'anticipate', duration: 1 }}
                viewport={{ once: true }}
                className="relative py-16 text-center font-poppins bg-deep-purple text-white rounded-b-3xl shadow-xl overflow-hidden pt-[150px]">
                <div className="absolute le inset-0 z-0 opacity-10 mt-[100px]" style={{ backgroundImage: 'url(https://placehold.co/1920x400/8A2BE2/FFFFFF?text=GrowMate+Vision)', }}></div>
                <div className="relative z-10 p-4">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Discover Grow Mate</h1>
                    <p className="text-xl md:text-2xl font-light max-w-3xl mx-auto opacity-90 text-inter">
                        Beyond just tracking, we're building a world where personal growth is achievable for everyone.
                    </p>
                </div>
            </motion.header>
            <motion.section
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, ease: 'anticipate', duration: 1 }}
                viewport={{ once: true }}
                className="py-16 px-2 md:px-8 lg:px-16 font-poppins bg-gradient-to-t from-soft-lavender to-white rounded-3xl mx-4 md:mx-8 -mt-12 relative z-20 shadow-lg">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold text-deep-purple mb-6 md:flex items-center justify-center">
                        <Lightbulb size={36} className="mx-auto mb-2 md:mb-0 md:mx-0 md:mr-2 text-yellow-400" /> Our Story & Philosophy
                    </h2>
                    <p className="text-lg leading-relaxed text-gray-600 mb-6 opacity-90 text-inter">
                        GrowMate started with a simple idea: building good habits should feel rewarding, not overwhelming.
                        Many people strive for personal growth but lack the right tools or motivation. GrowMate is more than a tracker — it's a supportive companion, rooted in psychology and habit science.
                    </p>
                    <p className="text-lg leading-relaxed text-gray-600 opacity-90 mb-7 text-inter">
                        We focus on <strong>simplicity, consistency, and daily progress</strong>. With smart reminders and milestone celebrations, GrowMate makes personal growth feel natural and motivating.
                    </p>
                    <Link
                        to="/signup"
                        className="bg-deep-purple text-white px-8 py-4 rounded-tr-xl rounded-bl-xl hover:bg-purple-800 transition-all transform hover:scale-105 font-medium text-lg inline-block duration-300 text-inter"
                    >
                        Start Your Journey
                    </Link>
                </div>
            </motion.section>

            {/* video section */}
            <div
                className='p-5 py-20 w-full max-w-4xl mx-auto'>
                <video
                    ref={videoRef}
                    src={video}
                    playsInline
                    controls
                    className="rounded-lg shadow-lg w-full "
                />
            </div>

            <Stats />
            <Features />
            <div className='bg-gradient-to-tr from-soft-lavender via-white to-soft-lavender'>
                <Testimonials />
            </div>

            {/* Our Vision Section (New) */}
            <section className="py-20 md:px-8 lg:px-16 font-poppins text-white">
                <h2 className="text-4xl font-bold mb-6 md:flex items-center justify-center text-deep-purple">
                    <Eye size={36} className="mx-auto mb-2 md:mb-0 md:mx-0 md:mr-2 text-teal" /> Our Vision for the Future
                </h2>
                <p className="text-xl max-w-4xl mx-auto opacity-90 text-gray-600 text-center text-inter">
                    We envision GrowMate as a global catalyst for positive change, where millions are empowered to achieve their full potential through the power of habit. We are continuously innovating to bring even more intuitive tools, deeper insights, and a more connected community experience to our users.
                </p>
            </section>

            <SectionCTA />
            <Footer />
        </div>
    );
};

export default AboutUs;