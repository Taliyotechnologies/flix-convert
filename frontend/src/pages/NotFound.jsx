import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Page Not Found | ConvertFlix</title>
        <meta name="description" content="The page you're looking for doesn't exist." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="text-center">
          <div className="text-8xl mb-4">😕</div>
          <h1 className="text-4xl font-bold mb-4">Page Not Found</h1>
          <p className="text-xl text-text-secondary mb-8">
            The page you're looking for doesn't exist.
          </p>
          <Link to="/" className="btn btn-primary">
            🏠 Go Home
          </Link>
        </div>
      </div>
    </>
  )
}

export default NotFound 