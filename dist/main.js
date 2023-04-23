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

eval("const TreeFactory = __webpack_require__(/*! ./tree */ \"./lib/tree.js\");\n\nconst bts = TreeFactory(generateNum(20));\nconst bts1 = TreeFactory(generateNum(1));\n\nconsole.log(bts._depthFirstRecusive(254));\nconsole.log(bts.origin);\nbts.visual\n\nfunction generateNum(num)\n{\n  return Array.from(Array(num).keys());\n}\n// console.log(bts._search(1).prevNode);\n\n//# sourceURL=webpack://bbst/./lib/index.js?");

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

eval("const NodeFactory = __webpack_require__(/*! ./node */ \"./lib/node.js\");\nconst Helpers = __webpack_require__(/*! ./helper */ \"./lib/helper.js\");\n\nfunction TreeFactory(arr)\n{\n  if (Array.isArray(arr) != true)\n  {\n    throw new Error('Array not provided a parameter.');\n  }\n\n  let root;\n  const origin = arr.filter(Helpers.unique).sort((a, b) => a > b);\n\n  if (origin.length < 1)\n  {\n    throw new Error('Array length after filtering duplicates is less than 1.');\n  }\n  \n  let _buildTree = (arr = origin) => {\n    if (arr.length <= 0)\n    {\n      return null;\n    }\n    \n    let arrClone = Array.from(arr);\n    \n    const node = NodeFactory(arrClone.splice(Helpers.getMedium(arr), 1)[0]);\n    node.left = _buildTree(arrClone.slice(0, Helpers.getMedium(arrClone, true)));\n    node.right = _buildTree(arrClone.slice(Helpers.getMedium(arrClone, true), arrClone.length));\n    \n    return node;\n  }\n  \n  let visual = (node = root, prefix = '', isLeft = true) => {\n    if (node === null) {\n      return;\n    }\n    if (node.right !== null) {\n      visual(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);\n    }\n    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);\n    if (node.left !== null) {\n      visual(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);\n    }\n  }\n\n  let insert = (value) => {\n    let currentNode = root;\n    let isFound = false;\n\n    while (!isFound)\n    {\n      if (currentNode.value === value)\n      {\n        console.log('Node with value of: ' +  value + ' already exists.', currentNode);\n        return;\n      }\n      let subNode;\n      let direction;\n\n      if (currentNode.value > value)\n      {\n        direction = 'left';\n        subNode = currentNode.left;\n      }\n      else\n      {\n        direction = 'right';\n        subNode = currentNode.right;\n      }\n\n      if (subNode)\n      {\n        currentNode = subNode;\n      }\n      else\n      {\n        currentNode[direction] = NodeFactory(value);\n        isFound = true;\n      }\n    }\n\n    return currentNode;\n  }\n\n  let _search = (value) => {\n    /*\n      searches through tree, keeping record of the previous node and return the current and prev node if value is found\n      returns nothing if value isnt found\n    */\n\n      let queue = [root];\n      let prevNode;\n      let node;\n      let isFound = false;\n\n      while (!isFound)\n      {\n        if (queue.length <= 0)\n        {\n          return;\n        }\n\n        node = queue.shift();\n\n        if (node.value == value)\n        {\n          isFound = true;\n          break;\n        }\n\n        if (node.left) queue.unshift(node.left);\n        if (node.right) queue.unshift(node.right);\n        prevNode = node;\n      }\n\n      return {node, prevNode};\n  }\n\n  let _depthFirst = (value) => {\n    /*\n      searches through tree, going all the way down through the left side of the tree while adding nodes to the stack\n      once a left isnt possible anymore, check if node value is equal to value, if not continue with right.\n    */\n\n    let stack = [root];\n    let prevNode;\n    let node;\n    let isFound = false;\n\n    while (!isFound)\n    {\n      \n    }\n  }\n\n  let _depthFirstRecusive = (value, stack = [root]) => {\n    if (stack.length <= 0)\n    {\n      return;\n    }\n\n    const lastNode = stack[stack.length - 1];\n    if (lastNode?.left)\n    {\n      stack.push(lastNode.left);\n      const retrnVal = _depthFirstRecusive(value, stack);\n      if (retrnVal?.node)\n      {\n        return retrnVal;\n      }\n    }\n    if (lastNode?.right)\n    {\n      stack.push(lastNode.right);\n      const retrnVal = _depthFirstRecusive(value, stack);\n      if (retrnVal?.node)\n      {\n        return retrnVal;\n      }\n    }\n\n    if (lastNode.value === value)\n    {\n      return {node: lastNode, prevNode: stack[stack.length - 2]};\n    }\n    else\n    {\n      stack.pop();\n    }\n  }\n\n  root = _buildTree();\n\n  return { _depthFirstRecusive, insert, _search, get visual() { visual(); }, get root() { return root; }, get origin() { return Array.from(origin); } };\n}\n\nmodule.exports = TreeFactory;\n\n//# sourceURL=webpack://bbst/./lib/tree.js?");

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