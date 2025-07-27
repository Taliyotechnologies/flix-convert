import React, { useEffect, useState } from 'react';
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
  Sparkles,
  Download,
  Upload,
  Play,
  File,
  Layers,
  Globe,
  Award,
  Heart,
  User
} from 'lucide-react';

const Home: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const features = [
    {
      icon: Image,
      title: 'Smart Image Compression',
      description: 'AI-powered compression that maintains quality while reducing file size by up to 80%.',
      color: 'from-pink-500 to-rose-500',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
      stats: 'Up to 80% smaller'
    },
    {
      icon: Video,
      title: 'Video Conversion Pro',
      description: 'Convert between 50+ video formats with hardware acceleration for lightning speed.',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      stats: '50+ formats supported'
    },
    {
      icon: FileText,
      title: 'PDF Power Tools',
      description: 'Compress, merge, split, and convert PDFs with advanced OCR capabilities.',
      color: 'from-red-500 to-pink-500',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
      stats: 'OCR + Batch processing'
    },
    {
      icon: Music,
      title: 'Audio Studio',
      description: 'Professional audio conversion with quality preservation and format optimization.',
      color: 'from-green-500 to-emerald-500',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      stats: 'Lossless conversion'
    }
  ];

  const benefits = [
    { icon: Zap, text: 'Lightning-fast processing with cloud-powered servers', color: 'from-yellow-400 to-orange-500' },
    { icon: Shield, text: 'Bank-level security with end-to-end encryption', color: 'from-green-400 to-emerald-500' },
    { icon: Clock, text: 'No registration required for basic features', color: 'from-blue-400 to-cyan-500' },
    { icon: Users, text: 'Support for all major file formats', color: 'from-purple-400 to-pink-500' },
    { icon: TrendingUp, text: 'Batch processing for multiple files', color: 'from-indigo-400 to-purple-500' },
    { icon: Star, text: 'Free tier with generous limits', color: 'from-yellow-400 to-amber-500' }
  ];

  const stats = [
    { number: '50+', label: 'File Formats', color: 'text-primary-color', icon: File },
    { number: '1M+', label: 'Files Processed', color: 'text-accent-color', icon: TrendingUp },
    { number: '99.9%', label: 'Uptime', color: 'text-success-color', icon: Shield },
    { number: '24/7', label: 'Support', color: 'text-warning-color', icon: Users }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Digital Creator",
      content: "FlixConvert has revolutionized my workflow. The image compression is incredible!",
      avatar: "👩‍🎨"
    },
    {
      name: "Mike Chen",
      role: "Video Editor",
      content: "Fast, reliable, and the quality is outstanding. My go-to tool for video conversion.",
      avatar: "👨‍💻"
    },
    {
      name: "Emma Davis",
      role: "Content Manager",
      content: "The batch processing feature saves me hours every week. Absolutely love it!",
      avatar: "👩‍💼"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section */}
      <section className="relative overflow-hidden bg-gradient-modern text-white section-padding pt-32">
        {/* Enhanced animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-40 h-40 bg-white/10 rounded-full animate-float blur-xl"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-white/10 rounded-full animate-float blur-xl" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full animate-float blur-xl" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-28 h-28 bg-white/5 rounded-full animate-pulse blur-lg"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/5 rounded-full animate-float blur-lg" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-1/4 left-1/2 w-16 h-16 bg-white/5 rounded-full animate-float blur-lg" style={{ animationDelay: '2.5s' }}></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-6xl mx-auto text-center animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles size={32} className="text-yellow-300 animate-pulse" />
              <span className="text-lg font-medium text-white/90">The Ultimate File Conversion Platform</span>
              <Sparkles size={32} className="text-yellow-300 animate-pulse" />
            </div>
            
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
              Convert & Compress
              <span className="block gradient-text-accent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Everything
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed">
              Professional-grade file conversion and compression tools powered by AI. 
              Images, videos, PDFs, and audio files - all in one place with lightning speed.
            </p>
            
            {/* Enhanced CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in mb-16">
              <Link
                to="/tools"
                className="btn bg-white text-primary-color hover:bg-gray-100 text-lg px-12 py-6 shadow-2xl rounded-3xl group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-modern opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <span className="relative z-10">Start Converting Now</span>
                <ArrowRight size={28} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
              </Link>
              <Link
                to="/company"
                className="btn glass border-2 border-white/20 text-white hover:bg-white/10 text-lg px-12 py-6 rounded-3xl backdrop-blur-sm group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-modern opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <span className="relative z-10">Learn More</span>
                <Play size={28} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>

            {/* Enhanced Stats Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                      <Icon size={28} className="text-white" />
                    </div>
                    <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
                    <div className="text-white/70 text-sm">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section className="section-padding bg-bg-secondary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-color/5 to-accent-color/5"></div>
        <div className="container relative z-10">
          <div className="text-center mb-20 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Layers size={32} className="text-primary-color" />
              <span className="text-lg font-medium text-text-secondary">Powerful Tools</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text">
              Everything You Need
            </h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Advanced file conversion and compression tools with AI-powered optimization
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="card group hover:shadow-2xl transition-all duration-500 animate-fade-in rounded-3xl relative overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-modern opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
                  <div 
                    className="w-20 h-20 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-300 shadow-lg relative z-10"
                    style={{ background: feature.gradient }}
                  >
                    <Icon size={36} className="text-white" />
                  </div>
                  <h3 className="text-2xl font-semibold mb-4 relative z-10">{feature.title}</h3>
                  <p className="text-text-secondary leading-relaxed text-lg mb-4 relative z-10">{feature.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium text-primary-color relative z-10">
                    <CheckCircle size={16} />
                    {feature.stats}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Enhanced Benefits Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div className="animate-slide-in">
              <div className="flex items-center gap-3 mb-6">
                <Award size={32} className="text-primary-color" />
                <span className="text-lg font-medium text-text-secondary">Why Choose FlixConvert?</span>
              </div>
              <h2 className="text-5xl md:text-6xl font-bold mb-8 gradient-text">
                Built for Professionals
              </h2>
              <p className="text-xl text-text-secondary mb-12 leading-relaxed">
                We provide the fastest, most secure, and most reliable file conversion and compression services with enterprise-grade infrastructure.
              </p>
              
              <div className="space-y-8">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-6 animate-fade-in group" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 mt-1 shadow-lg bg-gradient-to-r ${benefit.color} group-hover:scale-110 transition-transform duration-300`}>
                        <Icon size={28} className="text-white" />
                      </div>
                      <span className="text-text-primary leading-relaxed text-lg">{benefit.text}</span>
                    </div>
                  );
                })}
              </div>

              <div className="mt-12">
                <Link
                  to="/tools"
                  className="btn btn-primary text-lg px-12 py-6 shadow-2xl rounded-3xl group relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-modern opacity-20 group-hover:opacity-30 transition-opacity duration-300"></div>
                  <span className="relative z-10">Try Our Tools</span>
                  <ArrowRight size={28} className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="card p-12 bg-gradient-to-br from-primary-color/10 to-accent-color/10 border-0 shadow-2xl rounded-3xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-modern opacity-5"></div>
                <div className="grid grid-cols-2 gap-8 relative z-10">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center animate-fade-in group" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="w-16 h-16 bg-gradient-modern rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                          <Icon size={32} className="text-white" />
                        </div>
                        <div className={`text-4xl font-bold mb-3 ${stat.color}`}>{stat.number}</div>
                        <div className="text-text-secondary text-lg">{stat.label}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Enhanced floating elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-accent rounded-full opacity-20 animate-pulse blur-lg"></div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-secondary rounded-full opacity-20 animate-float blur-lg"></div>
            </div>
          </div>
        </div>
      </section>

      {/* New Testimonials Section */}
      <section className="section-padding bg-gradient-secondary text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full animate-float blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-float blur-xl" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full animate-pulse blur-lg"></div>
        </div>
        
        <div className="container text-center relative z-10">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Heart size={32} className="text-pink-300" />
              <span className="text-lg font-medium text-white/90">What Our Users Say</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-12">
              Loved by Thousands
            </h2>
            
            <div className="grid md:grid-cols-3 gap-8 mt-16">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card glass border-0 p-8 animate-fade-in" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="text-4xl mb-4">{testimonial.avatar}</div>
                  <p className="text-white/90 mb-6 leading-relaxed">"{testimonial.content}"</p>
                  <div>
                    <div className="font-semibold text-lg">{testimonial.name}</div>
                    <div className="text-white/70">{testimonial.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced CTA Section */}
      <section className="section-padding bg-gradient-modern text-white relative overflow-hidden">
        {/* Enhanced background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-white/10 rounded-full animate-float blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-float blur-xl" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-white/5 rounded-full animate-pulse blur-lg"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-white/5 rounded-full animate-float blur-lg" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className="container text-center relative z-10">
          <div className="max-w-5xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-6">
              <Globe size={32} className="text-yellow-300" />
              <span className="text-lg font-medium text-white/90">Ready to Get Started?</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold mb-8">
              Join the Revolution
            </h2>
            <p className="text-xl mb-12 text-white/90 max-w-4xl mx-auto leading-relaxed">
              Join thousands of users who trust FlixConvert for their file conversion and compression needs. 
              Start your journey today and experience the future of file processing.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center animate-slide-in">
              <Link
                to="/signup"
                className="btn bg-white text-primary-color hover:bg-gray-100 text-lg px-12 py-6 shadow-2xl rounded-3xl group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-modern opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <span className="relative z-10">Create Free Account</span>
                <User size={28} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </Link>
              <Link
                to="/tools"
                className="btn glass border-2 border-white/20 text-white hover:bg-white/10 text-lg px-12 py-6 rounded-3xl backdrop-blur-sm group relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-modern opacity-0 group-hover:opacity-10 transition-opacity duration-300"></div>
                <span className="relative z-10">Try Without Signup</span>
                <Upload size={28} className="relative z-10 group-hover:scale-110 transition-transform duration-300" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 