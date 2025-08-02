import React from 'react';

const QualitySelector = ({ quality, onQualityChange }) => {
  return (
    <div className="quality-selector">
      <label htmlFor="quality-range">Quality: {quality}%</label>
      <input
        id="quality-range"
        type="range"
        min="1"
        max="100"
        value={quality}
        onChange={(e) => onQualityChange(parseInt(e.target.value))}
        className="quality-slider"
      />
    </div>
  );
};

export default QualitySelector; 