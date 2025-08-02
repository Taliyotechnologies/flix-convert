import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../hooks/useAuth.jsx'

const Login = ({ showToast }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      const result = await login(formData.email, formData.password)
      if (result.success) {
        showToast('Login successful!', 'success')
        navigate('/')
      } else {
        showToast(result.message, 'error')
      }
    } catch (error) {
      showToast('Login failed. Please try again.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Helmet>
        <title>Login - ConvertFlix</title>
        <meta name="description" content="Login to your ConvertFlix account to access admin features and track your file processing history." />
      </Helmet>

      <div className="min-h-screen flex items-center justify-center py-12">
        <div className="max-w-md w-full">
          <div className="card">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">Welcome Back</h1>
              <p className="text-text-secondary">
                Login to your ConvertFlix account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full"
                  placeholder="Enter your password"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <span className="loading"></span>
                    Logging in...
                  </>
                ) : (
                  'Login'
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-text-secondary">
                Don't have an account?{' '}
                <Link to="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Login 