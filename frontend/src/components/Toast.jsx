import React, { useEffect } from 'react'

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose()
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅'
      case 'error':
        return '❌'
      case 'warning':
        return '⚠️'
      default:
        return 'ℹ️'
    }
  }

  return (
    <div className={`toast ${type}`}>
      <div className="flex items-center gap-2">
        <span className="text-lg">{getIcon()}</span>
        <span>{message}</span>
        <button
          onClick={onClose}
          className="ml-auto text-white/80 hover:text-white transition-colors"
          aria-label="Close notification"
        >
          ✕
        </button>
      </div>
    </div>
  )
}

export default Toast 