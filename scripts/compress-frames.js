const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const framesJsonPath = path.join(__dirname, '../app/bg-frames.json');
const bgDir = path.join(__dirname, '../public/asset/bg');

async function run() {
  console.log('Starting image compression & downsampling...');

  // 1. Read the list of frame names
  const framesRaw = fs.readFileSync(framesJsonPath, 'utf8');
  const frames = JSON.parse(framesRaw);
  console.log(`Original frame count: ${frames.length}`);

  // 2. Keep only every 2nd frame (reduce frames by 50%)
  const optimizedFrames = frames.filter((_, i) => i % 2 === 0);
  console.log(`Optimized frame count: ${optimizedFrames.length}`);

  // Determine which frames to delete (odd index frames)
  const deletedFrames = frames.filter((_, i) => i % 2 !== 0);

  // 3. Process each kept frame (resize and compress)
  const tempDir = path.join(bgDir, 'temp_optimized');
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  for (let i = 0; i < optimizedFrames.length; i++) {
    const filename = optimizedFrames[i];
    const srcPath = path.join(bgDir, filename);
    const destPath = path.join(tempDir, filename);

    if (fs.existsSync(srcPath)) {
      try {
        await sharp(srcPath)
          .resize(1024) // Resize width to 1024px, maintain aspect ratio
          .webp({ quality: 50, effort: 4 }) // Compress with 50% WebP quality
          .toFile(destPath);
        
        if (i % 20 === 0) {
          console.log(`Compressed ${i}/${optimizedFrames.length} frames...`);
        }
      } catch (err) {
        console.error(`Failed to compress frame ${filename}:`, err);
      }
    }
  }

  console.log('Moving optimized frames to main folder and cleaning up...');

  // Delete all original frames in bgDir that are not in optimizedFrames
  for (const filename of frames) {
    const filePath = path.join(bgDir, filename);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  }

  // Move temp optimized frames back to main folder
  const tempFiles = fs.readdirSync(tempDir);
  for (const filename of tempFiles) {
    const srcPath = path.join(tempDir, filename);
    const destPath = path.join(bgDir, filename);
    fs.renameSync(srcPath, destPath);
  }

  // Delete temp folder
  fs.rmdirSync(tempDir);

  // 4. Overwrite app/bg-frames.json with the optimized list
  fs.writeFileSync(framesJsonPath, JSON.stringify(optimizedFrames), 'utf8');

  console.log('Frame compression completed successfully!');
}

run().catch(console.error);
