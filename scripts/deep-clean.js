import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.join(__dirname, '..');

const dirsToClean = [
  '.next',
  '.turbo',
  'node_modules/.cache',
  'node_modules/.bin/next'
];

console.log('Starting deep clean...');

for (const dir of dirsToClean) {
  const fullPath = path.join(projectRoot, dir);
  if (fs.existsSync(fullPath)) {
    try {
      fs.rmSync(fullPath, { recursive: true, force: true });
      console.log(`✓ Cleaned: ${dir}`);
    } catch (err) {
      console.log(`✗ Failed to clean ${dir}:`, err.message);
    }
  }
}

console.log('Deep clean complete');
