import React from 'react'
import './Stats.css'

const Stats = () => {
  const stats = [
    {
      icon: '📊',
      label: 'Total Files Compressed',
      value: '2.5M+',
      description: 'Files processed successfully'
    },
    {
      icon: '💾',
      label: 'Storage Saved',
      value: '15TB+',
      description: 'Bandwidth and storage optimized'
    },
    {
      icon: '⚡',
      label: 'Average Compression',
      value: '40%',
      description: 'Size reduction achieved'
    },
    {
      icon: '👥',
      label: 'Active Users',
      value: '50K+',
      description: 'Trusted by users worldwide'
    }
  ]

  return (
    <div className="stats-container">
      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon">{stat.icon}</div>
            <div className="stat-content">
              <h3 className="stat-value">{stat.value}</h3>
              <p className="stat-label">{stat.label}</p>
              <span className="stat-description">{stat.description}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stats