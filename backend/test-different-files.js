const fs = require('fs').promises;
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');
const ffmpegStatic = require('ffmpeg-static');

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegStatic);

async function testDifferentFiles() {
  console.log('🧪 Testing Different File Types...\n');
  
  // Test different scenarios
  const testScenarios = [
    {
      name: 'Original Video (11.40 MB)',
      file: 'video-1752964952550-756079925.mp4',
      expectedCompression: true
    },
    {
      name: 'Already Compressed Video',
      file: 'compressed-video-1752965776359-986047911.mp4',
      expectedCompression: false
    },
    {
      name: 'Enhanced Video',
      file: 'enhanced-compressed-video-1752965776359-986047911.mp4',
      expectedCompression: false
    }
  ];
  
  for (const scenario of testScenarios) {
    console.log(`\n📹 Testing: ${scenario.name}`);
    
    const testVideoPath = path.join('uploads', scenario.file);
    
    try {
      // Check if test file exists
      const stats = await fs.stat(testVideoPath);
      const fileSizeMB = (stats.size / 1024 / 1024).toFixed(2);
      console.log(`   File size: ${fileSizeMB} MB`);
      
      // Test compression
      const compressedPath = path.join('uploads', `test-${Date.now()}-compressed.mp4`);
      
      await new Promise((resolve, reject) => {
        ffmpeg(testVideoPath)
          .videoCodec('libx264')
          .audioCodec('aac')
          .audioBitrate('128k')
          .outputOptions([
            '-crf 28',
            '-preset medium',
            '-movflags +faststart',
            '-vf scale=iw*0.8:ih*0.8',
            '-b:v 1000k',
            '-maxrate 1500k',
            '-bufsize 2000k'
          ])
          .output(compressedPath)
          .on('start', (commandLine) => {
            console.log('   FFmpeg command:', commandLine);
          })
          .on('end', async () => {
            try {
              const compressedStats = await fs.stat(compressedPath);
              const compressionRatio = ((stats.size - compressedStats.size) / stats.size * 100).toFixed(2);
              
              console.log(`   ✅ Compression completed:`);
              console.log(`      Original: ${(stats.size / 1024 / 1024).toFixed(2)} MB`);
              console.log(`      Compressed: ${(compressedStats.size / 1024 / 1024).toFixed(2)} MB`);
              console.log(`      Reduction: ${compressionRatio}%`);
              
              // Check if compression was effective
              const isEffective = parseFloat(compressionRatio) > 5;
              const status = isEffective ? '✅ Effective' : '⚠️ Ineffective';
              console.log(`      Status: ${status}`);
              
              // Cleanup
              await fs.unlink(compressedPath);
              
              resolve();
            } catch (error) {
              console.error(`   ❌ Error:`, error.message);
              reject(error);
            }
          })
          .on('error', (error) => {
            console.error(`   ❌ Compression failed:`, error.message);
            reject(error);
          })
          .run();
      });
      
    } catch (error) {
      console.error(`   ❌ File not found or error:`, error.message);
    }
  }
  
  console.log('\n🎉 All tests completed!');
}

// Run the test
testDifferentFiles(); 