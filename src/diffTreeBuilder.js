/* eslint no-unused-vars: ["error", { "args": "none" }] */
import _ from 'lodash';

const nodeType = [
  {
    check: (key, obj1) => !_.has(obj1, key),
    build: (key, obj1, obj2) => ({ key, type: 'added', value: obj2[key] }),
  },
  {
    check: (key, obj1, obj2) => !_.has(obj2, key),
    build: (key, obj1, obj2) => ({ key, type: 'deleted', value: obj1[key] }),
  },
  {
    check: (key, obj1, obj2) =>
      _.isPlainObject(obj1[key]) && _.isPlainObject(obj2[key]),
    build: (key, obj1, obj2, build) => ({
      key,
      type: 'nested',
      children: build(obj1[key], obj2[key]),
    }),
  },
  {
    check: (key, obj1, obj2) => obj1[key] === obj2[key],
    build: (key, obj1, obj2) => ({
      key,
      type: 'unchanged',
      value: obj1[key],
    }),
  },
  {
    check: (key, obj1, obj2) => obj1[key] !== obj2[key],
    build: (key, obj1, obj2) => ({
      key,
      type: 'updated',
      old: obj1[key],
      new: obj2[key],
    }),
  },
];

export default function buildTree(data1, data2) {
  const firstKeys = _.keys(data1);
  const secondKeys = _.keys(data2);
  const uniqKeys = _.union(firstKeys, secondKeys);
  const sortedKeys = _.sortBy(uniqKeys);

  return sortedKeys.map((key) => {
    const node = nodeType.find((type) => type.check(key, data1, data2));
    return node.build(key, data1, data2, buildTree);
  });
}
