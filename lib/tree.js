const NodeFactory = require('./node');
const Helpers = require('./helper');

function TreeFactory(arr)
{
  if (Array.isArray(arr) != true)
  {
    throw new Error('Array not provided a parameter.');
  }

  let root;
  let origin = Array.from(arr).filter(Helpers.unique).sort((a, b) => a - b);

  if (origin.length < 1)
  {
    throw new Error('Array length after filtering duplicates is less than 1.');
  }
  
  const _buildTree = (arr = origin) => {
    if (arr.length <= 0)
    {
      return null;
    }
    
    let arrClone = Array.from(arr);
    
    const node = NodeFactory(arrClone.splice(Helpers.getMedium(arr), 1)[0]);
    node.left = _buildTree(arrClone.slice(0, Helpers.getMedium(arrClone, true)));
    node.right = _buildTree(arrClone.slice(Helpers.getMedium(arrClone, true), arrClone.length));
    
    return node;
  }
  
  const visual = (node = root, prefix = '', isLeft = true) => {
    if (node === null) {
      return;
    }
    if (node.right !== null) {
      visual(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      visual(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  }

  const insert = (value) => {
    let currentNode = root;
    let isFound = false;

    while (!isFound)
    {
      if (currentNode.value === value)
      {
        console.log('Node with value of: ' +  value + ' already exists.', currentNode);
        return;
      }
      let subNode;
      let direction;

      if (currentNode.value > value)
      {
        direction = 'left';
        subNode = currentNode.left;
      }
      else
      {
        direction = 'right';
        subNode = currentNode.right;
      }

      if (subNode)
      {
        currentNode = subNode;
      }
      else
      {
        currentNode[direction] = NodeFactory(value);
        isFound = true;
      }
    }

    return currentNode;
  }

  const remove = (value) => {
    /*
      finds a node, sees if it exists. if no node, exit. if node is a leaf, remove it. if node has one child, copy child data to node then
      delete child node. if node has 2 children, then find a node whos value is more than itself, but is less than the rest of the nodes
      more than itself.
    */

      const nodeQuery = _depthFirst(value);
      const node = nodeQuery.node;

      if (!node)
      {
        return;
      }

      if (node.left === null && node.right === null)
      {
        _removeLeaf(nodeQuery);
      }
      else if (node.left && node.right)
      {
        _removeTwoChilds(node);
      }
      else
      {
        _removeOneChild(node);
      }
  }

  const _removeLeaf = (nodeQuery) => {
    const node = nodeQuery.node;
    const prevNode = nodeQuery.prevNode;

    if (!prevNode)
    {
      console.log("Can't remove last node.");
    }

    if (prevNode.left == node)
    {
      prevNode.left = null;
    }
    else
    {
      prevNode.right = null;
    }
  }

  const _removeTwoChilds = (node) => {
    let currentNode = node.right;

    while (true)
    {
      if (currentNode.left)
      {
        currentNode = currentNode.left;
      }
      else
      {
        break;
      }
    }

    const newValue = currentNode.value;
    remove(newValue);
    node.value = newValue;
  }

  const _removeOneChild = (node) => {
    if (node.left)
    {
      node.value = node.left.value;
      node.left = null;
    }
    else
    {
      node.value = node.right.value;
      node.right = null;
    }
  }

  const find = (value) => {
    /*
      searches through tree, keeping record of the previous node and return the current and prev node if value is found
      returns nothing if value isnt found
    */
      let node = root;

      while (true)
      {
        let direction;
        if (node.value == value)
        {
          break;
        }

        direction = value < node.value ? 'left' : 'right';
        if (!node[direction])
        {
          return;
        }
        node = node[direction];
      }

      return node;
  }

  const levelOrder = (cb = _nodeValue) => {
    const queue = [root];
    const resultsArr = [];
    let index = 0;

    while (index < queue.length)
    {
      const currentNode = queue[index];

      if (currentNode.left)
      {
        queue.push(currentNode.left);
      }
      if (currentNode.right)
      {
        queue.push(currentNode.right);
      }

      resultsArr.push(cb(currentNode));
      index++;
    }

    return resultsArr;
  }

  const inorder = (node = root, arr = [], cb = _nodeValue) => {
    if (node.left)
    {
      inorder(node.left, arr, cb);
    }

    arr.push(cb(node));

    if (node.right)
    {
      inorder(node.right, arr, cb);
    }

    return arr;
  }

  const preorder = (node = root, arr = [], cb = _nodeValue) => {
    arr.push(cb(node));
    
    if (node.left)
    {
      preorder(node.left, arr, cb);
    }

    if (node.right)
    {
      preorder(node.right, arr, cb);
    }

    return arr;
  }

  const postorder = (node = root, arr = [], cb = _nodeValue) => {
    if (node.left)
    {
      postorder(node.left, arr, cb);
    }

    if (node.right)
    {
      postorder(node.right, arr, cb);
    }

    arr.push(cb(node));

    return arr;
  }

  const _nodeValue = (node) => {
    return node.value;
  }

  const height = (node = root, nodeHeight = 0) => {
    /*
      depth first search, have a counter for the number of nodes down a sub tree. the larger count wins
    */
    let leftHeight = nodeHeight;
    let rightHeight = nodeHeight;
   
    if (node.left)
    {
      leftHeight = height(node.left, nodeHeight + 1);
    }

    if (node.right)
    {
      rightHeight = height(node.right, nodeHeight + 1);
    }

    return leftHeight >= rightHeight ? leftHeight : rightHeight;
  }

  const depth = (value, node = root) => {
    if (node.value == value)
    {
      return 0;
    }

    if (value < node.value && node.left)
    {
      return depth(value, node.left) + 1;
    }
    else if (node.right)
    {
      return depth(value, node.right) + 1;
    }
  }

  const isBalanced = (node = root) => {
    let leftHeight = 0;
    let rightHeight = 0;

    if (node.left)
    {
      leftHeight = height(node.left);
    }

    if (node.right)
    {
      rightHeight = height(node.right);
    }

    return Math.abs(leftHeight - rightHeight) < 2;
  }

  const rebalance = () => {
    const newOrigin = levelOrder().sort((a, b) => a - b);
    origin = newOrigin;
    root = _buildTree();
  }

  const _depthFirst = (value, stack = [root]) => {
    if (stack.length <= 0)
    {
      return;
    }

    const lastNode = stack[stack.length - 1];
    if (lastNode?.left)
    {
      stack.push(lastNode.left);
      const retrnVal = _depthFirst(value, stack);
      if (retrnVal?.node) // refers to return obj below
      {
        return retrnVal;
      }
    }
    if (lastNode?.right)
    {
      stack.push(lastNode.right);
      const retrnVal = _depthFirst(value, stack);
      if (retrnVal?.node)
      {
        return retrnVal;
      }
    }

    if (lastNode.value === value)
    {
      return {node: lastNode, prevNode: stack[stack.length - 2]};
    }
    else
    {
      stack.pop();
    }
  }

  root = _buildTree();

  return { rebalance, isBalanced, height, depth, inorder, preorder, postorder, levelOrder, remove, insert, find, get visual() { visual(); }, get root() { return root; }, get origin() { return Array.from(origin); } };
}

module.exports = TreeFactory;