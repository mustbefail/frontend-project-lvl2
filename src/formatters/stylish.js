import _ from 'lodash';

const buildIndent = (deep) => ' '.repeat(4 * deep - 2);

const stringify = (node, deep) => {
  if (!_.isPlainObject(node)) {
    return node;
  }

  const result = _.keys(node).flatMap((key) => {
    const value = node[key];
    return `${buildIndent(deep + 1)}  ${key}: ${stringify(value, deep + 1)}`;
  });
  return `{\n${result.join('\n')}\n${buildIndent(deep)}  }`;
};

const mapNode = {
  nested: (node, deep, builder) =>
    `${buildIndent(deep)}  ${node.key}: {\n${builder(
      node.children,
      deep + 1
    )}\n${buildIndent(deep)}  }`,
  added: (node, deep) =>
    `${buildIndent(deep)}+ ${node.key}: ${stringify(node.value, deep)}`,
  deleted: (node, deep) =>
    `${buildIndent(deep)}- ${node.key}: ${stringify(node.value, deep)}`,
  updated: (node, deep) =>
    [
      `${buildIndent(deep)}- ${node.key}: ${stringify(node.old, deep)}`,
      `${buildIndent(deep)}+ ${node.key}: ${stringify(node.new, deep)}`,
    ].join('\n'),
  unchanged: (node, deep) =>
    `${buildIndent(deep)}  ${node.key}: ${stringify(node.value, deep)}`,
};

const iter = (tree, deep) =>
  tree.flatMap((node) => mapNode[node.type](node, deep, iter)).join('\n');

export default (diffTree) => `{\n${iter(diffTree, 1)}\n}`;
