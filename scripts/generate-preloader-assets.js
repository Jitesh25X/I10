import sharp from 'sharp';
import fs from 'fs';

async function generateAllPreloaderAssets() {
  fs.mkdirSync('public/preloader', { recursive: true });

  const inputPath = 'file_00000000a774820885c4e18328008380.png';
  const orig = sharp(inputPath);
  const { data, info } = await orig.raw().toBuffer({ resolveWithObject: true });
  const { width, height } = info;

  // 1. Full logo copy
  await sharp(inputPath).png().toFile('public/preloader/logo-full.png');
  console.log('Saved public/preloader/logo-full.png');

  // 2. Full-frame Symbol A (width x height, x <= 734)
  const aFullData = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (x <= 734) {
        aFullData[idx] = data[idx];
        aFullData[idx + 1] = data[idx + 1];
        aFullData[idx + 2] = data[idx + 2];
        aFullData[idx + 3] = data[idx + 3];
      }
    }
  }
  await sharp(aFullData, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/preloader/symbol-a-full.png');
  console.log('Saved public/preloader/symbol-a-full.png');

  // 3. Full-frame Wordmark (width x height, x >= 730 to allow 4px overlap)
  const wordmarkFullData = Buffer.alloc(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      if (x >= 730) {
        wordmarkFullData[idx] = data[idx];
        wordmarkFullData[idx + 1] = data[idx + 1];
        wordmarkFullData[idx + 2] = data[idx + 2];
        wordmarkFullData[idx + 3] = data[idx + 3];
      }
    }
  }
  await sharp(wordmarkFullData, { raw: { width, height, channels: 4 } })
    .png()
    .toFile('public/preloader/wordmark-arambh-full.png');
  console.log('Saved public/preloader/wordmark-arambh-full.png');

  // 4. Cropped standalone Symbol A:
  // Bounds from earlier: x: [23, 734], y: [79, 785], w: 712, h: 707
  await sharp(inputPath)
    .extract({ left: 23, top: 79, width: 712, height: 707 })
    .png()
    .toFile('public/preloader/symbol-a-cropped.png');
  console.log('Saved public/preloader/symbol-a-cropped.png (712x707)');

  // 5. Cropped wordmark "arambh":
  // Bounds: x: [730, 1970], y: [7, 709], w: 1241, h: 703
  await sharp(inputPath)
    .extract({ left: 730, top: 7, width: 1241, height: 703 })
    .png()
    .toFile('public/preloader/wordmark-arambh-cropped.png');
  console.log('Saved public/preloader/wordmark-arambh-cropped.png (1241x703)');

  // Let's also create an optimized WebP version of each if needed, but PNG is lossless and exact!
  // Let's check file sizes
  const sFull = fs.statSync('public/preloader/logo-full.png').size;
  const sA = fs.statSync('public/preloader/symbol-a-cropped.png').size;
  const sW = fs.statSync('public/preloader/wordmark-arambh-cropped.png').size;
  const sAFull = fs.statSync('public/preloader/symbol-a-full.png').size;
  const sWFull = fs.statSync('public/preloader/wordmark-arambh-full.png').size;
  console.log('Asset sizes in bytes:', { full: sFull, aCropped: sA, wCropped: sW, aFull: sAFull, wFull: sWFull });
}

generateAllPreloaderAssets();
