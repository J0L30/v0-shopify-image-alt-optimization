#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

// Remove .next cache
const nextDir = path.join(process.cwd(), '.next');
if (fs.existsSync(nextDir)) {
  fs.rmSync(nextDir, { recursive: true, force: true });
  console.log('Cleaned .next cache');
}

// Remove node_modules/.cache if it exists
const cacheDir = path.join(process.cwd(), 'node_modules', '.cache');
if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true });
  console.log('Cleaned node_modules/.cache');
}

console.log('Cache cleanup complete');
