import React from 'react'
import { Helmet } from 'react-helmet-async'
import FileUpload from '../components/FileUpload'
import { compressAPI } from '../services/api'

const CompressVideo = ({ showToast }) => {
  const supportedFormats = ['mp4', 'avi', 'mov', 'webm', 'mkv']

  const handleProcess = async (formData) => {
    return await compressAPI.video(formData)
  }

  return (
    <>
      <Helmet>
        <title>Compress Video - Free Online Video Compression Tool | ConvertFlix</title>
        <meta name="description" content="Free online video compression tool. Reduce video file size while maintaining quality. Support MP4, AVI, MOV, and WebM formats." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🎥 Compress Video
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Reduce video file size while maintaining quality. 
              Support for MP4, AVI, MOV, and WebM formats.
            </p>
          </div>

          <FileUpload
            fileType="video"
            operation="Video Compression"
            supportedFormats={supportedFormats}
            onProcess={handleProcess}
            showToast={showToast}
          />
        </div>
      </div>
    </>
  )
}

export default CompressVideo 