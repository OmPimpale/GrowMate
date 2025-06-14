import { motion } from "framer-motion";

const Testimonials = () => {
    const testimonials = [
        {
            name: "Sarah Chen",
            text: "GrowMate helped me build a consistent morning routine that transformed my productivity.",
            avatar:
                "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        },
        {
            name: "Michael Rodriguez",
            text: "The visual progress tracking keeps me motivated to maintain my fitness goals.",
            avatar:
                "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        },
        {
            name: "Emily Watson",
            text: "Simple, beautiful, and effective. Exactly what I needed to stay consistent.",
            avatar:
                "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop",
        },
    ];

    return (
        <>
            <section className="bg-white py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h3 className="text-4xl font-bold font-poppins text-deep-purple mb-4">
                            What Our Users Say
                        </h3>
                        <p className="text-xl text-gray-600 text-inter">
                            Real stories from people who transformed their lives with GrowMate
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="bg-gray-50 p-8 rounded-xl"
                            >
                                <div className="flex items-center mb-4">
                                    <img
                                        src={testimonial.avatar}
                                        alt={testimonial.name}
                                        className="w-12 h-12 rounded-full mr-4"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-deep-purple">
                                            {testimonial.name}
                                        </h4>
                                    </div>
                                </div>
                                <p className="text-gray-600 italic leading-relaxed text-inter">
                                    "{testimonial.text}"
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Testimonials;