import React, { useEffect } from 'react'
import { sendWithPromise } from '../../../utils/cr.m'
import SwitchButton from '../../common/SwitchButton/'
import { updateByStore } from '../../../models/localDB/'
// import IndividuationItem from './IndividuationItem'

const Individuation = props => {
  const { skinTypeId, individuationData, actions } = props
  const {
    doubleClickIsShow,
    isShowWallpaper,
    skinPlayMode,
    isEmptyCon,
    isOpenHotword
  } = individuationData

  // console.log('skinTypeId', skinTypeId, individuationData)
  useEffect(() => {
    updateByStore('userStore', { id: 'individuation', data: individuationData })
  }, [
    individuationData
  ])

  useEffect(() => {
    console.log('browser.dynamic_skin_play_mode', '此数据无')
    sendWithPromise('getPref', 'browser.dynamic_skin_play_mode').then(res => {
      console.log('browser.dynamic_skin_play_mode', res)
    }).catch(err => {
      console.info(err)
    })
  }, [actions])

  const switchChange = item => {
    switch (item.code) {
      case 'doubleClickIsShow':
        actions.setIndividuationData({ ...individuationData, doubleClickIsShow: item.value })
        break;
      case 'isShowWallpaper':
        actions.setIndividuationData({ ...individuationData, isShowWallpaper: item.value })
        break;
      case 'skinPlayMode':
        actions.setIndividuationData({ ...individuationData, skinPlayMode: item.value })
        break;
      case 'isEmptyCon':
        actions.setIndividuationData({ ...individuationData, isEmptyCon: item.value })
        break;
      case 'isOpenHotword':
        actions.setIndividuationData({ ...individuationData, isOpenHotword: item.value })
        break;
      default:
        break;
    }
  }

  return (
    <div className="individuation">
      <div className="individuation-item">
        <div className="item-title">双击空白隐藏/显示页面内容</div>
        <SwitchButton
          // key="doubleClickIsShow"
          value={doubleClickIsShow}
          onChange={value => switchChange({ code: "doubleClickIsShow", value })}
        />
      </div>
      {
        skinTypeId === 1 && 
        <div className="individuation-item">
          <div className="item-title">新标签页显示背景壁纸</div>
          <SwitchButton
            // key="isShowWallpaper"
            value={isShowWallpaper}
            onChange={value => switchChange({ code: "isShowWallpaper", value })}
          />
        </div>
      }
      {
        skinTypeId === 3 &&
        <div className="individuation-item">
          <div className="item-title">动态屏皮肤不间断播放</div>
          <SwitchButton
            // key="isShowWallpaper"
            value={skinPlayMode}
            onChange={value => switchChange({ code: "skinPlayMode", value })}
          />
        </div>
      }
      <div className="individuation-item">
        <div className="item-title">新标签页设置为空白页</div>
        <SwitchButton
          // key="doubleClickIsShow"
          value={isEmptyCon}
          onChange={value => switchChange({ code: "isEmptyCon", value })}
        />
      </div>
      <div className="individuation-item">
        <div className="item-title">搜索框隐藏热词推荐</div>
        <SwitchButton
          // key="doubleClickIsShow"
          value={isOpenHotword}
          onChange={value => switchChange({ code: "isOpenHotword", value })}
        />
      </div>
      {/* <IndividuationItem
        key="doubleClickIsShow"
        code="doubleClickIsShow"
        value={ doubleClickIsShow }
        title="双击空白隐藏/显示页面内容"
        onChange={item => changeIndividuationData(item)}
      /> */}
    </div>
  )
}

export default Individuation