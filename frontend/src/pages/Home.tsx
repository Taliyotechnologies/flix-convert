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
  User
} from 'lucide-react';

const Home: React.FC = () => {




  const features = [
    {
      icon: Image,
      title: 'AI-Powered Compression',
      description: 'Neural network compression that reduces file size by up to 90% while maintaining perfect quality.',
      color: 'from-pink-500 to-rose-500',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)',
      stats: 'Up to 90% smaller',
      tech: 'Neural Networks'
    },
    {
      icon: Video,
      title: 'Quantum Video Processing',
      description: 'Next-gen video conversion with hardware acceleration and real-time optimization.',
      color: 'from-blue-500 to-cyan-500',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
      stats: '100+ formats supported',
      tech: 'Quantum Processing'
    },
    {
      icon: FileText,
      title: 'Smart PDF Engine',
      description: 'Intelligent PDF processing with OCR, AI-powered compression, and batch operations.',
      color: 'from-red-500 to-pink-500',
      gradient: 'linear-gradient(135deg, #ef4444 0%, #ec4899 100%)',
      stats: 'AI OCR + Batch',
      tech: 'Machine Learning'
    },
    {
      icon: Music,
      title: 'Neural Audio Studio',
      description: 'Advanced audio processing with neural networks for perfect quality preservation.',
      color: 'from-green-500 to-emerald-500',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
      stats: 'Lossless AI conversion',
      tech: 'Neural Networks'
    }
  ];

  const benefits = [
    { icon: Zap, text: 'Lightning-fast processing with quantum-powered servers', color: 'from-yellow-400 to-orange-500', tech: 'Quantum Computing' },
    { icon: Shield, text: 'Military-grade security with blockchain encryption', color: 'from-green-400 to-emerald-500', tech: 'Blockchain Security' },
    { icon: Clock, text: 'Zero registration required for all features', color: 'from-blue-400 to-cyan-500', tech: 'Instant Access' },
    { icon: Users, text: 'Support for 200+ file formats', color: 'from-purple-400 to-pink-500', tech: 'Universal Support' },
    { icon: TrendingUp, text: 'AI-powered batch processing for unlimited files', color: 'from-indigo-400 to-purple-500', tech: 'AI Automation' },
    { icon: Star, text: 'Free tier with enterprise-grade features', color: 'from-yellow-400 to-amber-500', tech: 'Enterprise Free' }
  ];

  const stats = [
    { number: '200+', label: 'File Formats', color: 'text-primary-color', icon: File, tech: 'Universal' },
    { number: '10M+', label: 'Files Processed', color: 'text-accent-color', icon: TrendingUp, tech: 'Scalable' },
    { number: '99.99%', label: 'Uptime', color: 'text-success-color', icon: Shield, tech: 'Reliable' },
    { number: '24/7', label: 'AI Support', color: 'text-warning-color', icon: Brain, tech: 'Intelligent' }
  ];

  const testimonials = [
    {
      name: "Dr. Sarah Chen",
      role: "AI Research Director",
      content: "FlixConvert's neural compression is revolutionary. It's like magic!",
      avatar: "👩‍🔬",
      company: "TechCorp Labs"
    },
    {
      name: "Marcus Rodriguez",
      role: "Quantum Engineer",
      content: "The processing speed is incredible. Quantum-level performance!",
      avatar: "👨‍💻",
      company: "Quantum Systems"
    },
    {
      name: "Dr. Emma Watson",
      role: "Data Scientist",
      content: "The AI-powered features are game-changing for our workflow.",
      avatar: "👩‍💼",
      company: "DataFlow Inc"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Stunning Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white section-padding pt-40">
        {/* Animated background particles */}
        <div className="particles">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="particle"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 6}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
        </div>

        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 25% 25%, rgba(99, 102, 241, 0.3) 0%, transparent 50%),
                             radial-gradient(circle at 75% 75%, rgba(6, 182, 212, 0.3) 0%, transparent 50%)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-7xl mx-auto text-center animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Rocket size={40} className="text-cyan-400 animate-pulse" />
              <span className="text-xl font-bold text-white/90 bg-gradient-neon bg-clip-text text-transparent">THE FUTURE OF FILE PROCESSING</span>
              <Rocket size={40} className="text-cyan-400 animate-pulse" />
            </div>
            
            <h1 className="text-7xl md:text-8xl lg:text-9xl font-black mb-12 leading-tight">
              <span className="block gradient-text-aurora">CONVERT</span>
              <span className="block gradient-text-neon">EVERYTHING</span>
              <span className="block gradient-text-cyber">INSTANTLY</span>
            </h1>
            <p className="text-2xl md:text-3xl mb-16 text-white/90 max-w-5xl mx-auto leading-relaxed">
              Revolutionary AI-powered file conversion and compression platform. 
              Experience quantum-speed processing with neural network optimization.
            </p>
            
            {/* Stunning CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-8 justify-center animate-slide-in mb-20">
              <Link
                to="/tools"
                className="btn bg-gradient-neon text-white hover:bg-gradient-cyber text-xl px-16 py-8 shadow-2xl rounded-3xl group relative overflow-hidden neon-glow"
              >
                <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <span className="relative z-10 font-black">START CONVERTING NOW</span>
                <ArrowRight size={32} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
              </Link>
              <Link
                to="/company"
                className="btn glass border-2 border-white/20 text-white hover:bg-white/10 text-xl px-16 py-8 rounded-3xl backdrop-blur-sm group relative overflow-hidden neon-glow"
              >
                <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <span className="relative z-10 font-black">EXPLORE TECHNOLOGY</span>
                <Play size={32} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
              </Link>
            </div>

            {/* Stunning Stats Preview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-12 max-w-6xl mx-auto">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center animate-fade-in group" style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="w-20 h-20 bg-gradient-neon rounded-3xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm group-hover:scale-110 transition-transform duration-500 neon-glow">
                      <Icon size={36} className="text-white" />
                    </div>
                    <div className={`text-4xl font-black mb-3 ${stat.color}`}>{stat.number}</div>
                    <div className="text-white/70 text-lg font-bold">{stat.label}</div>
                    <div className="text-cyan-400 text-sm font-bold mt-2">{stat.tech}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Stunning Features Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-color/5 to-accent-color/5"></div>
        <div className="container relative z-10">
          <div className="text-center mb-24 animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Cpu size={48} className="text-cyan-400" />
              <span className="text-2xl font-bold text-white/90 bg-gradient-neon bg-clip-text text-transparent">CUTTING-EDGE TECHNOLOGY</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-12 gradient-text-aurora">
              AI-POWERED TOOLS
            </h2>
            <p className="text-2xl text-white/90 max-w-4xl mx-auto leading-relaxed">
              Experience the future of file processing with neural networks and quantum computing
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div 
                  key={index} 
                  className="card group hover:shadow-2xl transition-all duration-700 animate-fade-in rounded-3xl relative overflow-hidden neon-glow"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-10 transition-opacity duration-700"></div>
                  <div 
                    className="w-24 h-24 rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500 shadow-2xl relative z-10"
                    style={{ background: feature.gradient }}
                  >
                    <Icon size={48} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-black mb-6 relative z-10">{feature.title}</h3>
                  <p className="text-white/80 leading-relaxed text-lg mb-6 relative z-10">{feature.description}</p>
                  <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-3 text-sm font-bold text-cyan-400">
                      <CheckCircle size={20} />
                      {feature.stats}
                    </div>
                    <div className="text-xs font-bold text-purple-400 bg-purple-400/10 px-3 py-1 rounded-full">
                      {feature.tech}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stunning Benefits Section */}
      <section className="section-padding relative overflow-hidden">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-20 lg:gap-32 items-center">
            <div className="animate-slide-in">
              <div className="flex items-center gap-4 mb-8">
                <Award size={48} className="text-cyan-400" />
                <span className="text-2xl font-bold text-white/90 bg-gradient-neon bg-clip-text text-transparent">WHY CHOOSE FLIXCONVERT?</span>
              </div>
              <h2 className="text-6xl md:text-7xl font-black mb-12 gradient-text-cyber">
                QUANTUM PERFORMANCE
              </h2>
              <p className="text-2xl text-white/80 mb-16 leading-relaxed">
                Experience the pinnacle of file processing technology with quantum computing and neural networks.
              </p>
              
              <div className="space-y-12">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="flex items-start gap-8 animate-fade-in group" style={{ animationDelay: `${index * 0.1}s` }}>
                      <div className={`w-20 h-20 rounded-3xl flex items-center justify-center flex-shrink-0 mt-2 shadow-2xl bg-gradient-to-r ${benefit.color} group-hover:scale-110 transition-transform duration-500 neon-glow`}>
                        <Icon size={36} className="text-white" />
                      </div>
                      <div className="flex-1">
                        <span className="text-white leading-relaxed text-xl font-bold">{benefit.text}</span>
                        <div className="text-cyan-400 text-sm font-bold mt-2">{benefit.tech}</div>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="mt-16">
                <Link
                  to="/tools"
                  className="btn btn-primary text-xl px-16 py-8 shadow-2xl rounded-3xl group relative overflow-hidden neon-glow"
                >
                  <div className="absolute inset-0 bg-gradient-cyber opacity-20 group-hover:opacity-40 transition-opacity duration-500"></div>
                  <span className="relative z-10 font-black">EXPERIENCE THE FUTURE</span>
                  <ArrowRight size={32} className="relative z-10 group-hover:translate-x-2 transition-transform duration-500" />
                </Link>
              </div>
            </div>

            <div className="relative animate-fade-in">
              <div className="card p-16 bg-gradient-to-br from-primary-color/10 to-accent-color/10 border-0 shadow-2xl rounded-3xl relative overflow-hidden neon-glow">
                <div className="absolute inset-0 bg-gradient-neon opacity-5"></div>
                <div className="grid grid-cols-2 gap-12 relative z-10">
                  {stats.map((stat, index) => {
                    const Icon = stat.icon;
                    return (
                      <div key={index} className="text-center animate-fade-in group" style={{ animationDelay: `${index * 0.1}s` }}>
                        <div className="w-20 h-20 bg-gradient-neon rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-500 neon-glow">
                          <Icon size={40} className="text-white" />
                        </div>
                        <div className={`text-5xl font-black mb-4 ${stat.color}`}>{stat.number}</div>
                        <div className="text-white/80 text-xl font-bold">{stat.label}</div>
                        <div className="text-cyan-400 text-sm font-bold mt-2">{stat.tech}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
              
              {/* Stunning floating elements */}
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-neon rounded-full opacity-20 animate-pulse blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 w-24 h-24 bg-gradient-cyber rounded-full opacity-20 animate-float blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Stunning Testimonials Section */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-neon rounded-full animate-float blur-xl opacity-20"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-cyber rounded-full animate-float blur-xl opacity-20" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-aurora rounded-full animate-pulse blur-lg opacity-20"></div>
        </div>
        
        <div className="container text-center relative z-10">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Heart size={48} className="text-pink-400" />
              <span className="text-2xl font-bold text-white/90 bg-gradient-neon bg-clip-text text-transparent">WHAT EXPERTS SAY</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-16 gradient-text-aurora">
              TRUSTED BY LEADERS
            </h2>
            
            <div className="grid md:grid-cols-3 gap-12 mt-20">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="card glass border-0 p-12 animate-fade-in neon-glow" style={{ animationDelay: `${index * 0.2}s` }}>
                  <div className="text-6xl mb-8">{testimonial.avatar}</div>
                  <p className="text-white/90 mb-8 leading-relaxed text-lg">"{testimonial.content}"</p>
                  <div>
                    <div className="font-black text-xl mb-2">{testimonial.name}</div>
                    <div className="text-white/70 font-bold">{testimonial.role}</div>
                    <div className="text-cyan-400 text-sm font-bold mt-2">{testimonial.company}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stunning CTA Section */}
      <section className="section-padding bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden">
        {/* Stunning background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-neon rounded-full animate-float blur-xl opacity-20"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-cyber rounded-full animate-float blur-xl opacity-20" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-aurora rounded-full animate-pulse blur-lg opacity-20"></div>
          <div className="absolute top-1/3 right-1/4 w-20 h-20 bg-gradient-neon rounded-full animate-float blur-lg opacity-20" style={{ animationDelay: '1.5s' }}></div>
        </div>
        
        <div className="container text-center relative z-10">
          <div className="max-w-6xl mx-auto animate-fade-in">
            <div className="flex items-center justify-center gap-4 mb-8">
              <Globe size={48} className="text-cyan-400" />
              <span className="text-2xl font-bold text-white/90 bg-gradient-neon bg-clip-text text-transparent">READY TO REVOLUTIONIZE?</span>
            </div>
            <h2 className="text-6xl md:text-7xl font-black mb-12 gradient-text-cyber">
              JOIN THE FUTURE
            </h2>
            <p className="text-2xl mb-16 text-white/90 max-w-5xl mx-auto leading-relaxed">
              Join millions of users who trust FlixConvert for their file processing needs. 
              Experience the power of AI and quantum computing today.
            </p>
            <div className="flex flex-col sm:flex-row gap-8 justify-center animate-slide-in">
              <Link
                to="/signup"
                className="btn bg-gradient-neon text-white hover:bg-gradient-cyber text-xl px-16 py-8 shadow-2xl rounded-3xl group relative overflow-hidden neon-glow"
              >
                <div className="absolute inset-0 bg-gradient-cyber opacity-0 group-hover:opacity-30 transition-opacity duration-500"></div>
                <span className="relative z-10 font-black">CREATE FREE ACCOUNT</span>
                <User size={32} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
              </Link>
              <Link
                to="/tools"
                className="btn glass border-2 border-white/20 text-white hover:bg-white/10 text-xl px-16 py-8 rounded-3xl backdrop-blur-sm group relative overflow-hidden neon-glow"
              >
                <div className="absolute inset-0 bg-gradient-neon opacity-0 group-hover:opacity-20 transition-opacity duration-500"></div>
                <span className="relative z-10 font-black">TRY WITHOUT SIGNUP</span>
                <Upload size={32} className="relative z-10 group-hover:scale-110 transition-transform duration-500" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 