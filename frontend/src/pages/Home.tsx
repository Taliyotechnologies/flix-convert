import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Image, 
  Video, 
  FileText, 
  Music, 
  ArrowRight,
  CheckCircle,
  Zap,
  Shield,
  Clock,
  Users,
  Star,
  TrendingUp,
  Upload,
  Play,
  File,
  Globe,
  Award,
  Heart,
  Rocket,
  Cpu,
  Brain,
  User,
  Download,
  Settings,
  Lock
} from 'lucide-react';

const Home: React.FC = () => {
  const features = [
    {
      icon: Image,
      title: 'Smart Image Compression',
      description: 'Advanced compression algorithms that reduce file size while maintaining quality.',
      color: 'bg-blue-50 text-blue-600',
      stats: 'Up to 80% smaller',
      tech: 'AI-Powered'
    },
    {
      icon: Video,
      title: 'Video Conversion',
      description: 'Convert videos between formats with high quality and fast processing.',
      color: 'bg-green-50 text-green-600',
      stats: '100+ formats',
      tech: 'Hardware Accelerated'
    },
    {
      icon: FileText,
      title: 'PDF Processing',
      description: 'Comprehensive PDF tools with OCR and intelligent compression.',
      color: 'bg-purple-50 text-purple-600',
      stats: 'OCR + Batch',
      tech: 'Machine Learning'
    },
    {
      icon: Music,
      title: 'Audio Conversion',
      description: 'Convert audio files with lossless quality and format support.',
      color: 'bg-orange-50 text-orange-600',
      stats: 'Lossless conversion',
      tech: 'Neural Networks'
    }
  ];

  const benefits = [
    { icon: Zap, text: 'Lightning-fast processing with optimized algorithms', color: 'bg-yellow-50 text-yellow-600' },
    { icon: Shield, text: 'Enterprise-grade security with encryption', color: 'bg-green-50 text-green-600' },
    { icon: Clock, text: 'No registration required for basic features', color: 'bg-blue-50 text-blue-600' },
    { icon: Users, text: 'Support for 200+ file formats', color: 'bg-purple-50 text-purple-600' },
    { icon: TrendingUp, text: 'Batch processing for multiple files', color: 'bg-indigo-50 text-indigo-600' },
    { icon: Star, text: 'Free tier with premium features', color: 'bg-pink-50 text-pink-600' }
  ];

  const stats = [
    { number: '200+', label: 'File Formats', icon: File },
    { number: '10M+', label: 'Files Processed', icon: TrendingUp },
    { number: '99.9%', label: 'Uptime', icon: Shield },
    { number: '24/7', label: 'Support', icon: Brain }
  ];

  const testimonials = [
    {
      name: "Sarah Chen",
      role: "Design Director",
      content: "FlixConvert has streamlined our workflow. The quality and speed are exceptional.",
      company: "TechCorp"
    },
    {
      name: "Marcus Rodriguez",
      role: "Content Manager",
      content: "The batch processing feature saves us hours every week. Highly recommended.",
      company: "MediaFlow"
    },
    {
      name: "Emma Watson",
      role: "Data Analyst",
      content: "Reliable, fast, and secure. Perfect for our enterprise needs.",
      company: "DataFlow Inc"
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 mb-8">
              <Rocket className="w-8 h-8 text-blue-600" />
              <span className="text-lg font-semibold text-gray-600">PROFESSIONAL FILE PROCESSING</span>
              <Rocket className="w-8 h-8 text-blue-600" />
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 text-gray-900 leading-tight">
              Convert Files
              <span className="block text-blue-600">Instantly</span>
            </h1>
            
            <p className="text-xl md:text-2xl mb-12 text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Professional file conversion and compression platform. 
              Fast, secure, and reliable processing for all your needs.
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
              <Link
                to="/tools"
                className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
              >
                Start Converting
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                to="/company"
                className="inline-flex items-center gap-3 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-colors duration-200"
              >
                Learn More
                <Play className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                    <div className="text-gray-600 font-medium">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Cpu className="w-8 h-8 text-blue-600" />
              <span className="text-lg font-semibold text-gray-600">CORE FEATURES</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              Professional Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive file processing tools designed for professionals
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-lg transition-shadow duration-300"
                >
                  <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 ${feature.color}`}>
                    <Icon className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-gray-900">{feature.title}</h3>
                  <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-sm font-semibold text-blue-600">
                      <CheckCircle className="w-4 h-4" />
                      {feature.stats}
                    </div>
                    <div className="text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                      {feature.tech}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-8 h-8 text-blue-600" />
                <span className="text-lg font-semibold text-gray-600">WHY CHOOSE US?</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
                Built for Professionals
              </h2>
              <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                Enterprise-grade file processing with security, speed, and reliability.
              </p>
              
              <div className="space-y-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-6">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${benefit.color}`}>
                        <Icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1">
                        <span className="text-gray-900 leading-relaxed text-lg font-medium">{benefit.text}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12">
                <Link
                  to="/tools"
                  className="inline-flex items-center gap-3 bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-colors duration-200 shadow-lg"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>

            <div className="relative">
              <div className="bg-white border border-gray-200 rounded-3xl p-12 shadow-lg">
                <div className="grid grid-cols-2 gap-8">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                          <Icon className="w-8 h-8 text-blue-600" />
                        </div>
                        <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                        <div className="text-gray-600 font-medium">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-32 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart className="w-8 h-8 text-red-500" />
              <span className="text-lg font-semibold text-gray-600">TRUSTED BY PROFESSIONALS</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-gray-900">
              What Our Users Say
            </h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 border border-gray-200 rounded-2xl p-8">
                <div className="flex items-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-8 leading-relaxed">"{testimonial.content}"</p>
                <div>
                  <div className="font-bold text-lg text-gray-900 mb-1">{testimonial.name}</div>
                  <div className="text-gray-600 font-medium">{testimonial.role}</div>
                  <div className="text-blue-600 text-sm font-semibold mt-1">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-blue-600">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Globe className="w-8 h-8 text-white" />
              <span className="text-lg font-semibold text-blue-100">READY TO GET STARTED?</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">
              Join Thousands of Users
            </h2>
            <p className="text-xl mb-12 text-blue-100 max-w-3xl mx-auto leading-relaxed">
              Start converting your files today with our professional-grade tools. 
              No registration required for basic features.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/signup"
                className="inline-flex items-center gap-3 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-50 transition-colors duration-200 shadow-lg"
              >
                Create Account
                <User className="w-5 h-5" />
              </Link>
              <Link
                to="/tools"
                className="inline-flex items-center gap-3 bg-transparent text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Try Now
                <Upload className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 