import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';

const parse = (filepath) => {
  const ext = path.extname(filepath);
  const data = fs.readFileSync(filepath);
  const parser = parsers(ext);

  return parser(data);
};

export default (filepath1, filepath2) => {
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);
  const uniqKeys = _.union(_.keys(data1), _.keys(data2));
  const sortedKeys = _.sortBy(uniqKeys);

  const diffs = sortedKeys.reduce((res, key) => {
    if (_.has(data1, key) && _.has(data2, key)) {
      if (data1[key] === data2[key]) {
        return [...res, [' ', `${key}:`, `${data1[key]}`]];
      }
      return [
        ...res,
        ['-', `${key}:`, `${data1[key]}`],
        ['+', `${key}:`, `${data2[key]}`],
      ];
    } if (!(_.has(data1, key)) && (_.has(data2, key))) {
      return [...res, ['+', `${key}:`, `${data2[key]}`]];
    }
    return [...res, ['-', `${key}:`, `${data1[key]}`]];
  }, []);
  return `{\n${diffs.flatMap((el) => `  ${el.join(' ')}`).join('\n')}\n}`;
};
