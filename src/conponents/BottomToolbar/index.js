import React from 'react' 
import './index.scss'
import { updateByStore } from '../../models/localDB'

const BottomToolbar = props => {
  const { 
    viewState,
    skinTypeId,
    wallpaper,
    wallpaperList,
    individuationData,
    actions 
  } = props

  const { isShowWallpaper } = individuationData

  // console.log(viewState, skinTypeId, wallpaper, wallpaperList)

  const showSidebar_ = e => {
    e.stopPropagation()
    actions.setIsShowSidebar(true)
  }

  const getIndex = () => {
    if (wallpaperList.length > 1) {
      for (let i = 0, len = wallpaperList.length; i < len; i++) {
        if (wallpaper.id === wallpaperList[i].id) {
          return i
        }
      }
    } else {
      return 0
    }
  }

  const changeWallpaper_ = () => {
    let index = getIndex()
    
    if ((index + 1) < wallpaperList.length) {
      index++
    }else{
      index = 0
    }
    let currentWallpaper = wallpaperList[index]
    updateByStore('userStore', { id: 'wallpaper', data: currentWallpaper }).then(res => {
      actions.setWallpaper(currentWallpaper)
    })
  }

  return (
    <div className="botton-toolbar">
      {
        viewState === 'desktop' &&
        <div className="btn-item"
          onClick={showSidebar_}
        >
          <span className="iconfont icon-configure-px"></span>
          <span className="info">图标管理</span>
        </div>
      }
      {
        skinTypeId === 1 && isShowWallpaper && wallpaper && wallpaper.pn && wallpaper.pa &&
        < div className="btn-item">
          <span className="iconfont icon-xinbiaoqian-banquantishi"></span>
          <span className="info wallpaper-info">{wallpaper.pn}(©{wallpaper.pa})</span>
        </div>
      }
      {
        skinTypeId === 1 && isShowWallpaper && wallpaperList.length > 1 &&
        <div className="btn-item"
          onClick={ changeWallpaper_ }
        >
          <span className="iconfont icon-gengduo-shuaxin-px"></span>
          <span className="info">切换壁纸</span>
        </div>
      }
    </div>
  )
}

export default BottomToolbar