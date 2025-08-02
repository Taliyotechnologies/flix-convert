import React from 'react';

const FormatSelector = ({ type, format, onFormatChange, supportedFormats }) => {
  return (
    <div className="format-selector">
      <label htmlFor="format-select">Output Format:</label>
      <select
        id="format-select"
        value={format}
        onChange={(e) => onFormatChange(e.target.value)}
        className="input"
      >
        <option value="">Keep original format</option>
        {supportedFormats.map((fmt) => (
          <option key={fmt} value={fmt}>
            {fmt.toUpperCase()}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormatSelector; 