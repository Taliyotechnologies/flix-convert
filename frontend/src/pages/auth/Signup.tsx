import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Github, Chrome, Sparkles, Shield, Zap, CheckCircle } from 'lucide-react';

const Signup: React.FC = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptNewsletter: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.acceptTerms) {
      newErrors.acceptTerms = 'You must accept the terms and conditions';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Handle signup logic here
      console.log('Signup attempt:', formData);
    }
  };

  const benefits = [
    { icon: Shield, text: 'Secure file processing' },
    { icon: Zap, text: 'Lightning fast conversion' },
    { icon: Sparkles, text: 'Premium features access' }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">Create your account</h2>
          <p className="text-white/90 text-lg">
            Join thousands of users who trust FlixConvert
          </p>
        </div>

        <div className="card glass border-0 shadow-2xl animate-slide-in">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium mb-3">
                  First name
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted" />
                  <input
                    id="firstName"
                    name="firstName"
                    type="text"
                    autoComplete="given-name"
                    required
                    className={`input pl-12 ${errors.firstName ? 'border-error-color' : ''}`}
                    placeholder="John"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.firstName && (
                  <p className="mt-2 text-sm text-error-color flex items-center gap-2">
                    <div className="w-1 h-1 bg-error-color rounded-full"></div>
                    {errors.firstName}
                  </p>
                )}
              </div>

              <div>
                <label htmlFor="lastName" className="block text-sm font-medium mb-3">
                  Last name
                </label>
                <div className="relative">
                  <User size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted" />
                  <input
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    required
                    className={`input pl-12 ${errors.lastName ? 'border-error-color' : ''}`}
                    placeholder="Doe"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>
                {errors.lastName && (
                  <p className="mt-2 text-sm text-error-color flex items-center gap-2">
                    <div className="w-1 h-1 bg-error-color rounded-full"></div>
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>

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
                  className={`input pl-12 ${errors.email ? 'border-error-color' : ''}`}
                  placeholder="john@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              {errors.email && (
                <p className="mt-2 text-sm text-error-color flex items-center gap-2">
                  <div className="w-1 h-1 bg-error-color rounded-full"></div>
                  {errors.email}
                </p>
              )}
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
                  autoComplete="new-password"
                  required
                  className={`input pl-12 pr-12 ${errors.password ? 'border-error-color' : ''}`}
                  placeholder="Create a strong password"
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
              {errors.password && (
                <p className="mt-2 text-sm text-error-color flex items-center gap-2">
                  <div className="w-1 h-1 bg-error-color rounded-full"></div>
                  {errors.password}
                </p>
              )}
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium mb-3">
                Confirm password
              </label>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-text-muted" />
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  autoComplete="new-password"
                  required
                  className={`input pl-12 pr-12 ${errors.confirmPassword ? 'border-error-color' : ''}`}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                />
                <button
                  type="button"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="mt-2 text-sm text-error-color flex items-center gap-2">
                  <div className="w-1 h-1 bg-error-color rounded-full"></div>
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <input
                  id="acceptTerms"
                  name="acceptTerms"
                  type="checkbox"
                  className="h-5 w-5 text-primary-color focus:ring-primary-color border-border-color rounded mt-1"
                  checked={formData.acceptTerms}
                  onChange={handleInputChange}
                />
                <label htmlFor="acceptTerms" className="ml-3 block text-sm text-text-secondary">
                  I agree to the{' '}
                  <Link to="/terms" className="text-primary-color hover:text-primary-hover font-medium transition-colors">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-primary-color hover:text-primary-hover font-medium transition-colors">
                    Privacy Policy
                  </Link>
                </label>
              </div>
              {errors.acceptTerms && (
                <p className="text-sm text-error-color flex items-center gap-2">
                  <div className="w-1 h-1 bg-error-color rounded-full"></div>
                  {errors.acceptTerms}
                </p>
              )}

              <div className="flex items-start">
                <input
                  id="acceptNewsletter"
                  name="acceptNewsletter"
                  type="checkbox"
                  className="h-5 w-5 text-primary-color focus:ring-primary-color border-border-color rounded mt-1"
                  checked={formData.acceptNewsletter}
                  onChange={handleInputChange}
                />
                <label htmlFor="acceptNewsletter" className="ml-3 block text-sm text-text-secondary">
                  I want to receive updates about new features and tools
                </label>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="btn btn-primary w-full flex items-center justify-center gap-3 text-lg py-4 shadow-xl"
              >
                Create account
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
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-primary-color hover:text-primary-hover font-medium transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-3 gap-4 mt-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-2">
                  <Icon size={20} className="text-white" />
                </div>
                <p className="text-xs text-white/80">{benefit.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Signup; 