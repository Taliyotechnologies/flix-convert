import React, { useState, useEffect } from 'react';
import './FileConverter.css';
import axios from 'axios';

const FORMAT_OPTIONS = {
  image: [
    { value: 'jpg', label: 'JPG' },
    { value: 'jpeg', label: 'JPEG' },
    { value: 'png', label: 'PNG' },
    { value: 'webp', label: 'WEBP' },
    { value: 'gif', label: 'GIF' },
    { value: 'bmp', label: 'BMP' },
    { value: 'tiff', label: 'TIFF' },
    { value: 'heic', label: 'HEIC' },
    { value: 'ico', label: 'ICO' },
    { value: 'avif', label: 'AVIF' },
    { value: 'pdf', label: 'PDF' },
  ],
  video: [
    { value: 'mp4', label: 'MP4' },
    { value: 'avi', label: 'AVI' },
    { value: 'mov', label: 'MOV' },
    { value: 'webm', label: 'WEBM' },
    { value: 'mkv', label: 'MKV' },
    { value: 'flv', label: 'FLV' },
    { value: 'wmv', label: 'WMV' },
    { value: '3gp', label: '3GP' },
    { value: 'mpeg', label: 'MPEG' },
    { value: 'mpg', label: 'MPG' },
    { value: 'ogv', label: 'OGV' },
  ],
  audio: [
    { value: 'mp3', label: 'MP3' },
    { value: 'wav', label: 'WAV' },
    { value: 'ogg', label: 'OGG' },
    { value: 'aac', label: 'AAC' },
    { value: 'flac', label: 'FLAC' },
    { value: 'm4a', label: 'M4A' },
    { value: 'wma', label: 'WMA' },
    { value: 'opus', label: 'OPUS' },
    { value: 'amr', label: 'AMR' },
  ],
  document: [
    { value: 'pdf', label: 'PDF' },
    { value: 'docx', label: 'DOCX' },
    { value: 'txt', label: 'TXT' },
    { value: 'rtf', label: 'RTF' },
    { value: 'odt', label: 'ODT' },
    { value: 'html', label: 'HTML' },
    { value: 'epub', label: 'EPUB' },
  ],
  excel: [
    { value: 'xlsx', label: 'XLSX' },
    { value: 'xls', label: 'XLS' },
    { value: 'csv', label: 'CSV' },
    { value: 'pdf', label: 'PDF' },
    { value: 'ods', label: 'ODS' },
  ],
  presentation: [
    { value: 'pptx', label: 'PPTX' },
    { value: 'ppt', label: 'PPT' },
    { value: 'pdf', label: 'PDF' },
    { value: 'odp', label: 'ODP' },
  ],
  text: [
    { value: 'pdf', label: 'PDF' },
    { value: 'docx', label: 'DOCX' },
    { value: 'txt', label: 'TXT' },
    { value: 'rtf', label: 'RTF' },
    { value: 'odt', label: 'ODT' },
    { value: 'html', label: 'HTML' },
  ],
  other: [
    { value: 'pdf', label: 'PDF' },
    { value: 'zip', label: 'ZIP' },
    { value: 'tar', label: 'TAR' },
    { value: '7z', label: '7Z' },
  ],
};

function detectFileType(file) {
  if (!file) return null;
  const mime = file.type;
  if (mime.startsWith('image/')) return 'image';
  if (mime.startsWith('video/')) return 'video';
  if (mime.startsWith('audio/')) return 'audio';
  if (mime === 'application/pdf') return 'document';
  if (mime.includes('excel') || file.name.match(/\.(xls|xlsx|csv)$/i)) return 'excel';
  if (mime.includes('presentation') || file.name.match(/\.(ppt|pptx)$/i)) return 'presentation';
  if (mime.startsWith('text/') || file.name.match(/\.(txt|md)$/i)) return 'text';
  if (mime.includes('word') || file.name.match(/\.(doc|docx)$/i)) return 'document';
  return 'other';
}

export default function FileConverter() {
  const [files, setFiles] = useState([]);
  const [fileTypes, setFileTypes] = useState([]);
  const [convertTo, setConvertTo] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [convertResult, setConvertResult] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [conversionProgress, setConversionProgress] = useState({});
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => {
    function handleDragOver(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(true);
    }
    function handleDragLeave(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
    }
    function handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleFileDrop(e.dataTransfer.files);
      }
    }
    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);
    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, []);

  function handleFileDrop(fileList) {
    const selected = Array.from(fileList);
    setFiles(selected);
    setConvertTo('');
    setDropdownOpen(false);
    setConvertResult(null);
    setFileTypes(selected.map(f => detectFileType(f)));
    setConversionProgress({});
  }

  function handleFileChange(e) {
    const selected = Array.from(e.target.files);
    setFiles(selected);
    setConvertTo('');
    setDropdownOpen(false);
    setConvertResult(null);
    setFileTypes(selected.map(f => detectFileType(f)));
    setConversionProgress({});
  }

  // Determine allowed convert options
  let options = [];
  if (files.length > 0) {
    const uniqueTypes = Array.from(new Set(fileTypes));
    if (uniqueTypes.length === 1) {
      // All files same type
      options = FORMAT_OPTIONS[uniqueTypes[0]] || [];
    } else {
      // Mixed types: only show formats possible for all (e.g. PDF)
      const allOptions = uniqueTypes.map(t => FORMAT_OPTIONS[t] || []);
      const intersect = allOptions.reduce((acc, arr) => acc.filter(o => arr.some(a => a.value === o.value)), allOptions[0] || []);
      options = intersect;
    }
  }

  async function convertFile(file, outputFormat) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('outputFormat', outputFormat);

    try {
      const response = await axios.post('http://localhost:5000/api/convert/convert', formData);
      return response.data;
    } catch (error) {
      const errorMessage = error.response?.data?.details || error.response?.data?.error || 'Conversion failed';
      // Provide more specific error messages based on the error
      if (errorMessage.includes('LibreOffice is not installed')) {
        throw new Error('Advanced document conversion requires LibreOffice. Basic conversions are still available. You can install LibreOffice from: https://www.libreoffice.org/download/download/');
      } else if (errorMessage.includes('Pandoc is not installed') || errorMessage.includes('Advanced text conversion requires Pandoc')) {
        throw new Error('Text conversion completed with basic formatting. For advanced text conversions, install Pandoc from: https://pandoc.org/installing.html');
      } else if (errorMessage.includes('valid image format')) {
        throw new Error('Please ensure the file is a valid image format. Supported formats: JPG, PNG, WEBP, GIF, BMP, TIFF, HEIC, ICO, AVIF');
      } else if (errorMessage.includes('valid video format')) {
        throw new Error('Please ensure the file is a valid video format. Supported formats: MP4, AVI, MOV, WEBM, MKV, FLV, WMV, 3GP, MPEG, MPG, OGV');
      } else if (errorMessage.includes('valid audio format')) {
        throw new Error('Please ensure the file is a valid audio format. Supported formats: MP3, WAV, OGG, AAC, FLAC, M4A, WMA, OPUS, AMR');
      } else {
        throw new Error(errorMessage);
      }
    }
  }

  async function handleConvert() {
    if (files.length === 0 || !convertTo) return;

    setIsConverting(true);
    setConversionProgress({});
    setConvertResult(null);

    const results = {
      converted: [],
      skipped: [],
      errors: []
    };

    // Convert each file individually
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const fileType = fileTypes[i];
      
      // Check if conversion is possible
      const allowedTypes = Object.keys(FORMAT_OPTIONS).filter(type => 
        (FORMAT_OPTIONS[type] || []).some(opt => opt.value === convertTo)
      );
      
      if (!allowedTypes.includes(fileType)) {
        results.skipped.push(file);
        continue;
      }

      // Update progress
      setConversionProgress(prev => ({
        ...prev,
        [file.name]: 'Converting...'
      }));

      try {
        const result = await convertFile(file, convertTo);
        
        // Create download link
        const downloadUrl = `http://localhost:5000/api/convert/download/${result.fileName}`;
        const downloadResponse = await axios.get(downloadUrl, { responseType: 'blob' });
        const blob = downloadResponse.data;
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = result.fileName;
        downloadLink.style.display = 'none';
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        results.converted.push({
          ...file,
          convertedName: result.fileName,
          downloadUrl: result.downloadUrl
        });

        setConversionProgress(prev => ({
          ...prev,
          [file.name]: 'Converted successfully!'
        }));

      } catch (error) {
        console.error(`Error converting ${file.name}:`, error);
        results.errors.push({
          file,
          error: error.message
        });

        setConversionProgress(prev => ({
          ...prev,
          [file.name]: `Error: ${error.message}`
        }));
      }
    }

    setConvertResult(results);
    setIsConverting(false);
  }

  return (
    <main className="file-converter-main">
      {dragActive && (
        <div className="file-converter-drag-overlay">
          <div className="file-converter-drag-message">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#6c63ff" strokeWidth="2"><path d="M12 19V6M5 12l7-7 7 7"/></svg>
            <span>Drop files to upload</span>
          </div>
        </div>
      )}
      <section className="file-converter-hero card">
        <h1 className="file-converter-title">File Converter</h1>
        <p className="file-converter-desc">Convert and compress a wide range of file types instantly. Upload your file and choose the format you want to convert to.</p>
        <div className="file-converter-upload">
          <div className="file-converter-drag-hint">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#6c63ff" strokeWidth="2"><path d="M12 19V6M5 12l7-7 7 7"/></svg>
            <span>Drag & drop files here</span>
            <label htmlFor="file-upload" className="file-upload-label file-upload-label-inside">Select Files</label>
            <input
              id="file-upload"
              type="file"
              multiple
              className="file-upload-input"
              onChange={handleFileChange}
            />
          </div>
          {files.length > 0 && (
            <div className="file-converter-fileinfo">
              {files.map((f, i) => (
                <span key={f.name + i} className="file-converter-filebadge">
                  <span className="file-name">{f.name}</span>
                  {fileTypes[i] && (
                    <span className={`file-type-badge file-type-${fileTypes[i]}`}>
                      {fileTypes[i].charAt(0).toUpperCase() + fileTypes[i].slice(1)}
                    </span>
                  )}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="file-converter-options">
          <span>Convert to:</span>
          <div
            className={`file-converter-custom-select${dropdownOpen ? ' open' : ''}${files.length === 0 ? ' disabled' : ''}`}
            tabIndex={0}
            onClick={() => files.length > 0 && setDropdownOpen(v => !v)}
            onBlur={() => setDropdownOpen(false)}
          >
            <div className="file-converter-custom-selected">
              {convertTo ? options.find(opt => opt.value === convertTo)?.label : 'Select format'}
              <span className="file-converter-custom-arrow">▼</span>
            </div>
            {dropdownOpen && (
              <div className="file-converter-custom-options">
                {options.map(opt => (
                  <div
                    key={opt.value}
                    className={`file-converter-custom-option${convertTo === opt.value ? ' selected' : ''}`}
                    onClick={e => {
                      setConvertTo(opt.value);
                      setDropdownOpen(false);
                      setTimeout(() => {
                        if (e && e.target && e.target.closest('.file-converter-custom-select')) {
                          e.target.closest('.file-converter-custom-select').blur();
                        }
                      }, 0);
                    }}
                  >
                    {opt.label}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <button 
          className="file-converter-btn" 
          disabled={files.length === 0 || !convertTo || isConverting} 
          onClick={handleConvert}
        >
          {isConverting ? 'Converting...' : 'Convert & Download'}
        </button>
        
        {/* Conversion Progress */}
        {Object.keys(conversionProgress).length > 0 && (
          <div className="file-converter-progress">
            {Object.entries(conversionProgress).map(([fileName, status]) => (
              <div key={fileName} className="file-converter-progress-item">
                <span className="file-converter-progress-name">{fileName}</span>
                <span className={`file-converter-progress-status ${
                  status.includes('Error') ? 'error' : 
                  status.includes('successfully') ? 'success' : 'converting'
                }`}>
                  {status}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Conversion Results */}
        {convertResult && (
          <div className="file-converter-result">
            {convertResult.converted.length > 0 && (
              <div className="file-converter-success">
                <h3>Successfully Converted:</h3>
                <ul>
                  {convertResult.converted.map((file, index) => (
                    <li key={index}>
                      {file.name} → {file.convertedName}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {convertResult.skipped.length > 0 && (
              <div className="file-converter-skipped">
                <h3>Skipped (not convertible to {convertTo.toUpperCase()}):</h3>
                <ul>
                  {convertResult.skipped.map((file, index) => (
                    <li key={index}>{file.name}</li>
                  ))}
                </ul>
              </div>
            )}
            {convertResult.errors.length > 0 && (
              <div className="file-converter-error">
                <h3>Errors:</h3>
                <ul>
                  {convertResult.errors.map((item, index) => (
                    <li key={index}>
                      {item.file.name}: {item.error}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </section>
      <section className="file-converter-info card">
        <h2 className="file-converter-info-title">Why use our File Converter?</h2>
        <div className="file-converter-features-grid">
          <div className="file-converter-feature-card">Auto-detects file type and shows only relevant convert options</div>
          <div className="file-converter-feature-card">Supports images, documents, audio, video, excel, presentations, and more</div>
          <div className="file-converter-feature-card">Fast, secure, and privacy-first processing</div>
          <div className="file-converter-feature-card">No quality loss during conversion</div>
          <div className="file-converter-feature-card">Works on any device, no sign-up required</div>
          <div className="file-converter-feature-card">Professional-grade conversion technology</div>
        </div>
      </section>
    </main>
  );
} 