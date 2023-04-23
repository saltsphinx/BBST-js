const TreeFactory = require('./tree');

const bts = TreeFactory([1, 2, 3]);
bts.insert(0);
bts.insert(8);
bts.insert(3);
bts.visual;
// console.log(bts._search(1).prevNode);