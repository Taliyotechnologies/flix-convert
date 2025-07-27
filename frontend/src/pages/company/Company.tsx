import React from 'react';
import { 
  Users, 
  Target, 
  Globe, 
  Shield, 
  Zap,
  Heart,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const Company: React.FC = () => {
  const stats = [
    { number: '1M+', label: 'Files Processed', icon: TrendingUp },
    { number: '50+', label: 'File Formats', icon: Globe },
    { number: '99.9%', label: 'Uptime', icon: Shield },
    { number: '24/7', label: 'Support', icon: Heart }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Security First',
      description: 'Your data is protected with enterprise-grade encryption and secure processing.'
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Our optimized infrastructure ensures your files are processed in seconds.'
    },
    {
      icon: Users,
      title: 'User Centric',
      description: 'We build our tools with users in mind, making complex tasks simple.'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Serving users worldwide with reliable, scalable cloud infrastructure.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: '/api/placeholder/150/150',
      bio: 'Former Google engineer with 10+ years in cloud infrastructure.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: '/api/placeholder/150/150',
      bio: 'Expert in scalable systems and real-time processing technologies.'
    },
    {
      name: 'Emily Rodriguez',
      role: 'Head of Product',
      image: '/api/placeholder/150/150',
      bio: 'Product leader focused on creating intuitive user experiences.'
    },
    {
      name: 'David Kim',
      role: 'Lead Engineer',
      image: '/api/placeholder/150/150',
      bio: 'Full-stack developer specializing in file processing and optimization.'
    }
  ];

  const timeline = [
    {
      year: '2020',
      title: 'Company Founded',
      description: 'Started with a vision to make file conversion accessible to everyone.'
    },
    {
      year: '2021',
      title: 'First Million Users',
      description: 'Reached our first million users and expanded our file format support.'
    },
    {
      year: '2022',
      title: 'Enterprise Launch',
      description: 'Launched enterprise solutions for businesses and organizations.'
    },
    {
      year: '2023',
      title: 'Global Expansion',
      description: 'Expanded to serve users in over 50 countries worldwide.'
    },
    {
      year: '2024',
      title: 'AI Integration',
      description: 'Introduced AI-powered features for smarter file processing.'
    }
  ];

  return (
    <div className="min-h-screen bg-bg-secondary">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-primary text-white py-20">
        <div className="container">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              About FlixConvert
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              We're on a mission to make file conversion and compression 
              accessible, secure, and lightning-fast for everyone.
            </p>
          </div>
        </div>
        
        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-white rounded-full"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-white rounded-full"></div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon size={32} className="text-white" />
                  </div>
                  <div className="text-3xl font-bold text-primary-color mb-2">{stat.number}</div>
                  <div className="text-text-secondary">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl text-text-secondary mb-8">
                We believe that file conversion and compression should be simple, 
                secure, and accessible to everyone. Whether you're a student, 
                professional, or business owner, our tools are designed to make 
                your digital life easier.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-success-color flex-shrink-0" />
                  <span>Free access to essential tools</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-success-color flex-shrink-0" />
                  <span>Enterprise-grade security</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-success-color flex-shrink-0" />
                  <span>Global infrastructure</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle size={20} className="text-success-color flex-shrink-0" />
                  <span>24/7 customer support</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="card p-8 bg-gradient-to-br from-primary-color/10 to-accent-color/10">
                <Target size={64} className="mx-auto mb-6 text-primary-color" />
                <h3 className="text-2xl font-bold text-center mb-4">Our Vision</h3>
                <p className="text-center text-text-secondary">
                  To become the world's most trusted platform for file conversion 
                  and compression, empowering millions of users to work more efficiently.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-bg-primary">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              These core values guide everything we do and every decision we make.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="card text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6">
                    <Icon size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                  <p className="text-text-secondary">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              The passionate individuals behind FlixConvert who work tirelessly 
              to make file conversion better for everyone.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card text-center">
                <div className="w-24 h-24 bg-gradient-primary rounded-full mx-auto mb-4 flex items-center justify-center">
                  <span className="text-white font-bold text-2xl">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-primary-color font-medium mb-3">{member.role}</p>
                <p className="text-text-secondary text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-bg-primary">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Journey</h2>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              From a small startup to serving millions of users worldwide.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-1/2 transform -translate-x-px w-0.5 h-full bg-border-color"></div>
            
            <div className="space-y-12">
              {timeline.map((item, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className="w-1/2 px-8">
                    <div className={`card ${index % 2 === 0 ? 'text-right' : 'text-left'}`}>
                      <div className="text-2xl font-bold text-primary-color mb-2">{item.year}</div>
                      <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                      <p className="text-text-secondary">{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="w-4 h-4 bg-primary-color rounded-full border-4 border-bg-primary relative z-10"></div>
                  
                  <div className="w-1/2 px-8"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-secondary text-white">
        <div className="container text-center">
          <h2 className="text-4xl font-bold mb-6">
            Join Our Mission
          </h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Whether you're a user, partner, or potential team member, 
            we'd love to hear from you and explore how we can work together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="btn bg-white text-primary-color hover:bg-gray-100 text-lg px-8 py-4"
            >
              Get in Touch
            </a>
            <a
              href="/tools"
              className="btn border-2 border-white text-white hover:bg-white hover:text-primary-color text-lg px-8 py-4"
            >
              Try Our Tools
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Company; 