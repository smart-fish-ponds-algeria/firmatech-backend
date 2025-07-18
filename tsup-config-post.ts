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
}
