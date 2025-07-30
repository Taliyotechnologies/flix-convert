import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiZap, 
  FiShield, 
  FiSmartphone, 
  FiCheckCircle, 
  FiFileText,
  FiArrowRight,
  FiDownload,
  FiUpload,
  FiClock,
  FiUsers
} from 'react-icons/fi';

const Home = () => {
  const features = [
    {
      icon: <FiZap size={28} />,
      title: 'Lightning Fast',
      description: 'Compress and convert files in seconds with our optimized processing engine.',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      icon: <FiShield size={28} />,
      title: 'Secure & Private',
      description: 'Your files are automatically deleted after 24 hours. We never store your data permanently.',
      gradient: 'from-green-400 to-blue-500'
    },
    {
      icon: <FiSmartphone size={28} />,
      title: 'Cross Platform',
      description: 'Works seamlessly on all devices - desktop, tablet, and mobile browsers.',
      gradient: 'from-purple-400 to-pink-500'
    },
    {
      icon: <FiCheckCircle size={28} />,
      title: 'Quality Preserved',
      description: 'Advanced algorithms ensure no quality loss while achieving maximum compression.',
      gradient: 'from-blue-400 to-cyan-500'
    },
    {
      icon: <FiFileText size={28} />,
      title: 'Multi-Format',
      description: 'Support for Images, Videos, Audio, and PDF files with multiple format options.',
      gradient: 'from-indigo-400 to-purple-500'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section - Enhanced */}
      <section className="relative py-12 md:py-16 lg:py-20 overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-color via-purple-600 to-pink-600 opacity-90"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-10 w-72 h-72 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white opacity-10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        </div>

        <div className="container relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <div className="space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-white bg-opacity-20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                <FiZap className="animate-pulse" />
                <span>Free up to 10MB • No Registration Required</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
                Compress & Convert Any File —{' '}
                <span className="gradient-text bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                  Instantly
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-white text-opacity-90 leading-relaxed max-w-2xl">
                Transform your files with our powerful compression and conversion tools. 
                No registration required, no quality loss, and files are automatically deleted for your privacy.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/tools"
                  className="btn btn-lg bg-white text-primary-color hover:bg-gray-100 inline-flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
                >
                  <FiUpload className="mr-2" />
                  Try Tools Now
                  <FiArrowRight size={18} />
                </Link>
                <Link
                  to="/company"
                  className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary-color backdrop-blur-sm"
                >
                  Learn More
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">10MB</div>
                  <div className="text-sm text-white text-opacity-80">Free Limit</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24h</div>
                  <div className="text-sm text-white text-opacity-80">Auto Delete</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">100%</div>
                  <div className="text-sm text-white text-opacity-80">Secure</div>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-full h-96 bg-white bg-opacity-10 backdrop-blur-md rounded-3xl border border-white border-opacity-20 flex items-center justify-center shadow-2xl">
                  <div className="text-center space-y-6">
                    <div className="w-24 h-24 bg-gradient-to-br from-white to-white bg-opacity-20 rounded-2xl flex items-center justify-center mx-auto shadow-lg">
                      <FiFileText size={48} className="text-white" />
                    </div>
                    <div className="space-y-3">
                      <div className="w-40 h-4 bg-white bg-opacity-20 rounded-lg mx-auto animate-pulse"></div>
                      <div className="w-32 h-4 bg-white bg-opacity-20 rounded-lg mx-auto animate-pulse" style={{animationDelay: '0.5s'}}></div>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <div className="w-3 h-3 bg-white bg-opacity-40 rounded-full animate-bounce"></div>
                      <div className="w-3 h-3 bg-white bg-opacity-20 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      <div className="w-3 h-3 bg-white bg-opacity-20 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                    </div>
                  </div>
                </div>
                
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce">
                  <FiZap size={24} className="text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-green-400 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce" style={{animationDelay: '0.5s'}}>
                  <FiCheckCircle size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Enhanced */}
      <section className="py-16 md:py-20 lg:py-24 bg-bg-secondary relative">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-text-primary mb-6">
              Why Choose{' '}
              <span className="gradient-text">ConvertFlix</span>?
            </h2>
            <p className="text-lg md:text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed">
              Our platform combines cutting-edge technology with user-friendly design to deliver the best file processing experience.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card group hover:scale-105 transition-all duration-300">
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}>
                  <div className="text-white">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-text-primary mb-4 text-center">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Enhanced */}
      <section className="py-16 md:py-20 lg:py-24 bg-gradient-to-br from-primary-color to-purple-600 relative overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="container relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-white text-opacity-90 mb-8 leading-relaxed">
              Join thousands of users who trust ConvertFlix for their file compression and conversion needs. 
              Start processing your files in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tools"
                className="btn btn-lg bg-white text-primary-color hover:bg-gray-100 inline-flex items-center justify-center shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all"
              >
                <FiDownload className="mr-2" />
                Start Converting Now
                <FiArrowRight size={18} />
              </Link>
              <Link
                to="/signup"
                className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary-color backdrop-blur-sm"
              >
                <FiUsers className="mr-2" />
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Enhanced */}
      <section className="py-16 md:py-20 bg-bg-tertiary">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="card bg-gradient-to-br from-blue-500 to-purple-600 text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">10MB</div>
              <div className="text-sm opacity-90">Free File Size Limit</div>
            </div>
            <div className="card bg-gradient-to-br from-green-500 to-blue-600 text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">24h</div>
              <div className="text-sm opacity-90">Auto-Delete Time</div>
            </div>
            <div className="card bg-gradient-to-br from-purple-500 to-pink-600 text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">100%</div>
              <div className="text-sm opacity-90">Privacy Guaranteed</div>
            </div>
            <div className="card bg-gradient-to-br from-orange-500 to-red-600 text-white">
              <div className="text-3xl md:text-4xl font-bold mb-2">0</div>
              <div className="text-sm opacity-90">Registration Required</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 