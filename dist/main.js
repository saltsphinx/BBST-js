/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./lib/helper.js":
/*!***********************!*\
  !*** ./lib/helper.js ***!
  \***********************/
/***/ ((module) => {

eval("const mod = {}\n\nmod.getMedium = (arr, isSlicing = false) => {\n  const medium = arr.length / 2;\n  \n  if (isSlicing)\n  {\n    return medium\n  }\n  else\n  {\n    return arr.length % 2 == 0 ? medium - 1 : medium;\n  }\n}\n\nmod.unique = (value, index, arr) => arr.indexOf(value) == index;\n\nmodule.exports = mod;\n\n//# sourceURL=webpack://bbst/./lib/helper.js?");

/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const TreeFactory = __webpack_require__(/*! ./tree */ \"./lib/tree.js\");\nconst binaryTree = TreeFactory(generateRandomNums());\nbinaryTree.visual;\nconsole.log('Is balanced? ' + binaryTree.isBalanced());\nconsole.log('Level: ' + binaryTree.levelOrder());\nconsole.log('Preorder: ' + binaryTree.preorder());\nconsole.log('Inorder: ' + binaryTree.inorder());\nconsole.log('Postorder: ' + binaryTree.postorder());\nbinaryTree.insert(150);\nbinaryTree.insert(200);\nbinaryTree.visual;\nconsole.log('Is balanced? ' + binaryTree.isBalanced());\nbinaryTree.rebalance();\nconsole.log('Is balanced? ' + binaryTree.isBalanced());\nconsole.log('Level: ' + binaryTree.levelOrder());\nconsole.log('Preorder: ' + binaryTree.preorder());\nconsole.log('Inorder: ' + binaryTree.inorder());\nconsole.log('Postorder: ' + binaryTree.postorder());\n\nfunction generateRandomNums()\n{\n  const count = 15;\n  const numArr = [];\n  \n  for (let i = 0; i < count; i++)\n  {\n    numArr.push(Math.floor(Math.random() * 100) + 1);\n  }\n\n  return numArr;\n}\n\n//# sourceURL=webpack://bbst/./lib/index.js?");

/***/ }),

/***/ "./lib/node.js":
/*!*********************!*\
  !*** ./lib/node.js ***!
  \*********************/
/***/ ((module) => {

eval("function NodeFactory(value)\n{\n  return { value, left: null, right: null};\n}\n\nmodule.exports = NodeFactory;\n\n//# sourceURL=webpack://bbst/./lib/node.js?");

/***/ }),

/***/ "./lib/tree.js":
/*!*********************!*\
  !*** ./lib/tree.js ***!
  \*********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const NodeFactory = __webpack_require__(/*! ./node */ \"./lib/node.js\");\nconst Helpers = __webpack_require__(/*! ./helper */ \"./lib/helper.js\");\n\nfunction TreeFactory(arr)\n{\n  if (Array.isArray(arr) != true)\n  {\n    throw new Error('Array not provided as parameter.');\n  }\n\n  let root;\n  let origin = Array.from(arr).filter(Helpers.unique).sort((a, b) => a - b);\n\n  if (origin.length < 1)\n  {\n    throw new Error('Array length after filtering duplicates is less than 1.');\n  }\n  \n  const _buildTree = (arr = origin) => {\n    if (arr.length <= 0)\n    {\n      return null;\n    }\n    \n    let arrClone = Array.from(arr);\n    \n    const node = NodeFactory(arrClone.splice(Helpers.getMedium(arr), 1)[0]);\n    node.left = _buildTree(arrClone.slice(0, Helpers.getMedium(arrClone, true)));\n    node.right = _buildTree(arrClone.slice(Helpers.getMedium(arrClone, true), arrClone.length));\n    \n    return node;\n  }\n  \n  const visual = (node = root, prefix = '', isLeft = true) => {\n    if (node === null) {\n      return;\n    }\n    if (node.right !== null) {\n      visual(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);\n    }\n    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);\n    if (node.left !== null) {\n      visual(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);\n    }\n  }\n\n  const insert = (value) => {\n    let currentNode = root;\n    let isFound = false;\n\n    while (!isFound)\n    {\n      if (currentNode.value === value)\n      {\n        console.log('Node with value of: ' +  value + ' already exists.', currentNode);\n        return;\n      }\n      let subNode;\n      let direction;\n\n      if (currentNode.value > value)\n      {\n        direction = 'left';\n        subNode = currentNode.left;\n      }\n      else\n      {\n        direction = 'right';\n        subNode = currentNode.right;\n      }\n\n      if (subNode)\n      {\n        currentNode = subNode;\n      }\n      else\n      {\n        currentNode[direction] = NodeFactory(value);\n        isFound = true;\n      }\n    }\n\n    return currentNode;\n  }\n\n  const remove = (value) => {\n    /*\n      finds a node, sees if it exists. if no node, exit. if node is a leaf, remove it. if node has one child, copy child data to node then\n      delete child node. if node has 2 children, then find a node whos value is more than itself, but is less than the rest of the nodes\n      more than itself.\n    */\n\n      const nodeQuery = _depthFirst(value);\n      const node = nodeQuery.node;\n\n      if (!node)\n      {\n        return;\n      }\n\n      if (node.left === null && node.right === null)\n      {\n        _removeLeaf(nodeQuery);\n      }\n      else if (node.left && node.right)\n      {\n        _removeTwoChilds(node);\n      }\n      else\n      {\n        _removeOneChild(node);\n      }\n  }\n\n  const _removeLeaf = (nodeQuery) => {\n    const node = nodeQuery.node;\n    const prevNode = nodeQuery.prevNode;\n\n    if (!prevNode)\n    {\n      console.log(\"Can't remove last node.\");\n    }\n\n    if (prevNode.left == node)\n    {\n      prevNode.left = null;\n    }\n    else\n    {\n      prevNode.right = null;\n    }\n  }\n\n  const _removeTwoChilds = (node) => {\n    let currentNode = node.right;\n\n    while (true)\n    {\n      if (currentNode.left)\n      {\n        currentNode = currentNode.left;\n      }\n      else\n      {\n        break;\n      }\n    }\n\n    const newValue = currentNode.value;\n    remove(newValue);\n    node.value = newValue;\n  }\n\n  const _removeOneChild = (node) => {\n    if (node.left)\n    {\n      node.value = node.left.value;\n      node.left = null;\n    }\n    else\n    {\n      node.value = node.right.value;\n      node.right = null;\n    }\n  }\n\n  const find = (value) => {\n    /*\n      searches through tree, keeping record of the previous node and return the current and prev node if value is found\n      returns nothing if value isnt found\n    */\n      let node = root;\n\n      while (true)\n      {\n        let direction;\n        if (node.value == value)\n        {\n          break;\n        }\n\n        direction = value < node.value ? 'left' : 'right';\n        if (!node[direction])\n        {\n          return;\n        }\n        node = node[direction];\n      }\n\n      return node;\n  }\n\n  const levelOrder = (cb = _nodeValue) => {\n    const queue = [root];\n    const resultsArr = [];\n    let index = 0;\n\n    while (index < queue.length)\n    {\n      const currentNode = queue[index];\n\n      if (currentNode.left)\n      {\n        queue.push(currentNode.left);\n      }\n      if (currentNode.right)\n      {\n        queue.push(currentNode.right);\n      }\n\n      resultsArr.push(cb(currentNode));\n      index++;\n    }\n\n    return resultsArr;\n  }\n\n  const inorder = (node = root, arr = [], cb = _nodeValue) => {\n    if (node.left)\n    {\n      inorder(node.left, arr, cb);\n    }\n\n    arr.push(cb(node));\n\n    if (node.right)\n    {\n      inorder(node.right, arr, cb);\n    }\n\n    return arr;\n  }\n\n  const preorder = (node = root, arr = [], cb = _nodeValue) => {\n    arr.push(cb(node));\n    \n    if (node.left)\n    {\n      preorder(node.left, arr, cb);\n    }\n\n    if (node.right)\n    {\n      preorder(node.right, arr, cb);\n    }\n\n    return arr;\n  }\n\n  const postorder = (node = root, arr = [], cb = _nodeValue) => {\n    if (node.left)\n    {\n      postorder(node.left, arr, cb);\n    }\n\n    if (node.right)\n    {\n      postorder(node.right, arr, cb);\n    }\n\n    arr.push(cb(node));\n\n    return arr;\n  }\n\n  const _nodeValue = (node) => {\n    return node.value;\n  }\n\n  const height = (node = root, nodeHeight = 0) => {\n    /*\n      depth first search, have a counter for the number of nodes down a sub tree. the larger count wins\n    */\n    let leftHeight = nodeHeight;\n    let rightHeight = nodeHeight;\n   \n    if (node.left)\n    {\n      leftHeight = height(node.left, nodeHeight + 1);\n    }\n\n    if (node.right)\n    {\n      rightHeight = height(node.right, nodeHeight + 1);\n    }\n\n    return leftHeight >= rightHeight ? leftHeight : rightHeight;\n  }\n\n  const depth = (value, node = root) => {\n    if (node.value == value)\n    {\n      return 0;\n    }\n\n    if (value < node.value && node.left)\n    {\n      return depth(value, node.left) + 1;\n    }\n    else if (node.right)\n    {\n      return depth(value, node.right) + 1;\n    }\n  }\n\n  const isBalanced = (node = root) => {\n    let leftHeight = 0;\n    let rightHeight = 0;\n\n    if (node.left)\n    {\n      leftHeight = height(node.left);\n    }\n\n    if (node.right)\n    {\n      rightHeight = height(node.right);\n    }\n\n    return Math.abs(leftHeight - rightHeight) < 2;\n  }\n\n  const rebalance = () => {\n    const newOrigin = levelOrder().sort((a, b) => a - b);\n    origin = newOrigin;\n    root = _buildTree();\n  }\n\n  const _depthFirst = (value, stack = [root]) => {\n    if (stack.length <= 0)\n    {\n      return;\n    }\n\n    const lastNode = stack[stack.length - 1];\n    if (lastNode?.left)\n    {\n      stack.push(lastNode.left);\n      const retrnVal = _depthFirst(value, stack);\n      if (retrnVal?.node) // refers to return obj below\n      {\n        return retrnVal;\n      }\n    }\n    if (lastNode?.right)\n    {\n      stack.push(lastNode.right);\n      const retrnVal = _depthFirst(value, stack);\n      if (retrnVal?.node)\n      {\n        return retrnVal;\n      }\n    }\n\n    if (lastNode.value === value)\n    {\n      return {node: lastNode, prevNode: stack[stack.length - 2]};\n    }\n    else\n    {\n      stack.pop();\n    }\n  }\n\n  root = _buildTree();\n\n  return { rebalance, isBalanced, height, depth, inorder, preorder, postorder, levelOrder, remove, insert, find, get visual() { visual(); }, get root() { return root; }, get origin() { return Array.from(origin); } };\n}\n\nmodule.exports = TreeFactory;\n\n//# sourceURL=webpack://bbst/./lib/tree.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./lib/index.js");
/******/ 	
/******/ })()
;