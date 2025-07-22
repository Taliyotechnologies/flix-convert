# Multi-Tool Conversion Setup Guide

## Required Tools Installation

### 1. FFmpeg (Already included via npm)
```bash
# Already installed via ffmpeg-static package
npm install ffmpeg-static
```

### 2. ImageMagick Installation

#### Windows:
```bash
# Download from: https://imagemagick.org/script/download.php#windows
# Or use Chocolatey:
choco install imagemagick

# Or use winget:
winget install ImageMagick.ImageMagick
```

#### macOS:
```bash
brew install imagemagick
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install imagemagick
```

### 3. LibreOffice Installation

#### Windows:
```bash
# Download from: https://www.libreoffice.org/download/download/
# Or use Chocolatey:
choco install libreoffice-still
```

#### macOS:
```bash
brew install --cask libreoffice
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install libreoffice
```

### 4. Pandoc Installation

#### Windows:
```bash
# Download from: https://pandoc.org/installing.html
# Or use Chocolatey:
choco install pandoc
```

#### macOS:
```bash
brew install pandoc
```

#### Linux (Ubuntu/Debian):
```bash
sudo apt-get update
sudo apt-get install pandoc
```

## Verification Commands

Check if tools are installed correctly:

```bash
# Check FFmpeg
ffmpeg -version

# Check ImageMagick
magick -version

# Check LibreOffice
soffice --version

# Check Pandoc
pandoc --version
```

## Tool Capabilities

### ImageMagick
- **Formats:** JPG, PNG, WEBP, GIF, BMP, TIFF, SVG, HEIC, ICO, AVIF
- **Features:** High quality, format optimization, metadata preservation

### FFmpeg
- **Video:** MP4, AVI, MOV, WEBM, MKV, FLV, WMV, 3GP, MPEG, MPG, OGV
- **Audio:** MP3, WAV, OGG, AAC, FLAC, M4A, WMA, OPUS, AMR
- **Features:** Professional encoding, quality optimization

### LibreOffice
- **Documents:** PDF, DOCX, TXT, RTF, ODT, HTML, EPUB
- **Spreadsheets:** XLSX, XLS, CSV, ODS
- **Presentations:** PPTX, PPT, ODP
- **Features:** Office suite compatibility, format preservation

### Pandoc
- **Text:** TXT, HTML, RTF, Markdown
- **Features:** Text processing, format conversion

## Fallback System

The system uses intelligent fallbacks:
1. **ImageMagick** → **FFmpeg** (for images)
2. **LibreOffice** → **Pandoc** (for documents)
3. **Error handling** with detailed messages

## Performance Notes

- **FFmpeg:** Fastest for video/audio
- **ImageMagick:** Best for image quality
- **LibreOffice:** Most compatible for office files
- **Pandoc:** Lightweight for text processing 