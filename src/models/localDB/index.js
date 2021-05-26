import * as db from '../../utils/operationdb'

const connectLocalDB = () => {
  return new Promise((resolve, reject) => {
    db.connectLocalDB({
      success(res) {
        resolve(res)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

const getDataByStoreName = storeName => {
  return new Promise((resolve, reject) => {
    db.getDataByStoreName({
      storeName,
      success(res) {
        resolve(res)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

const addDataByStore = (storeName, data) => {
  return new Promise((resolve, reject) => {
    db.addDataByStore({
      storeName,
      data,
      success(res) {
        resolve(res)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

const getDataById = (storeName, id) => {
  return new Promise((resolve, reject) => {
    db.getDataById({
      storeName,
      id,
      success(res) {
        resolve(res)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

/**
 * 
 * @param {*} storeName 
 * @param {*} obj 
 * @returns 
 */
const updateByStore = (storeName, data) => {
  return new Promise((resolve, reject) => {
    db.updateByStore({
      storeName,
      data,
      success(res) {
        resolve(res)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

export {
  connectLocalDB,
  getDataByStoreName,
  addDataByStore,
  getDataById,
  updateByStore
}