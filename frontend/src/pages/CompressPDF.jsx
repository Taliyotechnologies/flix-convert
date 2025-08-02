import React from 'react'
import { Helmet } from 'react-helmet-async'
import FileUpload from '../components/FileUpload'
import { compressAPI } from '../services/api'

const CompressPDF = ({ showToast }) => {
  const supportedFormats = ['pdf']

  const handleProcess = async (formData) => {
    return await compressAPI.pdf(formData)
  }

  return (
    <>
      <Helmet>
        <title>Compress PDF - Free Online PDF Compression Tool | ConvertFlix</title>
        <meta name="description" content="Free online PDF compression tool. Reduce PDF file size while maintaining quality." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              📄 Compress PDF
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Reduce PDF file size while maintaining quality.
            </p>
          </div>

          <FileUpload
            fileType="pdf"
            operation="PDF Compression"
            supportedFormats={supportedFormats}
            onProcess={handleProcess}
            showToast={showToast}
          />
        </div>
      </div>
    </>
  )
}

export default CompressPDF 