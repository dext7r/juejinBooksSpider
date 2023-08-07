import fs from 'fs-extra'
import { build } from 'esbuild'

const pkg = JSON.parse(fs.readFileSync('./package.json', 'utf-8'))

const config = {
  bundle: true,
  entryPoints: ['src/index.ts'],
  outfile: 'dist/index.cjs',
  format: 'cjs',
  platform: 'node',
  target: 'node12',
}

config.define = { 'process.env.PACKAGE_VERSION': JSON.stringify(pkg.version) }

build(config)
