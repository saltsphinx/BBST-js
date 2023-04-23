const TreeFactory = require('./tree');

const bts = TreeFactory(generateNum(20));
const bts1 = TreeFactory(generateNum(1));

console.log(bts._depthFirstRecusive(254));
console.log(bts.origin);
bts.visual

function generateNum(num)
{
  return Array.from(Array(num).keys());
}
// console.log(bts._search(1).prevNode);