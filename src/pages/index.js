import React, { useState, useEffect, useCallback } from 'react';
import '../assets/css/index.scss';
import Background from '../containers/common/Background';
import DesktopPage from '../containers/DesktopPage';
import SimplePage from '../containers/SimplePage';
import TopToolbar from '../containers/common/TopToolbar';
import SysManege from '../containers/SysManege';
import * as api from '../models/httpServer';
import * as db from '../models/localDB';
import { GET_HOT_WORDS_URL } from '../constants/config';
import { addWebUIListener, sendWithPromise } from '../utils/cr.m'

function Index (props) {
  const { 
    viewState, 
    wallpaper,
    individuationData,
    skinTypeId,
    fontColor,
    actions 
  } = props;

  const { isEmptyCon, doubleClickIsShow, isShowWallpaper } = individuationData

  const [ isShowSysManege, setIsShowSysManege ] = useState(false),
        [ isConnected, setIsConnected ] = useState(false),
        [ isHiddenAll, setIsHiddenAll ] = useState(false);

  const prefsChangeListener = useCallback(res => {
    // console.log('changePrefsListener', res, actions)
    switch (res.key) {
      case 'browser.skin_loading_id':
        // console.log('browser.skin_loading_id', res)
        actions.setLoadingSkinId(res.value)
        break;
      case 'browser.skin_id':
        actions.setCurrentSkinId(res.value)
        break;
      case 'browser.skin_font_type':
        actions.setFontColor(res.value === 0 ? '#fff' : '#222')
        break;
      case 'browser.skin_skin_type':
        actions.setSkinTypeId(res.value)
        if (res.value === 1) {
          actions.setFontColor(isShowWallpaper ? '#fff' : '#222')
        }
        break;
      default:
        break;
    }
  }, [
    actions,
    isShowWallpaper
  ])

  const getPrefsData = useCallback(() => {
    sendWithPromise('getPref', 'browser.skin_font_type').then(res => {
      actions.setFontColor(res === 0 ? '#fff' : '#222')
    })
    sendWithPromise('getPref', 'browser.skin_skin_type').then(res => {
      actions.setSkinTypeId(res)
      if(res === 1) {
        actions.setFontColor(isShowWallpaper ? '#fff' : '#222')
      }
    })
  }, [actions, isShowWallpaper])

  useEffect(() => {
    addWebUIListener('pref-change-listener', res => {
      prefsChangeListener(res)
    })
    getPrefsData()
  }, [
    getPrefsData,
    prefsChangeListener
  ])

  const putSearchEngineToLocalStore = useCallback((data, oldData) => {
    if (oldData) {
      // console.log('update search engine')
    } else {
      db.addDataByStore('userStore', { id: 'searchEngine', data }).then(res => {
        // console.log(res, data, 'add Search Engine By User Store')
        actions.setSearchEngine(data)
      }).catch(err => {
        console.error(err)
      })
    }
  }, [actions])

  const putSearchEngineDataToLocalStore = useCallback((data, oldData) => {
    if (oldData.length) {
      db.updateByStore('sysStore', { id: 'searchEngineList', ...data }).then(res => {
        // console.log('updateSearchEngineDataToLocalStore', res, data)
        actions.setSearchEngineList(data.data)
      }).catch(err => {
        console.error(err)
      })
    } else {
      db.addDataByStore('sysStore', { id: 'searchEngineList', ...data }).then(res => {
        // console.log('addSearchEngineDataToLocalStore', res, data, searchEngine)
        actions.setSearchEngineList(data.data)
      }).catch(err => {
        console.error(err)
      })
    }
  }, [ 
    actions
  ]);

  const putSiteDataToLocalStore = useCallback((data, oldData) => {
    // console.log(data, oldData)
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

  const addIndividuationDataToLocalStore = useCallback(data => {
    db.addDataByStore('userStore', { id: 'individuation', data }).then(() => {
      console.log('individuationData add success.')
    }).catch(err => {
      console.error('individuationData add error', err)
    })
  }, [])

  const addWallpaperToLocalStore = useCallback(data => {
    db.addDataByStore('userStore', { id: 'wallpaper', data }).then(() => {
      actions.setWallpaper(data)
    })
  }, [
    actions
  ])

  const putWallpaperDataToLocalStore = useCallback((data, oldData) => {
    if(oldData.version !== 0) {
      db.updateByStore('sysStore', { id: 'wallpaperData', ...data }).then(() => {
        actions.setWallpaperList(data.data)
      })
    }else{
      db.addDataByStore('sysStore', { id: 'wallpaperData', ...data }).then(() => {
        addWallpaperToLocalStore(data.data[0])
        actions.setWallpaperList(data.data)
      })
    }
  },[
    actions,
    addWallpaperToLocalStore
  ])

  /**
   * obj => { version, data }
   */
  const getHttpSearchEngineData = useCallback(obj => {
    // console.log(obj.version)
    api.getHttpSearchEngineData(obj.version).then(res => {
      let engineList = {
        data: JSON.parse(res.bd.d),
        version: res.bd.v
      };
      // console.log(111, engineList, res)
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
    // console.log(obj.version)
    api.getHttpSiteData(obj.version).then(res => {
      let siteList = {
        data: JSON.parse(res.bd.d),
        version: res.bd.v
      };
      // console.log('getHttpSiteData', siteList, res)
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
      // console.log('getHttpHotwords', res, options)
      if(res) {
        putHotwordsToLocalStore(res, options.data)
      }
    }).catch(err => {
      console.error(err)
    })
  }, [
    putHotwordsToLocalStore
  ])

  const getHttpWallpaperData = useCallback(options => {
    api.getHttpWallpaperData(options).then(res => {
      console.log('getHttpWallpaperData', res)
      if(res.code === 0) {
        let wallpaperList = {
          data: JSON.parse(res.bd.d).sgf[0].cf,
          version: res.bd.v
        }
        console.log(wallpaperList, options)
        putWallpaperDataToLocalStore(wallpaperList, options)
      }
    }).catch(err => {
      if (err.message.indexOf('code 304')) {
        console.info('背景数据无更新')
      } else {
        console.error(err)
      }
    })
  }, [
    putWallpaperDataToLocalStore
  ])

  const getLocalHotwordList = useCallback((hotUrl) => {
    db.getDataById('sysStore', 'hotwords').then(res => {
      // console.log('getLocalHotwordList', res)
      let options = {
        updatetime: 0,
        data: [],
        hotUrl
      }
      if (res) {
        actions.setHotWordsList(res.data)
        options.data = res.data
        let difference = Date.parse(new Date()) / 1000 - res.updatetime
        // console.log(difference, res)
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

  const getLocalWallpaper = useCallback(() => {
    db.getDataById('userStore', 'wallpaper').then(res => {
      console.log('getLocalWallpaper', res)
      if(res) {
        actions.setWallpaper(res.data)
      }
    })
  },[
    actions
  ])

  const getLocalWallpaperList = useCallback(() => {
    db.getDataById('sysStore', 'wallpaperData').then(res => {
      console.log('getLocalWallpaperList', res)
      let options = {
        version: 0,
        data: []
      }
      if(res) {
        actions.setWallpaperList(res.data)
        options = res
      }
      getHttpWallpaperData(options)
    })
  },[
    actions,
    getHttpWallpaperData
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
      // console.log(222,res)
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

  const getLocalIndividuationData = useCallback(() => {
    db.getDataById('userStore', 'individuation').then(res => {
      if(res) {
        console.log(res)
        actions.setIndividuationData(res.data)
      }else{
        addIndividuationDataToLocalStore(individuationData)
      }
      // console.log('getLocalIndividuationData', res)
    }).catch(err => {
      console.error(err)
    })
  }, [
    actions,
    individuationData,
    addIndividuationDataToLocalStore
  ])

  useEffect(() => {
    if (!isConnected) {
      db.connectLocalDB().then(() => {
        setIsConnected(true)
        getLocalWallpaper()
        getLocalWallpaperList()
        getLocalSearchEngine()
        getLocalSearchEngineList()
        getLocalIndividuationData()
      }).catch(err => {
        console.error('connectLocalDB', err)
      })
    }
  }, [ 
    isConnected,
    getLocalWallpaper,
    getLocalWallpaperList,
    getLocalSearchEngineList,
    getLocalSearchEngine,
    getLocalIndividuationData
  ]);

  const mainClick_ = () => {
    setIsShowSysManege(false)
    actions.setIsShowSearchEngineList(false)
  }

  const doubleClick_ = e => {
    if (e.clientY > 60 && doubleClickIsShow) {
      if (skinTypeId !== 1) {
        if (chrome && chrome.send) {
          chrome.send('showNonClientAnimation', [isHiddenAll])
        }
      }
      setIsHiddenAll(!isHiddenAll)
    }
  }

  const mouseOver_ = e => {
    if(e.clientY < 50){
      if(isHiddenAll) {
        chrome.send('showNonClientAnimation', [isHiddenAll])
        setIsHiddenAll(!isHiddenAll)
      }
    }
  }
  
  
  return (
    <div className="main"
      onClick={ mainClick_ }
      onDoubleClick={ doubleClick_ }
      onMouseOver={ mouseOver_ }
      style={{
        '--theme-border-color': fontColor === '#222' ? 'rgba(0, 0, 0, 0.06)' : 'rgba(112, 112, 112, 0.36)',
        '--theme-bg-color': fontColor === '#222' ? 'rgba(255, 255, 255, 0.36)' : 'rgba(102, 102, 102, 0.36)',
        '--theme-font-color': fontColor === '#222' ? '#4e4e4e' : '#ededed',
      }}
    >
      {
        skinTypeId === 1 && isShowWallpaper &&
        <Background
          isConnected={isConnected}
          wallpaper={wallpaper}
        />
      }
      {
        !isEmptyCon && !isHiddenAll &&
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
      }
      
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