import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import FileUpload from '../components/FileUpload'
import { convertAPI } from '../services/api'

const ConvertVideo = ({ showToast }) => {
  const [targetFormat, setTargetFormat] = useState('mp4')
  const supportedFormats = ['mp4', 'avi', 'mov', 'webm', 'mkv']
  const targetFormats = ['mp4', 'avi', 'mov', 'webm']

  const handleProcess = async (formData) => {
    formData.append('targetFormat', targetFormat)
    return await convertAPI.video(formData)
  }

  return (
    <>
      <Helmet>
        <title>Convert Video - Free Online Video Format Converter | ConvertFlix</title>
        <meta name="description" content="Free online video format converter. Convert between MP4, AVI, MOV, and WebM formats." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🎬 Convert Video
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Convert videos between different formats.
            </p>
          </div>

          <div className="max-w-md mx-auto mb-8">
            <label className="block text-sm font-medium mb-2">
              Target Format
            </label>
            <select
              value={targetFormat}
              onChange={(e) => setTargetFormat(e.target.value)}
              className="w-full"
            >
              {targetFormats.map(format => (
                <option key={format} value={format}>
                  {format.toUpperCase()}
                </option>
              ))}
            </select>
          </div>

          <FileUpload
            fileType="video"
            operation="Video Conversion"
            supportedFormats={supportedFormats}
            onProcess={handleProcess}
            showToast={showToast}
          />
        </div>
      </div>
    </>
  )
}

export default ConvertVideo 