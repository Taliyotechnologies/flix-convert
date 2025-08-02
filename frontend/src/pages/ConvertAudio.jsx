import React, { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import FileUpload from '../components/FileUpload'
import { convertAPI } from '../services/api'

const ConvertAudio = ({ showToast }) => {
  const [targetFormat, setTargetFormat] = useState('mp3')
  const supportedFormats = ['mp3', 'aac', 'ogg', 'wav', 'flac']
  const targetFormats = ['mp3', 'aac', 'ogg', 'wav', 'flac']

  const handleProcess = async (formData) => {
    formData.append('targetFormat', targetFormat)
    return await convertAPI.audio(formData)
  }

  return (
    <>
      <Helmet>
        <title>Convert Audio - Free Online Audio Format Converter | ConvertFlix</title>
        <meta name="description" content="Free online audio format converter. Convert between MP3, AAC, OGG, WAV, and FLAC formats." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🎧 Convert Audio
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Convert audio files between different formats.
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
            fileType="audio"
            operation="Audio Conversion"
            supportedFormats={supportedFormats}
            onProcess={handleProcess}
            showToast={showToast}
          />
        </div>
      </div>
    </>
  )
}

export default ConvertAudio 