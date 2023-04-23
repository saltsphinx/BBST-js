const mod = {}

mod.getMedium = (arr, isSlicing = false) => {
  const medium = arr.length / 2;
  
  if (isSlicing)
  {
    return medium
  }
  else
  {
    return arr.length % 2 == 0 ? medium - 1 : medium;
  }
}

mod.unique = (value, index, arr) => arr.indexOf(value) == index;

module.exports = mod;