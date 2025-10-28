import { exec } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { build } from 'esbuild';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Bygg backend
build({
  entryPoints: ['src/server.ts'],
  bundle: true,
  platform: 'node',
  target: 'node18',
  outfile: 'dist/server.js',
  format: 'cjs',
  banner: {
    js: "const require = (await import('node:module')).createRequire(import.meta.url);",
  },
}).then(() => {
  // Starta backend-servern
  const server = exec('node dist/server.js');

  server.stdout.on('data', (data) => {
    console.log(`Server: ${data}`);
  });

  server.stderr.on('data', (data) => {
    console.error(`Server Error: ${data}`);
  });

  // Hantera process avslutning
  process.on('SIGTERM', () => {
    server.kill();
    process.exit(0);
  });

  process.on('SIGINT', () => {
    server.kill();
    process.exit(0);
  });
}); 