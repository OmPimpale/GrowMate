import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Target, BarChart3, Calendar, TrendingUp, CheckCircle, Users } from 'lucide-react';

const Landing: React.FC = () => {
  const features = [
    {
      icon: Target,
      title: 'Set Meaningful Goals',
      description: 'Create habits that align with your values and aspirations'
    },
    {
      icon: BarChart3,
      title: 'Track Progress',
      description: 'Visualize your journey with beautiful charts and insights'
    },
    {
      icon: Calendar,
      title: 'Daily Consistency',
      description: 'Build lasting habits with daily check-ins and reminders'
    },
    {
      icon: TrendingUp,
      title: 'Streak Tracking',
      description: 'Stay motivated with streak counters and achievement badges'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Chen',
      text: 'GrowMate helped me build a consistent morning routine that transformed my productivity.',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Michael Rodriguez',
      text: 'The visual progress tracking keeps me motivated to maintain my fitness goals.',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    },
    {
      name: 'Emily Watson',
      text: 'Simple, beautiful, and effective. Exactly what I needed to stay consistent.',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-lavender to-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="container mx-auto px-6 py-6 flex justify-between items-center"
      >
        <h1 className="text-3xl font-bold font-poppins text-deep-purple">GrowMate</h1>
        <div className="space-x-4">
          <Link
            to="/login"
            className="text-deep-purple hover:text-purple-800 font-medium transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-deep-purple text-white px-6 py-2 rounded-lg hover:bg-purple-800 transition-colors font-medium"
          >
            Get Started
          </Link>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-6xl font-bold font-poppins text-deep-purple mb-6 leading-tight">
            Build Better Habits,<br />
            <span className="text-teal">Transform Your Life</span>
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Track your daily habits, visualize your progress, and stay motivated with GrowMate - 
            your personal habit tracking companion designed for lasting change.
          </p>
          <div className="space-x-4">
            <Link
              to="/signup"
              className="bg-deep-purple text-white px-8 py-4 rounded-lg hover:bg-purple-800 transition-all transform hover:scale-105 font-medium text-lg inline-block"
            >
              Start Your Journey
            </Link>
            <Link
              to="/login"
              className="bg-white text-deep-purple px-8 py-4 rounded-lg hover:bg-gray-50 transition-colors font-medium text-lg inline-block border-2 border-deep-purple"
            >
              Sign In
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="bg-white py-20">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h3 className="text-4xl font-bold font-poppins text-deep-purple mb-4">
              Everything You Need to Succeed
            </h3>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Powerful features designed to help you build and maintain habits that stick
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
                className="text-center p-8 rounded-xl bg-gray-50 hover:bg-soft-lavender transition-colors"
              >
                <feature.icon className="w-12 h-12 text-teal mx-auto mb-4" />
                <h4 className="text-xl font-semibold font-poppins text-deep-purple mb-2">
                  {feature.title}
                </h4>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-deep-purple py-20 text-white">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
            >
              <div className="text-5xl font-bold mb-2">10k+</div>
              <div className="text-purple-200">Habits Tracked</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <div className="text-5xl font-bold mb-2">85%</div>
              <div className="text-purple-200">Success Rate</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="text-5xl font-bold mb-2">2.5k+</div>
              <div className="text-purple-200">Happy Users</div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
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
            <p className="text-xl text-gray-600">
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
                    <h4 className="font-semibold text-deep-purple">{testimonial.name}</h4>
                  </div>
                </div>
                <p className="text-gray-600 italic leading-relaxed">
                  "{testimonial.text}"
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
            <p className="text-xl mb-8 opacity-90">
              Join thousands of people who are building better habits every day
            </p>
            <Link
              to="/signup"
              className="bg-white text-deep-purple px-8 py-4 rounded-lg hover:bg-gray-100 transition-colors font-medium text-lg inline-block"
            >
              Get Started for Free
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-6 text-center">
          <h4 className="text-2xl font-bold font-poppins mb-4">GrowMate</h4>
          <p className="text-gray-400">
            Building better habits, one day at a time.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;