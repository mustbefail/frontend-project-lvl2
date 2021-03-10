import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import process from 'process';

function readFile(filepath) {
  const currentDir = process.cwd();
  const pathToFile = path.resolve(currentDir, filepath);

  return fs.readFileSync(pathToFile, 'utf8');
}

function difference(filepath1, filepath2) {
  const file1 = readFile(filepath1);
  const file2 = readFile(filepath2);
  const obj1 = JSON.parse(file1);
  const obj2 = JSON.parse(file2);
  const uniqKeys = _.union(_.keys(obj1), _.keys(obj2));
  const sortedKeys = _.sortBy(uniqKeys);
  const diffs = sortedKeys.reduce((res, key) => {
    const changes = [' ', '+', '-'];
    let diff = [];
    if (_.has(obj1, key) && _.has(obj2, key)) {
      if (obj1[key] === obj2[key]) {
        diff = [changes[0], `${key}:`, `${obj1[key]}`];
        res.push(diff);
      } else {
        diff = [changes[2], `${key}:`, `${obj1[key]}`];
        res.push(diff);
        diff = [changes[1], `${key}:`, `${obj2[key]}`];
        res.push(diff);
      }
    } else if (!(_.has(obj1, key)) && (_.has(obj2, key))) {
      diff = [changes[1], `${key}:`, `${obj2[key]}`];
      res.push(diff);
    } else {
      diff = [changes[2], `${key}:`, `${obj1[key]}`];
      res.push(diff);
    }
    return res;
  }, []);
  return `{\n${diffs.map((el) => `  ${el.join(' ')}`).join('\n')}\n}`;
}
export { difference, readFile };
