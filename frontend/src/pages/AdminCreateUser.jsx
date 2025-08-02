import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../hooks/useAuth'

const AdminCreateUser = ({ showToast }) => {
  const { isAdmin, createUser } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    role: 'user'
  })
  const [isLoading, setIsLoading] = useState(false)

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
      const result = await createUser(formData.email, formData.password, formData.role)
      if (result.success) {
        showToast('User created successfully!', 'success')
        setFormData({ email: '', password: '', role: 'user' })
      } else {
        showToast(result.message, 'error')
      }
    } catch (error) {
      showToast('Failed to create user', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Access Denied</h1>
          <p className="text-text-secondary">Admin privileges required.</p>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet>
        <title>Create User - ConvertFlix Admin</title>
        <meta name="description" content="Create new users in ConvertFlix admin panel." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container">
          <div className="max-w-md mx-auto">
            <div className="card">
              <div className="text-center mb-8">
                <h1 className="text-3xl font-bold mb-2">Create User</h1>
                <p className="text-text-secondary">
                  Create a new user account
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
                    placeholder="Enter email address"
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
                    placeholder="Enter password"
                  />
                </div>

                <div>
                  <label htmlFor="role" className="block text-sm font-medium mb-2">
                    Role
                  </label>
                  <select
                    id="role"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full"
                  >
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn btn-primary w-full disabled:opacity-50"
                >
                  {isLoading ? (
                    <>
                      <span className="loading"></span>
                      Creating user...
                    </>
                  ) : (
                    'Create User'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AdminCreateUser 