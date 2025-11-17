import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Eye, EyeOff, Loader2 } from 'lucide-react';
import { useFormik } from 'formik';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';
import { EMAIL_PATTERN, NAME_PATTERN, PASSWORD_RULES } from '../utils/validationRegesx';

interface FormValues {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const validate = (values: FormValues): Partial<FormValues> => {
    const errors: Partial<FormValues> = {};

    // Name
    if (!values.name) {
      errors.name = 'Full Name is required';
    } else if (!NAME_PATTERN.test(values.name)) {
      errors.name = 'Please enter a valid name (letters only)';
    }

    // Email
    if (!values.email) {
      errors.email = 'Email is required';
    } else if (!EMAIL_PATTERN.test(values.email)) {
      errors.email = 'Please enter a valid email address';
    }

    // Password
    if (!values.password) {
      errors.password = 'Password is required';
    } else {
      if (values.password.length < PASSWORD_RULES.MIN_LENGTH) {
        errors.password = `Password must be at least ${PASSWORD_RULES.MIN_LENGTH} characters`;
      } else if (values.password.length > PASSWORD_RULES.MAX_LENGTH) {
        errors.password = `Password cannot exceed ${PASSWORD_RULES.MAX_LENGTH} characters`;
      } else if (!PASSWORD_RULES.UPPERCASE.test(values.password)) {
        errors.password = 'Password must contain at least one uppercase letter';
      } else if (!PASSWORD_RULES.LOWERCASE.test(values.password)) {
        errors.password = 'Password must contain at least one lowercase letter';
      } else if (!PASSWORD_RULES.NUMBER.test(values.password)) {
        errors.password = 'Password must contain at least one number';
      } else if (!PASSWORD_RULES.SPECIAL_CHAR.test(values.password)) {
        errors.password = 'Password must contain at least one special character';
      } else if (!PASSWORD_RULES.NO_LEADING_TRAILING_SPACE.test(values.password)) {
        errors.password = 'Password must not start or end with spaces';
      }
    }

    // Confirm Password
    if (!values.confirmPassword) {
      errors.confirmPassword = 'Confirm Password is required';
    } else if (values.confirmPassword !== values.password) {
      errors.confirmPassword = 'Passwords do not match';
    }

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    validateOnBlur: true,
    validateOnChange: false, // Validate only on blur for immediate feedback after field interaction
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const success = await signup(values.name, values.email, values.password);
        console.log('success: ', success);
        console.log('values.password: ', values.password);
        console.log('values.email: ', values.email);
        console.log('values.name: ', values.name);
        if (success) {
          toast.success('Account created successfully! Please log in.');
          navigate('/login');
        } else {
          toast.error('Failed to create account. Please try again.');
        }
      } catch (err) {
        toast.error('An error occurred during account creation.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-lavender to-white flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 }}
            className="w-16 h-16 bg-deep-purple rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <UserPlus className="w-8 h-8 text-white" />
          </motion.div>
          <h1 className="text-3xl font-bold font-poppins text-deep-purple mb-2">
            Create Account
          </h1>
          <p className="text-gray-600 text-inter">
            Start your habit-building journey today
          </p>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2 text-inter">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-purple focus:border-transparent transition-colors ${formik.touched.name && formik.errors.name ? 'border-red-500' : ''
                }`}
              placeholder="Enter your full name"
            />
            {formik.touched.name && formik.errors.name && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm mt-1 text-inter"
              >
                {formik.errors.name}
              </motion.div>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2 text-inter">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-purple focus:border-transparent transition-colors ${formik.touched.email && formik.errors.email ? 'border-red-500' : ''
                }`}
              placeholder="Enter your email"
            />
            {formik.touched.email && formik.errors.email && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm mt-1 text-inter"
              >
                {formik.errors.email}
              </motion.div>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2 text-inter">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-purple focus:border-transparent transition-colors pr-12 ${formik.touched.password && formik.errors.password ? 'border-red-500' : ''
                  }`}
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3 text-gray-400 hover:text-gray-600 transition-colors text-inter"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {formik.touched.password && formik.errors.password && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm mt-1 text-inter"
              >
                {formik.errors.password}
              </motion.div>
            )}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2 text-inter">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-deep-purple focus:border-transparent transition-colors ${formik.touched.confirmPassword && formik.errors.confirmPassword ? 'border-red-500' : ''
                }`}
              placeholder="Confirm your password"
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-600 text-sm mt-1 text-inter"
              >
                {formik.errors.confirmPassword}
              </motion.div>
            )}
          </div>

          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full bg-deep-purple text-white py-3 rounded-lg hover:bg-purple-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center text-inter"
          >
            {formik.isSubmitting ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : null}
            {formik.isSubmitting ? 'Creating Account...' : 'Create Account'}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600 text-inter">
            Already have an account?{' '}
            <Link to="/login" className="text-deep-purple hover:text-purple-800 font-medium text-inter">
              Sign in
            </Link>
          </p>
        </div>

        <div className="mt-4 text-center">
          <Link to="/" className="text-sm text-gray-500 hover:text-gray-700 text-inter">
            ← Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default Signup;