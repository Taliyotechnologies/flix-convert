import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Github, Chrome, Sparkles, Shield, Zap } from 'lucide-react';

const Login: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  const features = [
    { icon: Shield, text: 'Secure authentication' },
    { icon: Zap, text: 'Lightning fast login' },
    { icon: Sparkles, text: 'Modern interface' }
  ];

  return (
    <div className="min-h-screen bg-gradient-primary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/3 w-16 h-16 bg-white/5 rounded-full animate-pulse"></div>
      </div>

      <div className="max-w-md w-full space-y-8 relative z-10">
        <div className="text-center animate-fade-in">
          <div className="mx-auto w-20 h-20 bg-gradient-accent rounded-2xl flex items-center justify-center mb-6 shadow-xl">
            <span className="text-white font-bold text-3xl">F</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Welcome back</h2>
          <p className="text-white/90 text-lg">
            Sign in to your account to continue
          </p>
        </div>

        <div className="card glass border-0 shadow-2xl animate-slide-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-3">
                Email address
              </label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="input pl-12"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-3">
                Password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  className="input pl-12 pr-12"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="rememberMe"
                  type="checkbox"
                  className="h-5 w-5 text-primary-color focus:ring-primary-color border-border-color rounded"
                  checked={formData.rememberMe}
                  onChange={handleInputChange}
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm text-text-secondary">
                  Remember me
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="text-primary-color hover:text-primary-hover font-medium transition-colors"
                >
                  Forgot your password?
                </Link>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center gap-3 text-lg py-4 shadow-xl"
              >
                Sign in
                <ArrowRight size={20} />
              </button>
            </div>
          </form>

          <div className="mt-8">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-color" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-bg-card text-text-secondary">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4">
              <button
                type="button"
                className="btn btn-secondary flex items-center justify-center gap-3 py-3"
              >
                <Github size={20} />
                GitHub
              </button>

              <button
                type="button"
                className="btn btn-secondary flex items-center justify-center gap-3 py-3"
              >
                <Chrome size={20} />
                Google
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-text-secondary">
              Don't have an account?{' '}
              <Link
                to="/signup"
                className="text-primary-color hover:text-primary-hover font-medium transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Icon size={20} className="text-white" />
                </div>
                <p className="text-xs text-white/80">{feature.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Login; 