import React from 'react'
import { Helmet } from 'react-helmet-async'
import FileUpload from '../components/FileUpload'
import { convertAPI } from '../services/api'

const ConvertPDF = ({ showToast }) => {
  const supportedFormats = ['pdf']

  const handleProcess = async (formData) => {
    return await convertAPI.pdf(formData)
  }

  return (
    <>
      <Helmet>
        <title>Convert PDF - Free Online PDF Processor | ConvertFlix</title>
        <meta name="description" content="Free online PDF processor. Optimize and compress PDF files." />
      </Helmet>

      <div className="min-h-screen py-12">
        <div className="container">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              📋 Convert PDF
            </h1>
            <p className="text-xl text-text-secondary max-w-2xl mx-auto">
              Process and optimize PDF files.
            </p>
          </div>

          <FileUpload
            fileType="pdf"
            operation="PDF Processing"
            supportedFormats={supportedFormats}
            onProcess={handleProcess}
            showToast={showToast}
          />
        </div>
      </div>
    </>
  )
}

export default ConvertPDF 