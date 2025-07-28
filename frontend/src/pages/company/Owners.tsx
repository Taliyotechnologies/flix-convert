import React from 'react';
import { Link } from 'react-router-dom';
import './Company.css';

const Owners: React.FC = () => {
  const founders = [
    {
      name: 'Alex Johnson',
      role: 'CEO & Co-Founder',
      bio: 'Alex is a serial entrepreneur with over 15 years of experience in the tech industry. He founded FlixConvert with a vision to make file conversion accessible to everyone.',
      avatar: (
        <svg className="founder-avatar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      experience: '15+ years in tech',
      expertise: ['Product Strategy', 'Business Development', 'Team Leadership'],
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Sarah Chen',
      role: 'CTO & Co-Founder',
      bio: 'Sarah is a technology expert with deep knowledge in cloud infrastructure and file processing. She leads our technical team and ensures our platform remains cutting-edge.',
      avatar: (
        <svg className="founder-avatar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      experience: '12+ years in engineering',
      expertise: ['Cloud Architecture', 'File Processing', 'System Design'],
      linkedin: '#',
      twitter: '#'
    }
  ];

  const leadership = [
    {
      name: 'Mike Rodriguez',
      role: 'Head of Product',
      bio: 'Mike focuses on creating intuitive and powerful user experiences. He ensures our tools are both powerful and easy to use.',
      avatar: (
        <svg className="leader-avatar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      experience: '10+ years in product',
      expertise: ['UX Design', 'Product Strategy', 'User Research'],
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Emily Watson',
      role: 'Head of Marketing',
      bio: 'Emily leads our marketing efforts and ensures FlixConvert reaches users worldwide who need our file conversion tools.',
      avatar: (
        <svg className="leader-avatar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      experience: '8+ years in marketing',
      expertise: ['Digital Marketing', 'Brand Strategy', 'Growth'],
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'David Kim',
      role: 'Head of Engineering',
      bio: 'David leads our engineering team and ensures our platform remains fast, secure, and reliable for millions of users.',
      avatar: (
        <svg className="leader-avatar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      experience: '13+ years in engineering',
      expertise: ['Backend Development', 'DevOps', 'Security'],
      linkedin: '#',
      twitter: '#'
    },
    {
      name: 'Lisa Thompson',
      role: 'Head of Customer Success',
      bio: 'Lisa ensures our users have the best experience possible and leads our customer support and success initiatives.',
      avatar: (
        <svg className="leader-avatar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      experience: '9+ years in customer success',
      expertise: ['Customer Support', 'User Onboarding', 'Success Metrics'],
      linkedin: '#',
      twitter: '#'
    }
  ];

  const advisors = [
    {
      name: 'Dr. Robert Wilson',
      role: 'Technical Advisor',
      bio: 'Former CTO at major tech companies with expertise in scalable systems and file processing technologies.',
      avatar: (
        <svg className="advisor-avatar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      company: 'Tech Innovation Labs'
    },
    {
      name: 'Jennifer Park',
      role: 'Business Advisor',
      bio: 'Serial entrepreneur and investor with experience in building successful SaaS companies.',
      avatar: (
        <svg className="advisor-avatar" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      company: 'Venture Capital Partners'
    }
  ];

  return (
    <div className="company-page">
      {/* Hero Section */}
      <section className="company-hero">
        <div className="container">
          <div className="company-hero-content">
            <h1 className="company-hero-title">
              Meet Our
              <span className="company-hero-accent"> Leadership</span>
            </h1>
            <p className="company-hero-subtitle">
              The passionate founders and leaders behind FlixConvert who are dedicated 
              to making file conversion accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <section className="company-founders">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Founders</h2>
            <p className="section-subtitle">
              The visionaries who started it all
            </p>
          </div>

          <div className="founders-grid">
            {founders.map((founder, index) => (
              <div key={index} className="founder-card">
                <div className="founder-avatar">{founder.avatar}</div>
                <h3 className="founder-name">{founder.name}</h3>
                <div className="founder-role">{founder.role}</div>
                <p className="founder-bio">{founder.bio}</p>
                <div className="founder-experience">
                  <span className="experience-badge">{founder.experience}</span>
                </div>
                <div className="founder-expertise">
                  <h4>Expertise:</h4>
                  <ul className="expertise-list">
                    {founder.expertise.map((skill, skillIndex) => (
                      <li key={skillIndex} className="expertise-item">{skill}</li>
                    ))}
                  </ul>
                </div>
                <div className="founder-social">
                  <a href={founder.linkedin} className="social-link linkedin">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href={founder.twitter} className="social-link twitter">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="company-leadership">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Leadership Team</h2>
            <p className="section-subtitle">
              The experienced leaders driving our success
            </p>
          </div>

          <div className="leadership-grid">
            {leadership.map((leader, index) => (
              <div key={index} className="leader-card">
                <div className="leader-avatar">{leader.avatar}</div>
                <h3 className="leader-name">{leader.name}</h3>
                <div className="leader-role">{leader.role}</div>
                <p className="leader-bio">{leader.bio}</p>
                <div className="leader-experience">
                  <span className="experience-badge">{leader.experience}</span>
                </div>
                <div className="leader-expertise">
                  <h4>Expertise:</h4>
                  <ul className="expertise-list">
                    {leader.expertise.map((skill, skillIndex) => (
                      <li key={skillIndex} className="expertise-item">{skill}</li>
                    ))}
                  </ul>
                </div>
                <div className="leader-social">
                  <a href={leader.linkedin} className="social-link linkedin">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                  <a href={leader.twitter} className="social-link twitter">
                    <svg viewBox="0 0 24 24" fill="currentColor">
                      <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                    </svg>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <section className="company-advisors">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Advisory Board</h2>
            <p className="section-subtitle">
              Industry experts who guide our strategic decisions
            </p>
          </div>

          <div className="advisors-grid">
            {advisors.map((advisor, index) => (
              <div key={index} className="advisor-card">
                <div className="advisor-avatar">{advisor.avatar}</div>
                <h3 className="advisor-name">{advisor.name}</h3>
                <div className="advisor-role">{advisor.role}</div>
                <p className="advisor-bio">{advisor.bio}</p>
                <div className="advisor-company">{advisor.company}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="company-values">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Our Leadership Values</h2>
            <p className="section-subtitle">
              The principles that guide our leadership team
            </p>
          </div>

          <div className="values-grid">
            <div className="value-card">
              <div className="value-icon">
                <svg className="value-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="value-title">Customer Focus</h3>
              <p className="value-description">
                Every decision we make is centered around providing the best experience for our users.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg className="value-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="value-title">Innovation</h3>
              <p className="value-description">
                We continuously push boundaries to deliver cutting-edge file processing solutions.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg className="value-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                </svg>
              </div>
              <h3 className="value-title">Collaboration</h3>
              <p className="value-description">
                We believe in the power of teamwork and diverse perspectives to solve complex challenges.
              </p>
            </div>
            <div className="value-card">
              <div className="value-icon">
                <svg className="value-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="value-title">Integrity</h3>
              <p className="value-description">
                We operate with transparency, honesty, and the highest ethical standards.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="company-cta">
        <div className="container">
          <div className="cta-content">
            <h2 className="cta-title">Join Our Mission</h2>
            <p className="cta-subtitle">
              We're always looking for talented individuals who share our passion for making 
              file conversion accessible to everyone. Explore opportunities to join our team.
            </p>
            <div className="cta-buttons">
              <Link to="/company/contact" className="btn btn-primary">
                Contact Us
              </Link>
              <Link to="/tools" className="btn btn-secondary">
                Try Our Tools
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Owners; 