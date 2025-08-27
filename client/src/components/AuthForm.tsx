'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { authAPI } from '@/lib/api';
import { useAuth } from '@/context/AuthContext';
import { useToast } from '@/context/ToastContext';
import { useSonner } from '@/context/SonnerContext';
import { Mail, Lock, User, DollarSign, ArrowLeft, Sparkles } from 'lucide-react';

export default function AuthForm() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    salary: ''
  });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const { showSuccess, showError } = useToast();
  const sonner = useSonner();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const loadingId = sonner.loading(
      isLogin ? 'Signing in...' : 'Creating account...', 
      'Please wait while we process your request'
    );

    try {
      if (isLogin) {
        const response = await authAPI.login(formData.email, formData.password);
        sonner.dismiss(loadingId);
        sonner.success('Welcome back!', `Successfully signed in as ${response.data.name}`);
        showSuccess('Login Successful', 'Welcome back to AI Finance!');
        login(response.data, response.data.token);
      } else {
        const response = await authAPI.register(
          formData.name,
          formData.email,
          formData.password,
          Number(formData.salary)
        );
        sonner.dismiss(loadingId);
        sonner.success('Account created!', `Welcome to AI Finance, ${response.data.name}!`);
        showSuccess('Registration Successful', 'Your account has been created successfully!');
        login(response.data, response.data.token);
      }
    } catch (error: any) {
      sonner.dismiss(loadingId);
      const errorMessage = error.response?.data?.message || 'An error occurred';
      sonner.error('Authentication Failed', errorMessage);
      showError('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md mx-4"
      >
        <Card className="backdrop-blur-xl bg-white/80 border-0 shadow-2xl shadow-blue-500/10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-white/70"></div>
          
          <CardHeader className="relative z-10 text-center pb-2">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg"
            >
              <Sparkles className="w-8 h-8 text-white" />
            </motion.div>
            
            <CardTitle className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
              <AnimatePresence mode="wait">
                <motion.span
                  key={isLogin ? 'login' : 'register'}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {isLogin ? 'Welcome Back' : 'Join AI Finance'}
                </motion.span>
              </AnimatePresence>
            </CardTitle>
            <p className="text-gray-600 text-sm mt-2">
              {isLogin ? 'Sign in to your account' : 'Create your account to get started'}
            </p>
          </CardHeader>

          <CardContent className="relative z-10 px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      placeholder="Full Name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="pl-12 h-12 bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300"
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="pl-12 h-12 bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300"
                  required
                />
              </div>

              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <Input
                  type="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="pl-12 h-12 bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300"
                  required
                />
              </div>

              <AnimatePresence>
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0, y: -10 }}
                    animate={{ opacity: 1, height: "auto", y: 0 }}
                    exit={{ opacity: 0, height: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="relative"
                  >
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <Input
                      type="number"
                      placeholder="Monthly Salary (₹)"
                      value={formData.salary}
                      onChange={(e) => setFormData({ ...formData, salary: e.target.value })}
                      className="pl-12 h-12 bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-blue-400 focus:ring-blue-400/20 transition-all duration-300"
                      required
                    />
                  </motion.div>
                )}
              </AnimatePresence>

              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button 
                  type="submit" 
                  className="w-full h-12 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform" 
                  disabled={loading}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={isLogin ? 'login' : 'register'}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        {isLogin ? 'Sign In' : 'Create Account'}
                      </motion.span>
                    </AnimatePresence>
                  )}
                </Button>
              </motion.div>
            </form>

            <div className="mt-6 text-center">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200/50"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white/80 text-gray-500">or</span>
                </div>
              </div>
              
              <motion.button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="mt-4 text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 flex items-center justify-center space-x-2 mx-auto group"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>
                  {isLogin ? 'Need an account? Sign up' : 'Already have an account? Sign in'}
                </span>
                <ArrowLeft className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </motion.button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}