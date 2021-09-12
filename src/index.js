import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';
import diffTreeBuilder from './diffTreeBuilder.js';
import formaters from './formatters/index.js';

const parse = (filepath) => {
  const ext = path.extname(filepath);
  const data = fs.readFileSync(filepath);
  const parser = parsers(ext);

  return parser(data);
};

export default (filepath1, filepath2, formaterName = 'stylish') => {
  const formater = formaters[formaterName];
  const data1 = parse(filepath1);
  const data2 = parse(filepath2);

  const result = diffTreeBuilder(data1, data2);
  console.log(formater(result));
  return formater(result);
};
