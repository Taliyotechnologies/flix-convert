import { useState } from 'react';
import { Search, Download, Trash2, Filter, BarChart3, PieChart, FileText, Image, Video, Music } from 'lucide-react';
import './Dashboard.css';

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [selectedFiles, setSelectedFiles] = useState([]);

  // Mock data
  const fileLogs = [
    {
      id: 1,
      name: 'image1.jpg',
      type: 'image',
      originalSize: '2.5MB',
      compressedSize: '1.2MB',
      saved: '52%',
      date: '2024-01-15',
      status: 'completed'
    },
    {
      id: 2,
      name: 'video1.mp4',
      type: 'video',
      originalSize: '15.8MB',
      compressedSize: '8.9MB',
      saved: '44%',
      date: '2024-01-14',
      status: 'completed'
    },
    {
      id: 3,
      name: 'document.pdf',
      type: 'document',
      originalSize: '3.2MB',
      compressedSize: '1.8MB',
      saved: '44%',
      date: '2024-01-13',
      status: 'completed'
    },
    {
      id: 4,
      name: 'audio1.mp3',
      type: 'audio',
      originalSize: '5.1MB',
      compressedSize: '3.2MB',
      saved: '37%',
      date: '2024-01-12',
      status: 'completed'
    }
  ];

  const stats = {
    totalFiles: 1247,
    totalSaved: '2.3GB',
    averageCompression: '45%',
    fileTypes: {
      images: 45,
      videos: 28,
      documents: 20,
      audio: 7
    }
  };

  const getFileIcon = (type) => {
    switch (type) {
      case 'image':
        return <Image size={16} />;
      case 'video':
        return <Video size={16} />;
      case 'audio':
        return <Music size={16} />;
      case 'document':
        return <FileText size={16} />;
      default:
        return <FileText size={16} />;
    }
  };

  const filteredFiles = fileLogs.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterType === 'all' || file.type === filterType;
    return matchesSearch && matchesFilter;
  });

  const handleSelectAll = () => {
    if (selectedFiles.length === filteredFiles.length) {
      setSelectedFiles([]);
    } else {
      setSelectedFiles(filteredFiles.map(file => file.id));
    }
  };

  const handleSelectFile = (fileId) => {
    setSelectedFiles(prev => 
      prev.includes(fileId) 
        ? prev.filter(id => id !== fileId)
        : [...prev, fileId]
    );
  };

  const handleDeleteSelected = () => {
    if (selectedFiles.length > 0) {
      if (confirm(`Delete ${selectedFiles.length} selected files?`)) {
        // Handle delete logic
        setSelectedFiles([]);
      }
    }
  };

  return (
    <div className="dashboard">
      <div className="container">
        {/* Header */}
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <p>Manage your file processing history and statistics</p>
        </div>

        {/* Stats Cards */}
        <div className="stats-section">
          <div className="stats-grid">
            <div className="stat-card">
              <div className="stat-icon">
                <FileText size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalFiles}</div>
                <div className="stat-label">Total Files</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <Download size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.totalSaved}</div>
                <div className="stat-label">Space Saved</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <BarChart3 size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">{stats.averageCompression}</div>
                <div className="stat-label">Avg Compression</div>
              </div>
            </div>
            <div className="stat-card">
              <div className="stat-icon">
                <PieChart size={24} />
              </div>
              <div className="stat-content">
                <div className="stat-number">4</div>
                <div className="stat-label">File Types</div>
              </div>
            </div>
          </div>
        </div>

        {/* File Type Distribution */}
        <div className="chart-section">
          <h2>File Type Distribution</h2>
          <div className="chart-grid">
            <div className="chart-item">
              <div className="chart-bar" style={{ height: `${stats.fileTypes.images}%` }}>
                <span className="chart-label">Images</span>
                <span className="chart-value">{stats.fileTypes.images}%</span>
              </div>
            </div>
            <div className="chart-item">
              <div className="chart-bar" style={{ height: `${stats.fileTypes.videos}%` }}>
                <span className="chart-label">Videos</span>
                <span className="chart-value">{stats.fileTypes.videos}%</span>
              </div>
            </div>
            <div className="chart-item">
              <div className="chart-bar" style={{ height: `${stats.fileTypes.documents}%` }}>
                <span className="chart-label">Documents</span>
                <span className="chart-value">{stats.fileTypes.documents}%</span>
              </div>
            </div>
            <div className="chart-item">
              <div className="chart-bar" style={{ height: `${stats.fileTypes.audio}%` }}>
                <span className="chart-label">Audio</span>
                <span className="chart-value">{stats.fileTypes.audio}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* File Logs */}
        <div className="logs-section">
          <div className="logs-header">
            <h2>File Processing Logs</h2>
            <div className="logs-controls">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Search files..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="filter-select"
              >
                <option value="all">All Types</option>
                <option value="image">Images</option>
                <option value="video">Videos</option>
                <option value="audio">Audio</option>
                <option value="document">Documents</option>
              </select>
            </div>
          </div>

          <div className="table-container">
            <table className="logs-table">
              <thead>
                <tr>
                  <th>
                    <input
                      type="checkbox"
                      checked={selectedFiles.length === filteredFiles.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th>File</th>
                  <th>Type</th>
                  <th>Original Size</th>
                  <th>Compressed Size</th>
                  <th>Saved</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredFiles.map(file => (
                  <tr key={file.id}>
                    <td>
                      <input
                        type="checkbox"
                        checked={selectedFiles.includes(file.id)}
                        onChange={() => handleSelectFile(file.id)}
                      />
                    </td>
                    <td className="file-name">
                      {getFileIcon(file.type)}
                      {file.name}
                    </td>
                    <td className="file-type">{file.type}</td>
                    <td>{file.originalSize}</td>
                    <td>{file.compressedSize}</td>
                    <td className="saved-amount">{file.saved}</td>
                    <td>{file.date}</td>
                    <td className="actions">
                      <button className="action-btn" title="Download">
                        <Download size={16} />
                      </button>
                      <button className="action-btn delete" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {selectedFiles.length > 0 && (
            <div className="bulk-actions">
              <span>{selectedFiles.length} files selected</span>
              <button className="btn btn-secondary" onClick={handleDeleteSelected}>
                <Trash2 size={16} />
                Delete Selected
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 