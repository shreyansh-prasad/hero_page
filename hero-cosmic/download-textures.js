/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

const urls = {
  'earth-diffuse.jpg': 'https://unpkg.com/three-globe/example/img/earth-blue-marble.jpg',
  'earth-topology.png': 'https://unpkg.com/three-globe/example/img/earth-topology.png',
  'earth-water.png': 'https://unpkg.com/three-globe/example/img/earth-water.png',
  'earth-clouds.png': 'https://unpkg.com/three-globe/example/img/earth-clouds.png'
};

const dir = path.join(__dirname, 'public', 'cosmic');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

async function download() {
  console.log('Downloading textures...');
  for (const [filename, url] of Object.entries(urls)) {
    const dest = path.join(dir, filename);
    const res = await fetch(url);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log(`Saved ${filename}`);
  }
  console.log('Done.');
}

download();
