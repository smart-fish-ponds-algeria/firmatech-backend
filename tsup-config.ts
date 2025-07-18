/** @type {import('tsup').Options} */
module.exports = {
  entry: ['src'],
  format: ['cjs'],
  clean: true,
  loader: {
    '.html': 'copy',
    '.jsonl': 'copy',
    '.json': 'copy',
  },
  onSuccess:
    'npx cpy "src/**/*" "!src/**/*.ts" dist/ --parents && cp -r public/. dist/public',
}
