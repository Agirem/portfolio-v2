import sharp from 'sharp';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const assetsDir = path.join(__dirname, '../assets');

// Configuration des tailles
const sizes = {
  projects: { width: 400, height: 256 },
  icons: { width: 24, height: 24 },
  profile: { width: 256, height: 256 },
  logos: { width: 48, height: 48 }
};

// Liste des images à optimiser
const imagesToOptimize = {
  projects: ['1.webp', '2.webp', '3.webp', '4.webp', '5.webp', '6.webp'],
  icons: ['green.webp', 'hand.webp', 'heart.webp', 'man-tech.webp', 'phone.webp', 'sparkless.webp', 'vue.webp'],
  profile: ['profile.webp'],
  logos: ['flutter.jpg', 'laravel.png']
};

async function optimizeImages() {
  // Créer le dossier optimized s'il n'existe pas
  const optimizedDir = path.join(assetsDir, 'optimized');
  try {
    await fs.mkdir(optimizedDir, { recursive: true });
  } catch (error) {
    if (error.code !== 'EEXIST') throw error;
  }

  // Optimiser les images par catégorie
  for (const [category, files] of Object.entries(imagesToOptimize)) {
    const { width, height } = sizes[category];

    for (const file of files) {
      const inputPath = path.join(assetsDir, file);
      const outputPath = path.join(optimizedDir, file.replace(/\.[^.]+$/, '.webp'));

      try {
        await sharp(inputPath)
          .resize(width, height, {
            fit: 'cover',
            position: 'center'
          })
          .webp({ quality: 80 })
          .toFile(outputPath);

        console.log(`Optimized ${file} to ${width}x${height}`);
      } catch (error) {
        console.error(`Error optimizing ${file}:`, error);
      }
    }
  }
}

optimizeImages().catch(console.error); 