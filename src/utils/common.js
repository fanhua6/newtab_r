/**
 * 
 * @param {*} arg 
 */
export const compare = arg => {
  return function(a, b) {
    return a[arg] - b[arg]
  }
}