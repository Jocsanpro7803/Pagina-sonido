/*
  generate-media.js
  ------------------
  Escanea la carpeta /media y genera media/manifest.json con la lista
  de fotos y videos que la página muestra en la Galería.

  No necesitas ejecutar esto a mano en producción: Vercel lo corre
  solo en cada publicación (ver vercel.json / package.json).

  Para probarlo en tu computadora:
    node generate-media.js
*/

const fs = require('fs');
const path = require('path');

const MEDIA_DIR = path.join(__dirname, 'media');
const OUTPUT_FILE = path.join(MEDIA_DIR, 'manifest.json');

const IMAGE_EXT = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
const VIDEO_EXT = ['.mp4', '.mov', '.webm'];

function build() {
  if (!fs.existsSync(MEDIA_DIR)) {
    fs.mkdirSync(MEDIA_DIR, { recursive: true });
  }

  const files = fs
    .readdirSync(MEDIA_DIR)
    .filter((name) => name !== 'manifest.json' && !name.startsWith('.'))
    .sort((a, b) => a.localeCompare(b, 'es'));

  const items = [];
  for (const name of files) {
    const ext = path.extname(name).toLowerCase();
    if (IMAGE_EXT.includes(ext)) {
      items.push({ file: `media/${name}`, type: 'image' });
    } else if (VIDEO_EXT.includes(ext)) {
      items.push({ file: `media/${name}`, type: 'video' });
    }
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(items, null, 2));
  console.log(`Galería generada: ${items.length} archivo(s) encontrados en /media`);
}

build();
