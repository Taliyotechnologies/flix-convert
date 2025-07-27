import React from 'react';
import { 
  Users, 
  Target, 
  Globe, 
  Shield, 
  Zap,
  Heart,
  TrendingUp,
  CheckCircle,

  Award,
  Rocket,
  Lightbulb
} from 'lucide-react';

const Company: React.FC = () => {
  const stats = [
    { number: '1M+', label: 'Files Processed', icon: TrendingUp, color: 'text-primary-color' },
    { number: '50+', label: 'File Formats', icon: Globe, color: 'text-accent-color' },
    { number: '99.9%', label: 'Uptime', icon: Shield, color: 'text-success-color' },
    { number: '24/7', label: 'Support', icon: Heart, color: 'text-warning-color' }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Your data is protected with enterprise-grade encryption and secure processing.',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Our optimized infrastructure ensures your files are processed in seconds.',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    },
    {
      icon: Users,
      title: 'User Centric',
      description: 'We build our tools with users in mind, making complex tasks simple.',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving users worldwide with reliable, scalable cloud infrastructure.',
      gradient: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/api/placeholder/150/150',
      bio: 'Former Google engineer with 10+ years in cloud infrastructure.',
      gradient: 'linear-gradient(135deg, #ec4899 0%, #f43f5e 100%)'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '/api/placeholder/150/150',
      bio: 'Expert in scalable systems and real-time processing technologies.',
      gradient: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: '/api/placeholder/150/150',
      bio: 'Product leader focused on creating intuitive user experiences.',
      gradient: 'linear-gradient(135deg, #10b981 0%, #059669 100%)'
    },
    {
      name: 'David Kim',
      role: 'Lead Engineer',
      image: '/api/placeholder/150/150',
      bio: 'Full-stack developer specializing in file processing and optimization.',
      gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with a vision to make file conversion accessible to everyone.',
      icon: Rocket
    },
    {
      year: '2021',
      title: 'First Million Users',
      description: 'Reached our first million users and expanded our file format support.',
      icon: TrendingUp
    },
    {
      year: '2022',
      title: 'Enterprise Launch',
      description: 'Launched enterprise solutions for businesses and organizations.',
      icon: Award
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded to serve users in over 50 countries worldwide.',
      icon: Globe
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Introduced AI-powered features for smarter file processing.',
      icon: Lightbulb
    }
  ];

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary text-white py-20 lg:py-32">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white/10 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/3 w-20 h-20 bg-white/5 rounded-full animate-pulse"></div>
        </div>

        <div className="container relative z-10">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              About FlixConvert
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-3xl mx-auto leading-relaxed">
              We're on a mission to make file conversion and compression 
              accessible, secure, and lightning-fast for everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-20">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <Icon size={32} className="text-white" />
                  </div>
                  <div className={`text-3xl font-bold mb-2 ${stat.color}`}>{stat.number}</div>
                  <div className="text-text-secondary font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="animate-slide-in">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">Our Mission</h2>
              <p className="text-xl text-text-secondary mb-8 leading-relaxed">
                We believe that file conversion and compression should be simple, 
                secure, and accessible to everyone. Whether you're a student, 
                professional, or business owner, our tools are designed to make 
                your digital life easier.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.1s' }}>
                  <CheckCircle size={20} className="text-success-color flex-shrink-0" />
                  <span className="text-text-primary">Free access to essential tools</span>
                </div>
                <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.2s' }}>
                  <CheckCircle size={20} className="text-success-color flex-shrink-0" />
                  <span className="text-text-primary">Enterprise-grade security</span>
                </div>
                <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  <CheckCircle size={20} className="text-success-color flex-shrink-0" />
                  <span className="text-text-primary">Global infrastructure</span>
                </div>
                <div className="flex items-center gap-3 animate-fade-in" style={{ animationDelay: '0.4s' }}>
                  <CheckCircle size={20} className="text-success-color flex-shrink-0" />
                  <span className="text-text-primary">24/7 customer support</span>
                </div>
              </div>
            </div>
            <div className="relative animate-fade-in">
              <div className="card p-8 bg-gradient-to-br from-primary-color/10 to-accent-color/10 border-0 shadow-xl">
                <Target size={64} className="mx-auto mb-6 text-primary-color" />
                <h3 className="text-2xl font-bold text-center mb-4 gradient-text">Our Vision</h3>
                <p className="text-center text-text-secondary text-lg leading-relaxed">
                  To become the world's most trusted platform for file conversion 
                  and compression, empowering millions of users to work more efficiently.
                </p>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-accent rounded-full opacity-20 animate-pulse"></div>
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-secondary rounded-full opacity-20 animate-float"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-32 bg-bg-primary">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Values</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              These core values guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="card text-center group hover:shadow-xl transition-all duration-500 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div 
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg"
                    style={{ background: value.gradient }}
                  >
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-text-secondary leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 lg:py-32">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Meet Our Team</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              The passionate individuals behind FlixConvert who work tirelessly 
              to make file conversion better for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center group hover:shadow-xl transition-all duration-500 animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div 
                  className="w-24 h-24 rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300"
                  style={{ background: member.gradient }}
                >
                  <span className="text-white font-bold text-2xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                <p className="text-primary-color font-medium mb-3">{member.role}</p>
                <p className="text-text-secondary leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 lg:py-32 bg-bg-primary">
        <div className="container">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">Our Journey</h2>
            <p className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              From a small startup to serving millions of users worldwide.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px w-1 h-full bg-gradient-primary rounded-full"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} animate-fade-in`} style={{ animationDelay: `${index * 0.2}s` }}>
                    <div className="w-1/2 px-8">
                      <div className={`card ${index % 2 === 0 ? 'text-right' : 'text-left'} hover:shadow-xl transition-all duration-300`}>
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                            <Icon size={24} className="text-white" />
                          </div>
                          <div className={`text-2xl font-bold ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>{item.year}</div>
                        </div>
                        <h3 className="text-xl font-semibold mb-3">{item.title}</h3>
                        <p className="text-text-secondary leading-relaxed">{item.description}</p>
                      </div>
                    </div>
                    
                    <div className="w-6 h-6 bg-gradient-primary rounded-full border-4 border-bg-primary relative z-10 shadow-lg"></div>
                    
                    <div className="w-1/2 px-8"></div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-32 bg-gradient-secondary text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-white/10 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="container text-center relative z-10">
          <div className="max-w-3xl mx-auto animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Join Our Mission
            </h2>
            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto leading-relaxed">
              Whether you're a user, partner, or potential team member, 
              we'd love to hear from you and explore how we can work together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-in">
              <a
                href="/contact"
                className="btn bg-white text-primary-color hover:bg-gray-100 text-lg px-8 py-4 shadow-xl"
              >
                Get in Touch
              </a>
              <a
                href="/tools"
                className="btn glass border-2 border-white/20 text-white hover:bg-white/10 text-lg px-8 py-4 backdrop-blur-sm"
              >
                Try Our Tools
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company; 