import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiZap, 
  FiShield, 
  FiSmartphone, 
  FiCheckCircle, 
  FiFileText,
  FiArrowRight
} from 'react-icons/fi';

const Home = () => {
  const features = [
    {
      icon: <FiZap size={24} />,
      title: 'Lightning Fast',
      description: 'Compress and convert files in seconds with our optimized processing engine.'
    },
    {
      icon: <FiShield size={24} />,
      title: 'Secure & Private',
      description: 'Your files are automatically deleted after 24 hours. We never store your data permanently.'
    },
    {
      icon: <FiSmartphone size={24} />,
      title: 'Cross Platform',
      description: 'Works seamlessly on all devices - desktop, tablet, and mobile browsers.'
    },
    {
      icon: <FiCheckCircle size={24} />,
      title: 'Quality Preserved',
      description: 'Advanced algorithms ensure no quality loss while achieving maximum compression.'
    },
    {
      icon: <FiFileText size={24} />,
      title: 'Multi-Format',
      description: 'Support for Images, Videos, Audio, and PDF files with multiple format options.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-primary-color to-primary-hover text-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Compress & Convert Any File — Instantly. Free Up to 10MB.
              </h1>
              <p className="text-xl text-blue-100 leading-relaxed">
                Transform your files with our powerful compression and conversion tools. 
                No registration required, no quality loss, and files are automatically deleted for your privacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/tools"
                  className="btn btn-lg bg-white text-primary-color hover:bg-gray-100 inline-flex items-center"
                >
                  Try Tools Now
                  <FiArrowRight size={20} />
                </Link>
                <Link
                  to="/company"
                  className="btn btn-lg btn-outline border-white text-white hover:bg-white hover:text-primary-color"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="w-full h-96 bg-white bg-opacity-10 rounded-2xl backdrop-blur-sm border border-white border-opacity-20 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center mx-auto">
                      <FiFileText size={40} className="text-white" />
                    </div>
                    <div className="space-y-2">
                      <div className="w-32 h-4 bg-white bg-opacity-20 rounded mx-auto"></div>
                      <div className="w-24 h-4 bg-white bg-opacity-20 rounded mx-auto"></div>
                    </div>
                    <div className="flex justify-center space-x-2">
                      <div className="w-3 h-3 bg-white bg-opacity-40 rounded-full"></div>
                      <div className="w-3 h-3 bg-white bg-opacity-20 rounded-full"></div>
                      <div className="w-3 h-3 bg-white bg-opacity-20 rounded-full"></div>
                    </div>
                  </div>
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-accent-color rounded-full flex items-center justify-center">
                  <FiZap size={24} className="text-white" />
                </div>
                <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-success-color rounded-full flex items-center justify-center">
                  <FiCheckCircle size={20} className="text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-bg-secondary">
        <div className="container">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-4">
              Why Choose ConvertFlix?
            </h2>
            <p className="text-lg text-text-secondary max-w-2xl mx-auto">
              Our platform combines cutting-edge technology with user-friendly design to deliver the best file processing experience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="card text-center group">
                <div className="w-16 h-16 bg-primary-color bg-opacity-10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-color group-hover:text-white transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-text-primary mb-3">
                  {feature.title}
                </h3>
                <p className="text-text-secondary leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-bg-primary">
        <div className="container">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl lg:text-4xl font-bold text-text-primary mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-lg text-text-secondary mb-8">
              Join thousands of users who trust ConvertFlix for their file compression and conversion needs. 
              Start processing your files in seconds.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/tools"
                className="btn btn-lg btn-primary inline-flex items-center"
              >
                Start Converting Now
                <FiArrowRight size={20} />
              </Link>
              <Link
                to="/signup"
                className="btn btn-lg btn-outline"
              >
                Create Free Account
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-bg-tertiary">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-primary-color mb-2">10MB</div>
              <div className="text-text-secondary">Free File Size Limit</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-color mb-2">24h</div>
              <div className="text-text-secondary">Auto-Delete Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-color mb-2">100%</div>
              <div className="text-text-secondary">Privacy Guaranteed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary-color mb-2">0</div>
              <div className="text-text-secondary">Registration Required</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home; 