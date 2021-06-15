import React, { useEffect, useCallback } from 'react'
import * as db from '../../models/localDB'
import * as api from '../../models/httpServer'
import './index.scss'

const Background = props => {
  const { isConnected, wallpaper, actions } = props

  const addWallpaperToLocalStore = useCallback(data => {
    db.addDataByStore('userStore', { id: 'wallpaper', data }).then(() => {
      actions.setWallpaper(data)
    })
  }, [
    actions
  ])

  const putWallpaperDataToLocalStore = useCallback((data, oldData) => {
    if (oldData.version !== 0) {
      db.updateByStore('sysStore', { id: 'wallpaperData', ...data }).then(() => {
        actions.setWallpaperList(data.data)
      })
    } else {
      db.addDataByStore('sysStore', { id: 'wallpaperData', ...data }).then(() => {
        addWallpaperToLocalStore(data.data[0])
        actions.setWallpaperList(data.data)
      })
    }
  }, [
    actions,
    addWallpaperToLocalStore
  ])

  const getHttpWallpaperData = useCallback(options => {
    api.getHttpWallpaperData(options).then(res => {
      console.log('getHttpWallpaperData', res)
      if (res.code === 0) {
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

  const getLocalWallpaper = useCallback(() => {
    db.getDataById('userStore', 'wallpaper').then(res => {
      console.log('getLocalWallpaper', res)
      if (res) {
        actions.setWallpaper(res.data)
      }
    })
  }, [
    actions
  ])

  const getLocalWallpaperList = useCallback(() => {
    db.getDataById('sysStore', 'wallpaperData').then(res => {
      console.log('getLocalWallpaperList', res)
      let options = {
        version: 0,
        data: []
      }
      if (res) {
        actions.setWallpaperList(res.data)
        options = res
      }
      getHttpWallpaperData(options)
    })
  }, [
    actions,
    getHttpWallpaperData
  ])

  useEffect(() => {
    if (isConnected) {
      getLocalWallpaper()
      getLocalWallpaperList()
    }
  },[
    isConnected,
    getLocalWallpaper,
    getLocalWallpaperList
  ])
  
  return (
    <div className="bg-box"
      style={{ backgroundImage: `url(${wallpaper ? wallpaper.ic : ''})` }}
    >
    </div>
  )
}

export default Background;