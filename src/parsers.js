import yamljs from 'js-yaml';

const parsers = {
  '.yml': yamljs.load,
  '.json': JSON.parse,
};

export default (fileExtention) => parsers[fileExtention];
