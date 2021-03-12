import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import diff from '../gendiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => join(__dirname, '..', '__fixtures__', filename);

const expectOutput = `{
  - follow: false
    host: hexlet.io
  - proxy: 123.234.53.22
  - timeout: 50
  + timeout: 20
  + verbose: true
}`;

test('json difference', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  expect(diff(file1, file2)).toBe(expectOutput);
});

test('yaml difference', () => {
  const file1 = getFixturePath('file1.yml');
  const file2 = getFixturePath('file2.yml');
  expect(diff(file1, file2)).toBe(expectOutput);
});
