/**
 * 
 * @param {*} field , order
 */
export const compare = (field, order = true) => {
  return function(a, b) {
    return order ? a[field] - b[field] : b[field] - a[field]
  }
}