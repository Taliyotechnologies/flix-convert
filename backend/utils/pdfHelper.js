const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');

class PDFHelper {
  static async compressPDF(inputPath, outputPath, originalSize) {
    try {
      // Read the PDF file
      const pdfBytes = await fs.readFile(inputPath);
      
      // Load the PDF document
      const pdfDoc = await PDFDocument.load(pdfBytes);
      
      // Get all pages
      const pages = pdfDoc.getPages();
      
      // Create a new PDF document
      const newPdfDoc = await PDFDocument.create();
      
      // Copy pages to new document with compression
      for (let i = 0; i < pages.length; i++) {
        const [copiedPage] = await newPdfDoc.copyPages(pdfDoc, [i]);
        newPdfDoc.addPage(copiedPage);
      }
      
      // Save the compressed PDF
      const compressedBytes = await newPdfDoc.save({
        useObjectStreams: true,
        addDefaultPage: false
      });
      
      // Write compressed file
      await fs.writeFile(outputPath, compressedBytes);
      
      const compressedSize = compressedBytes.length;
      const compressionRatio = ((originalSize - compressedSize) / originalSize) * 100;
      
      // Only return compressed file if compression is at least 40% or size is reduced
      if (compressionRatio >= 40 || compressedSize < originalSize) {
        return {
          success: true,
          compressedSize,
          compressionRatio,
          outputPath
        };
      } else {
        // If compression doesn't meet requirements, return original
        await fs.copyFile(inputPath, outputPath);
        return {
          success: true,
          compressedSize: originalSize,
          compressionRatio: 0,
          outputPath
        };
      }
      
    } catch (error) {
      throw new Error(`PDF compression failed: ${error.message}`);
    }
  }
  
  static async getPDFInfo(filePath) {
    try {
      const pdfBytes = await fs.readFile(filePath);
      const pdfDoc = await PDFDocument.load(pdfBytes);
      
      return {
        pageCount: pdfDoc.getPageCount(),
        title: pdfDoc.getTitle() || 'Untitled',
        author: pdfDoc.getAuthor() || 'Unknown',
        subject: pdfDoc.getSubject() || '',
        keywords: pdfDoc.getKeywords() || []
      };
    } catch (error) {
      throw new Error(`Failed to get PDF info: ${error.message}`);
    }
  }
}

module.exports = PDFHelper;