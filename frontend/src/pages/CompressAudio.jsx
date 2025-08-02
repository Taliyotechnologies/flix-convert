import React from 'react'
import { Helmet } from 'react-helmet-async'
import FileUpload from '../components/FileUpload'
import { compressAPI } from '../services/api'

const CompressAudio = ({ showToast }) => {
  const supportedFormats = ['mp3', 'aac', 'ogg', 'wav', 'flac']

  const handleProcess = async (formData) => {
    return await compressAPI.audio(formData)
  }

  return (
    <>
      <Helmet>
        <title>Compress Audio - Free Online Audio Compression Tool | ConvertFlix</title>
        <meta name="description" content="Free online audio compression tool. Reduce audio file size while maintaining quality." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🎵 Compress Audio
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Reduce audio file size while maintaining quality.
            </p>
          </div>

          <FileUpload
            fileType="audio"
            operation="Audio Compression"
            supportedFormats={supportedFormats}
            onProcess={handleProcess}
            showToast={showToast}
          />
        </div>
      </div>
    </>
  )
}

export default CompressAudio 