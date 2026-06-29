import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const assetsDir = path.join(__dirname, 'src', 'assets');

async function compressImage(filePath) {
  const oldSize = fs.statSync(filePath).size;
  const filename = path.basename(filePath);

  // Skip files already under 150KB
  if (oldSize < 150 * 1024) {
    console.log(`Skipping ${filename} (${(oldSize / 1024).toFixed(1)} KB) - already small`);
    return;
  }

  try {
    const ext = path.extname(filePath).toLowerCase();
    const tempPath = filePath + '.tmp';

    let pipeline = sharp(filePath);
    const metadata = await pipeline.metadata();

    const maxDim = 1200;
    let width = metadata.width;
    let height = metadata.height;

    // Resize if too large
    if (width > maxDim || height > maxDim) {
      if (width > height) {
        height = Math.round(height * (maxDim / width));
        width = maxDim;
      } else {
        width = Math.round(width * (maxDim / height));
        height = maxDim;
      }
      pipeline = pipeline.resize(width, height, { fit: 'inside' });
      console.log(`Resizing ${filename} to ${width}x${height}`);
    }

    // Apply format-specific compression
    if (ext === '.png') {
      // Use palette-based compression (indexed color) for massive PNG size reduction
      pipeline = pipeline.png({ palette: true, quality: 80, effort: 6 });
    } else if (ext === '.jpg' || ext === '.jpeg') {
      pipeline = pipeline.jpeg({ quality: 80, progressive: true });
    } else {
      console.log(`Unsupported extension for ${filename}: ${ext}`);
      return;
    }

    await pipeline.toFile(tempPath);

    // Replace original file with the compressed one
    fs.renameSync(tempPath, filePath);

    const newSize = fs.statSync(filePath).size;
    const reduction = ((oldSize - newSize) / oldSize) * 100;
    console.log(`Compressed ${filename}: ${(oldSize / 1024 / 1024).toFixed(2)} MB -> ${(newSize / 1024).toFixed(1)} KB (${reduction.toFixed(1)}% reduction)`);
  } catch (err) {
    console.error(`Error compressing ${filename}:`, err.message);
  }
}

async function main() {
  console.log(`Scanning directory: ${assetsDir}`);
  if (!fs.existsSync(assetsDir)) {
    console.error('Error: src/assets directory not found.');
    return;
  }

  const files = fs.readdirSync(assetsDir);
  for (const file of files) {
    const filePath = path.join(assetsDir, file);
    if (fs.statSync(filePath).isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (['.png', '.jpg', '.jpeg'].includes(ext)) {
        await compressImage(filePath);
      }
    }
  }
  console.log('All operations complete.');
}

main();
