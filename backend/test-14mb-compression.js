const fs = require('fs').promises;
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegStatic);

async function test14MBCompression() {
  console.log('🧪 Testing 14MB Video Compression...\n');
  
  // Test file path (use an existing video file)
  const testVideoPath = path.join('uploads', 'video-1752964952550-756079925.mp4');
  
  try {
    // Check if test file exists
    const stats = await fs.stat(testVideoPath);
    const fileSizeMB = (stats.size / 1024 / 1024).toFixed(2);
    console.log(`📹 Test video found: ${fileSizeMB} MB`);
    
    if (stats.size < 10 * 1024 * 1024) {
      console.log('⚠️ File is smaller than 10MB, using a larger file for testing');
    }
    
    // Test compression with aggressive settings for large files
    console.log('\n🔧 Testing Aggressive Compression for Large Files');
    const compressedPath = path.join('uploads', 'test-14mb-compressed.mp4');
    
    await new Promise((resolve, reject) => {
      ffmpeg(testVideoPath)
        .videoCodec('libx264')
        .audioCodec('aac')
        .audioBitrate('96k')
        .outputOptions([
          '-crf 30',  // Aggressive CRF
          '-preset medium',
          '-movflags +faststart',
          '-vf scale=iw*0.8:ih*0.8',  // Less aggressive scaling
          '-b:v 800k',  // Lower bitrate
          '-maxrate 1200k',
          '-bufsize 2000k'
        ])
        .output(compressedPath)
        .on('start', (commandLine) => {
          console.log('FFmpeg command:', commandLine);
        })
        .on('end', async () => {
          try {
            const compressedStats = await fs.stat(compressedPath);
            const compressionRatio = ((stats.size - compressedStats.size) / stats.size * 100).toFixed(2);
            
            console.log(`✅ Compression completed:`);
            console.log(`   Original: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
            console.log(`   Compressed: ${(compressedStats.size / 1024 / 1024).toFixed(2)} MB`);
            console.log(`   Reduction: ${compressionRatio}%`);
            
            // Test enhancement
            console.log('\n✨ Testing Enhancement');
            const enhancedPath = path.join('uploads', 'test-14mb-enhanced.mp4');
            
            await new Promise((resolveEnhance, rejectEnhance) => {
              ffmpeg(compressedPath)
                .videoCodec('libx264')
                .audioCodec('aac')
                .audioBitrate('96k')
                .outputOptions([
                  '-crf 28',
                  '-preset medium',
                  '-movflags +faststart',
                  '-vf eq=contrast=1.1:saturation=1.2',
                  '-af volume=1.1',
                  '-b:v 700k',
                  '-maxrate 1000k',
                  '-bufsize 2000k'
                ])
                .output(enhancedPath)
                .on('end', async () => {
                  try {
                    const enhancedStats = await fs.stat(enhancedPath);
                    const finalRatio = ((stats.size - enhancedStats.size) / stats.size * 100).toFixed(2);
                    const enhancementReduction = ((compressedStats.size - enhancedStats.size) / compressedStats.size * 100).toFixed(2);
                    
                    console.log(`✅ Enhancement completed:`);
                    console.log(`   Compressed: ${(compressedStats.size / 1024 / 1024).toFixed(2)} MB`);
                    console.log(`   Enhanced: ${(enhancedStats.size / 1024 / 1024).toFixed(2)} MB`);
                    console.log(`   Enhancement reduction: ${enhancementReduction}%`);
                    console.log(`   Total reduction: ${finalRatio}%`);
                    
                    // Cleanup
                    await fs.unlink(compressedPath);
                    await fs.unlink(enhancedPath);
                    
                    console.log('\n🎉 14MB compression test completed successfully!');
                    resolveEnhance();
                  } catch (error) {
                    rejectEnhance(error);
                  }
                })
                .on('error', (error) => {
                  console.error('❌ Enhancement failed:', error);
                  rejectEnhance(error);
                })
                .run();
            });
            
            resolve();
          } catch (error) {
            reject(error);
          }
        })
        .on('error', (error) => {
          console.error('❌ Compression failed:', error);
          reject(error);
        })
        .run();
    });
    
  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

// Run the test
test14MBCompression(); 