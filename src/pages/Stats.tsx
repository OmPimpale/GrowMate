import { Users } from "lucide-react"
import CountUp from "react-countup"
import { motion } from "framer-motion";

const Stats = () => {
    const stats = [
        {
            id: 1,
            data: 10,
            suffix: "K+",
            info: "Habits Tracked",
        },
        {
            id: 2,
            data: 85,
            suffix: "%",
            info: "Success Rate",
        },
        {
            id: 3,
            data: 2,
            suffix: "K+",
            info: "Happy Users",
        }
    ];

    return (
        <>
            <section className="bg-deep-purple py-20 text-white">
                <div className="container mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: -5 }}
                        // animate={{ opacity: 1, }}
                        transition={{ delay: 0.2, }}
                        viewport={{ once: true }}
                        className="mb-12"
                        whileInView={{ opacity: 1, y: 0 }}
                    >
                        <h2 className="text-center text-4xl font-bold font-poppins mb-5 md:flex items-center justify-center">
                            <Users size={36} className="mx-auto mb-2 md:mb-0 md:mx-0 md:mr-2 text-teal" /> Our Growing Community
                        </h2>
                        <p className="text-center text-gray-100 text-xl opacity-90 max-w-2xl mx-auto text-inter">
                            Witness the collective impact of thousands building better habits with <span className="text-teal">GrowMate</span> every day.
                        </p>
                    </motion.div>
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        {stats.map((data) =>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 }}
                                key={data.id}
                            >
                                <CountUp
                                    start={0}
                                    end={data.data}
                                    duration={3}
                                    delay={1}
                                    redraw={true}
                                    enableScrollSpy={true}
                                    useEasing={false}
                                    suffix={data.suffix}
                                >
                                    {({ countUpRef }) => (
                                        <>
                                            <span className="text-5xl font-bold mb-2" ref={countUpRef} />
                                            <div className="text-purple-200">{data.info}</div>
                                        </>
                                    )}
                                </CountUp>
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Stats;