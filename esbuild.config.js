const esbuild = require('esbuild');

const config = {
  entryPoints: ['src/index.ts'],
  bundle: true,
  platform: 'node',
  target: 'node16',
  outfile: 'dist/index.js',
  format: 'cjs',
  sourcemap: true,
  external: [],
  banner: {
    js: '#!/usr/bin/env node'
  }
};

// Build function
async function build() {
  try {
    await esbuild.build(config);
    console.log('✅ Build completed successfully!');
  } catch (error) {
    console.error('❌ Build failed:', error);
    process.exit(1);
  }
}

// Watch function
async function watch() {
  try {
    const ctx = await esbuild.context(config);
    await ctx.watch();
    console.log('👀 Watching for changes...');
  } catch (error) {
    console.error('❌ Watch failed:', error);
    process.exit(1);
  }
}

// CLI interface
const command = process.argv[2];
if (command === '--watch') {
  watch();
} else {
  build();
}

module.exports = config;