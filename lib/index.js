const TreeFactory = require('./tree');
const binaryTree = TreeFactory(generateRandomNums());
binaryTree.visual;
console.log('Is balanced? ' + binaryTree.isBalanced());
console.log('Level: ' + binaryTree.levelOrder());
console.log('Preorder: ' + binaryTree.preorder());
console.log('Inorder: ' + binaryTree.inorder());
console.log('Postorder: ' + binaryTree.postorder());
binaryTree.insert(150);
binaryTree.insert(200);
binaryTree.visual;
console.log('Is balanced? ' + binaryTree.isBalanced());
binaryTree.rebalance();
console.log('Is balanced? ' + binaryTree.isBalanced());
console.log('Level: ' + binaryTree.levelOrder());
console.log('Preorder: ' + binaryTree.preorder());
console.log('Inorder: ' + binaryTree.inorder());
console.log('Postorder: ' + binaryTree.postorder());

function generateRandomNums()
{
  const count = 15;
  const numArr = [];
  
  for (let i = 0; i < count; i++)
  {
    numArr.push(Math.floor(Math.random() * 100) + 1);
  }

  return numArr;
}