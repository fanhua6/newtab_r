import React, { useState, useEffect } from 'react'
import './index.scss'
import { compare } from '../../utils/common'
import { getSkinData } from '../../models/httpServer'
import SysMageneTab from './SysManegeTab'
import Skin from './Skin/Skin'
import Individuation from '../../containers/SysManege/Individuation'
import { sendWithPromise } from '../../utils/cr.m'

const SysManege = props => {
  const { isShow, closeSysManege, actions } = props
  const [ sysType, setSysType ] = useState('skin'),
        [ skinTabs, setSkinTabs ] = useState([]),
        [ currentSkinTabId, setCurrentSkinTabId ] = useState(''),
        [ skinData, setSkinData ] = useState([]);


  useEffect(() => {
    sendWithPromise('getPref', 'browser.skin_id').then(res => {
      actions.setCurrentSkinId(res)
    })
    sendWithPromise('getPref', 'browser.skin_loading_id').then(res => {
      actions.setLoadingSkinId(res)
    })
  }, [
    actions
  ])

  useEffect(() => {
    // console.log('currentSkinTabId', currentSkinTabId)
    getSkinData(currentSkinTabId).then(res => {
      if(res.code === 0) {
        if(currentSkinTabId === '') {
          setCurrentSkinTabId(res.bd[0].id)
          setSkinTabs(res.bd.sort(compare('p')).reverse())
        }else{
          setSkinData(res.bd)
        }
      }
    }).catch(err => {
      console.error(err)
    })
  }, [
    currentSkinTabId
  ])

  return (
    <div className={['sys-manage-body', isShow ? 'show' : ''].join(' ')}
      onClick={ e => e.stopPropagation() }
    >
      <span className="iconfont icon-gengduo-shuqian-quxiao-px"
        onClick={() => closeSysManege() }
      ></span>
      <SysMageneTab
        sysType={sysType}
        setSysType={type => setSysType(type)}
      />
      <div className="sys-manege-con">
        {
          sysType === 'skin' ?
            <Skin skinTabs={skinTabs}
              currentSkinTabId={currentSkinTabId}
              skinData={skinData}
              changeCurrentSkinTabId={id => setCurrentSkinTabId(id)}
            />
            : <Individuation />
        }
      </div>
      {/* {
        isShow && 
        <>
          <SysMageneTab
            sysType={sysType}
            setSysType={type => setSysType(type)}
          />
          <div className="sys-manege-con">
            {
              sysType === 'skin' ? 
                <Skin skinTabs={skinTabs} 
                  currentSkinTabId={currentSkinTabId}
                  skinData={skinData}
                  changeCurrentSkinTabId={ id => setCurrentSkinTabId(id) }
                />
                : <Individuation />
            }
          </div>
        </>
      } */}
    </div>
  )
}

export default SysManege