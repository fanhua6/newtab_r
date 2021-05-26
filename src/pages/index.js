import React, { useState, useEffect, useCallback } from 'react';
import '../assets/css/index.scss';
import Background from '../containers/common/Background';
import DesktopPage from '../containers/DesktopPage';
import SimplePage from '../containers/SimplePage';
import TopToolbar from '../containers/common/TopToolbar';
import SysManege from '../conponents/SysManege';
import * as api from '../models/httpServer';
import * as db from '../models/localDB';
import { GET_HOT_WORDS_URL } from '../constants/config';

function Index (props) {
  const { 
    viewState, 
    searchEngine,  
    currentUser,
    searchEngineList,
    actions 
  } = props;

  const [ isShowSysManege, setIsShowSysManege ] = useState(false),
        [ isConnected, setIsConnected ] = useState(false);

  const putSearchEngineToLocalStore = useCallback((data, oldData) => {
    if (oldData) {
      console.log('update search engine')
    } else {
      db.addDataByStore('userStore', { id: 'searchEngine', data }).then(res => {
        console.log(res, data, 'add Search Engine By User Store')
        actions.setSearchEngine(data)
      }).catch(err => {
        console.error(err)
      })
    }
  }, [actions])

  const putSearchEngineDataToLocalStore = useCallback((data, oldData) => {
    if (oldData.length) {
      db.updateByStore('sysStore', { id: 'searchEngineList', ...data }).then(res => {
        console.log('updateSearchEngineDataToLocalStore', res, data)
        actions.setSearchEngineList(data.data)
      }).catch(err => {
        console.error(err)
      })
    } else {
      db.addDataByStore('sysStore', { id: 'searchEngineList', ...data }).then(res => {
        console.log('addSearchEngineDataToLocalStore', res, data, searchEngine)
        actions.setSearchEngineList(data.data)
      }).catch(err => {
        console.error(err)
      })
    }
  }, [ 
    actions,
    searchEngine,
  ]);

  const putSiteDataToLocalStore = useCallback((data, oldData) => {
    console.log(data, oldData)
    if(oldData) {

    }else {

    }
  }, [])

  const putHotwordsToLocalStore = useCallback((data, oldData) => {
    if(oldData.length) {
      db.updateByStore('sysStore', { id: 'hotwords', updatetime: Date.parse(new Date()) / 1000, data }).then(() => {
        actions.setHotWordsList(data)
      })
    }else{
      db.addDataByStore('sysStore', { id: 'hotwords', updatetime: Date.parse(new Date()) / 1000, data }).then(() => {
        actions.setHotWordsList(data)
      })
    }
  }, [
    actions
  ])

  /**
   * obj => { version, data }
   */
  const getHttpSearchEngineData = useCallback(obj => {
    console.log(obj.version)
    api.getHttpSearchEngineData(obj.version).then(res => {
      let engineList = {
        data: JSON.parse(res.bd.d),
        version: res.bd.v
      };
      console.log(111, engineList, res)
      if(res.code === 0) {
        putSearchEngineDataToLocalStore(engineList, obj.data)
        if(obj.version === 0) {
          putSearchEngineToLocalStore(engineList.data.filter(i => i.d)[0], null)
        }
      }
    }).catch(err => {
      if (err.message.indexOf('code 304')) {
        console.info('搜索引擎数据无更新')
      }else{
        console.error(err)
      }
    })
  }, [
    putSearchEngineDataToLocalStore,
    putSearchEngineToLocalStore
  ]);

  const getHttpSiteData = useCallback(obj => {
    console.log(obj.version)
    api.getHttpSiteData(obj.version).then(res => {
      let siteList = {
        data: JSON.parse(res.bd.d),
        version: res.bd.v
      };
      console.log('getHttpSiteData', siteList, res)
      if (res.code === 0) {
        // putSearchEngineDataToLocalStore(siteList, obj.data)
        if (obj.version === 0) {
          // putSearchEngineToLocalStore(siteList.data.filter(i => i.d)[0], null)
        }
      }
    }).catch(err => {
      if (err.message.indexOf('code 304')) {
        console.info('无数据更新')
      } else {
        console.error(err)
      }
    })
  }, [

  ])


  /**
   * options => { updatetime, data }
   */
  const getHttpHotwords = useCallback(options => {
    api.getHttpHotword(options.hotUrl).then(res => {
      console.log('getHttpHotwords', res, options)
      if(res) {
        putHotwordsToLocalStore(res, options.data)
      }
    }).catch(err => {
      console.error(err)
    })
  }, [
    putHotwordsToLocalStore
  ])

  const getLocalHotwordList = useCallback((hotUrl) => {
    db.getDataById('sysStore', 'hotwords').then(res => {
      console.log('getLocalHotwordList', res)
      let options = {
        updatetime: 0,
        data: [],
        hotUrl
      }
      if (res) {
        actions.setHotWordsList(res.data)
        options.data = res.data
        let difference = Date.parse(new Date()) / 1000 - res.updatetime
        console.log(difference, res)
        // 判断10分钟请求一次
        if (difference > (600)) {
          getHttpHotwords(options)
        }
      } else {
        getHttpHotwords(options)
      }
    })
  }, [
    actions,
    getHttpHotwords
  ])

  const getLocalSearchEngine = useCallback(() => {
    db.getDataById('userStore', 'searchEngine').then(res => {
      if(res) {
        actions.setSearchEngine(res.data)
        getLocalHotwordList(res.data.hc)
      }else{
        getLocalHotwordList(GET_HOT_WORDS_URL)
      }
    }).catch(err => {
      console.error(err)
    })
  }, [
    actions,
    getLocalHotwordList
  ])

  const getLocalSearchEngineList = useCallback(() => {
    db.getDataById('sysStore', 'searchEngineList').then(res => {
      let options = {
        version: 0,
        data: []
      }
      console.log(222,res)
      if(res) {
        actions.setSearchEngineList(res.data)
        options = res
      }
      getHttpSearchEngineData(options)
    }).catch(err => {
      console.error(err)
    })
  },[
    actions,
    getHttpSearchEngineData
  ])

  useEffect(() => {
    if (!isConnected) {
      db.connectLocalDB().then(() => {
        setIsConnected(true)
        getLocalSearchEngineList()
        getLocalSearchEngine()
      }).catch(err => {
        console.error('connectLocalDB', err)
      })
    }
  }, [ 
    isConnected,
    getLocalSearchEngineList,
    getLocalSearchEngine,
  ]);

  const mainClick_ = () => {
    setIsShowSysManege(false)
    actions.setIsShowSearchEngineList(false)
  }
  
  return (
    <div className="main"
      onClick={ mainClick_ }
    >
      <Background />
      <div className="page">
        {
          viewState === 'desktop' ?
            (
              <DesktopPage />
            ) : (viewState === 'simple' ?
              (
                <SimplePage />
              ) : '')
        }
      </div>
      <TopToolbar 
        showSysManege={() => setIsShowSysManege(true) }
      />
      <SysManege
        isShow={isShowSysManege}
        closeSysManege={() => setIsShowSysManege(false)}
      />
    </div>
  )
}

export default Index;