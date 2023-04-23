const NodeFactory = require('./node');
const Helpers = require('./helper');

function TreeFactory(arr)
{
  if (Array.isArray(arr) != true)
  {
    throw new Error('Array not provided a parameter.');
  }

  let root;
  const origin = arr.filter(Helpers.unique).sort((a, b) => a > b);

  if (origin.length < 1)
  {
    throw new Error('Array length after filtering duplicates is less than 1.');
  }
  
  let _buildTree = (arr = origin) => {
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
  
  let visual = (node = root, prefix = '', isLeft = true) => {
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

  let insert = (value) => {
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

  let _search = (value) => {
    /*
      searches through tree, keeping record of the previous node and return the current and prev node if value is found
      returns nothing if value isnt found
    */

      let queue = [root];
      let prevNode;
      let node;
      let isFound = false;

      while (!isFound)
      {
        if (queue.length <= 0)
        {
          return;
        }

        node = queue.shift();

        if (node.value == value)
        {
          isFound = true;
          break;
        }

        if (node.left) queue.unshift(node.left);
        if (node.right) queue.unshift(node.right);
        prevNode = node;
      }

      return {node, prevNode};
  }

  let _depthFirst = (value) => {
    /*
      searches through tree, going all the way down through the left side of the tree while adding nodes to the stack
      once a left isnt possible anymore, check if node value is equal to value, if not continue with right.
    */

    let stack = [root];
    let prevNode;
    let node;
    let isFound = false;

    while (!isFound)
    {
      
    }
  }

  let _depthFirstRecusive = (value, stack = [root]) => {
    if (stack.length <= 0)
    {
      return;
    }

    const lastNode = stack[stack.length - 1];
    if (lastNode?.left)
    {
      stack.push(lastNode.left);
      const retrnVal = _depthFirstRecusive(value, stack);
      if (retrnVal?.node)
      {
        return retrnVal;
      }
    }
    if (lastNode?.right)
    {
      stack.push(lastNode.right);
      const retrnVal = _depthFirstRecusive(value, stack);
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

  return { _depthFirstRecusive, insert, _search, get visual() { visual(); }, get root() { return root; }, get origin() { return Array.from(origin); } };
}

module.exports = TreeFactory;