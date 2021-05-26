let dbObj = null;

const connectLocalDB = options => {
  const dbname = 'FHDB',
        dbversion = 1;
  const request = indexedDB.open(dbname, dbversion);

  
  request.onerror = e => {
    options.error('localdb connect error!', e)
  }

  request.onsuccess = e => {
    dbObj = e.target.result
    options.success(e.target.result)
  }

  request.onupgradeneeded = e => {
    console.log('onupgradeneeded', e)
    dbObj = e.target.result
    const db = e.target.result;
    if (db.objectStoreNames.length === 0) {
      db.createObjectStore('sysStore', { keyPath: 'id' });
      db.createObjectStore('userStore', { keyPath: 'id' });
    }
  }
}

const getDataByStoreName = options => {
  const { storeName, success, error } = options;
  const request = dbObj.transaction(storeName, 'readonly').objectStore(storeName).getAll();

  request.onsuccess = e => {
    success(e.target.result)
  }

  request.onerror = e => {
    error(`get ${storeName} data error =>`, e)
  }
}

const getDataById = options => {
  const { storeName, id, success, error } = options;
  const request = dbObj.transaction(storeName, 'readonly').objectStore(storeName).get(id);
  
  request.onsuccess = e => {
    success(e.target.result)
  }

  request.onerror = e => {
    error(`get ${id} data by store ${storeName} -> ${id} error => `, e)
  }
}

const addDataByStore = options => {
  const { storeName, data, success, error } = options;
  const request = dbObj.transaction(storeName, 'readwrite').objectStore(storeName).add(data);

  request.onsuccess = e => {
    success(e.target.result);
  }

  request.onerror = e => {
    error(`add ${data.id} data By store ${storeName} error => `, e);
  }
}

const updateByStore = options => {
  const { storeName, data, success, error } = options;
  const request = dbObj.transaction(storeName, 'readwrite').objectStore(storeName).put(data);

  request.onsuccess = e => {
    success(e.target.result);
  }

  request.onerror = e => {
    error(`update ${data.id} data by store ${storeName} error => `, e);
  }
}

export {
  connectLocalDB,
  getDataByStoreName,
  addDataByStore,
  getDataById,
  updateByStore
}