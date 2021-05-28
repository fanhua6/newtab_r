import { axiosGet } from '../utils/http'
import * as url from '../constants/config'

const getHttpSearchEngineData = version => {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: url.GET_SEARCH_ENGINE_URL + '?v=' + version,
      success(data) {
        resolve(data)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

const getHttpHotword = option => {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: option || url.GET_HOT_WORDS_URL,
      success(data) {
        resolve(data)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

const getAssociationalWords = option => {
  let url = (process.env.NODE_ENV === 'development' ? option.associationUrl.replace('https://www.baidu.com/', 'http://localhost:3001/baidu/') : option.associationUrl) + option.searchText;
  console.log(url)
  return new Promise((resolve, reject) => {
    axiosGet({
      url,
      // params: {wd: option.searchText},
      success(data) {
        resolve(data)
      },
      error(err) {
        reject(err)
      }
    })
  })
}

const getHttpSiteData = version => {
  return new Promise((resolve, reject) => {
    axiosGet({
      url: url.GET_SITES_URL + '?v=' + version,
      success(data) {
        resolve(data);
      },
      error(err) {
        reject(err)
      }
    })
  })
}
export {
  getHttpSearchEngineData,
  getHttpHotword,
  getAssociationalWords,
  getHttpSiteData
}
