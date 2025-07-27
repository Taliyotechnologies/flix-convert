import apiService from './api';

export interface Tool {
  id: string;
  name: string;
  description: string;
  supportedFormats: string[];
}

export interface UploadResponse {
  message: string;
  filename: string;
  originalName: string;
  size: number;
}

export interface ConversionRequest {
  filename: string;
  targetFormat: string;
}

export interface ConversionResponse {
  message: string;
  convertedFile: string;
}

class ToolsService {
  // Get available tools
  async getAvailableTools(): Promise<Tool[]> {
    return apiService.get<Tool[]>('/tools/available');
  }

  // Upload file
  async uploadFile(file: File): Promise<UploadResponse> {
    return apiService.uploadFile<UploadResponse>('/tools/upload', file);
  }

  // Convert file
  async convertFile(data: ConversionRequest): Promise<ConversionResponse> {
    return apiService.post<ConversionResponse>('/tools/convert', data);
  }

  // Get file download URL
  getFileDownloadUrl(filename: string): string {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    return `${baseUrl}/uploads/${filename}`;
  }

  // Validate file type
  validateFileType(file: File, allowedTypes: string[]): boolean {
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    return fileExtension ? allowedTypes.includes(fileExtension) : false;
  }

  // Get file size in MB
  getFileSizeMB(file: File): number {
    return file.size / (1024 * 1024);
  }

  // Check if file size is within limit (default 10MB)
  isFileSizeValid(file: File, maxSizeMB: number = 10): boolean {
    return this.getFileSizeMB(file) <= maxSizeMB;
  }
}

export const toolsService = new ToolsService();
export default toolsService; 