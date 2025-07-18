/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */
const fsExtra = require('fs-extra')
const path = require('path')

const { readdirSync, ensureDirSync, copySync } = fsExtra

function copyNonTsFiles(srcDir, distDir) {
  ensureDirSync(distDir)

  readdirSync(srcDir, { withFileTypes: true }).forEach((entry) => {
    const srcPath = path.join(srcDir, entry.name)
    const destPath = path.join(distDir, entry.name)

    if (entry.isDirectory()) {
      copyNonTsFiles(srcPath, destPath)
    } else if (!srcPath.endsWith('.ts')) {
      copySync(srcPath, destPath)
    }
  })
}

copyNonTsFiles(path.join(__dirname, 'src'), path.join(__dirname, 'dist'))
copySync(path.join(__dirname, 'public'), path.join(__dirname, 'dist/public'))
console.log('✅ Copied non-TS files and public/ to dist/')
