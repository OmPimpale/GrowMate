import { motion } from "framer-motion";
import {
  Target,
  BarChart3,
  Calendar,
  TrendingUp,
  Zap
} from "lucide-react";

const Features = () => {
    const features = [
        {
            icon: Target,
            title: "Set Meaningful Goals",
            description: "Create habits that align with your values and aspirations",
        },
        {
            icon: BarChart3,
            title: "Track Progress",
            description: "Visualize your journey with beautiful charts and insights",
        },
        {
            icon: Calendar,
            title: "Daily Consistency",
            description: "Build lasting habits with daily check-ins and reminders",
        },
        {
            icon: TrendingUp,
            title: "Streak Tracking",
            description: "Stay motivated with streak counters and achievement badges",
        },
    ];

    return (
        <>
            {/* Features Section */}
            <section className="bg-white py-20">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h3 className="md:flex justify-center items-center text-4xl font-bold font-poppins text-deep-purple mb-4">
                            <Zap className="mx-auto mb-2 md:mb-0 md:mx-0 md:mr-2 text-yellow-400" size={28} /> Everything You Need to Succeed
                        </h3>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto text-inter">
                            Powerful features designed to help you build and maintain habits
                            that stick
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="text-center p-8 rounded-tr-2xl rounded-bl-2xl bg-gray-100 hover:bg-soft-lavender transition-colors duration-300"
                            >
                                <feature.icon className="w-12 h-12 text-teal mx-auto mb-4" />
                                <h4 className="text-xl font-semibold font-poppins text-deep-purple mb-2">
                                    {feature.title}
                                </h4>
                                <p className="text-gray-600 leading-relaxed text-inter">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Features;