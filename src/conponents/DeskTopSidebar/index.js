import React, { useState, useEffect, useCallback } from 'react' 
import './index.scss'
import * as db from '../../models/localDB/'
import SidebarHeader from './SidebarHeader'
import SearchBox from './SearchBox'
import AddCustomSiteManege from './AddCustomSiteManege/'
import ShortcutTypes from './ShortcutTypes/'
import ShortcutItem from '../common/ShortcutItem'

const DeskTopSidebar = props => {
  const { 
    isConnected,
    addUserShortcutList,
    actions
  } = props

  const [ isShowAddSite, setIsShowAddSite ] = useState(false),
        [ isShowSearch, setIsShowSearch ] = useState(false),
        [ searchText, setSearchText ] = useState(''),
        [ sysShortcutTypes, setSysShortcutTypes ] = useState([]),
        [ sysShortcutList, setSysShortcutList ] = useState([]),
        [ currentTypeId, setCurrentTypeId ] = useState('good'),
        [ currentShortcutList, setCurrentShortcutList ] = useState([]);

  const getLocalSysShortcutList = useCallback(() => {
    db.getDataById('sysStore', 'sysShortcutList').then(res => {
      console.log(res)
      setSysShortcutList(res.data)
    }).catch(err => {
      console.error(err)
    })
  }, [])

  const getLocalSysShortcutTypes = useCallback(() => {
    db.getDataById('sysStore', 'sysShortcutTypes').then(res => {
      setSysShortcutTypes(res.data)
    }).catch(err => {
      console.error(err)
    })
  }, [])

  useEffect(() => {
    if(isShowSearch) {
      if(searchText.length) {
        setCurrentShortcutList(sysShortcutList.filter(i => i.t.indexOf(searchText) > -1 && !i.using))
      }else{
        setCurrentShortcutList(sysShortcutList.filter(i => !i.using))
      }
    }else{
      if(sysShortcutList.length > 0) {
        if(currentTypeId === 'good') {
          console.log(sysShortcutList.filter(i => i.ih))
          setCurrentShortcutList(sysShortcutList.filter(i => i.ih && !i.using))
        }else{
          setCurrentShortcutList(sysShortcutList.filter(i => i.gid === currentTypeId && !i.using))
        }
      }
    }
  }, [
    isShowSearch,
    searchText,
    currentTypeId, 
    sysShortcutList
  ])

  useEffect(() => {
    if(isConnected) {
      getLocalSysShortcutTypes()
      getLocalSysShortcutList()
    }
  }, [
    isConnected,
    getLocalSysShortcutList,
    getLocalSysShortcutTypes
  ])

  const clickCall_ = item => {
    for(let i of sysShortcutList.values()) {
      if(i._id === item._id) {
        i.using = true
        break
      }
    }

    console.log(sysShortcutList)

    db.getDataById('userStore', 'shortcutList').then(userShortcutList => {
      console.log(userShortcutList)
      userShortcutList.data.push(item)
      Promise.all([
        db.updateByStore('sysStore', { id: 'sysShortcutList', data: sysShortcutList }),
        db.updateByStore('userStore', { id: 'shortcutList', data: userShortcutList.data })
      ]).then(() => {
        addUserShortcutList(item)
        getLocalSysShortcutList()
      }).catch(err => {
        console.error(err)
      })
    })
    // console.log(sysShortcutList)
    

    // addUserShortcutList(item)
  }

  return (
    <div className="desktop-sidebar">
      <SidebarHeader 
        closeSidebar={() => actions.setIsShowSidebar(false) }
        showAddSite={ () => setIsShowAddSite(true) }
        showSearchFn={ () => setIsShowSearch(!isShowSearch) }
        isShowSearch={isShowSearch}
      />

      <SearchBox 
        searchText={ searchText }
        isShowSearch={isShowSearch}
        setSearchText={ text => setSearchText(text) }
      />

      <div className="sidebar-con-box">
        {
          !isShowSearch &&
          <div className="shortcut-types-box">
            <ShortcutTypes 
              sysShortcutTypes={ sysShortcutTypes }
              currentTypeId={ currentTypeId }
              setCurrentTypeId={ id => setCurrentTypeId(id) }
            />
          </div>
        }
        {
          currentShortcutList.length === 0 ?
          <div className="shortcut-empty">
            <div className="iconfont icon-ss_fond"></div>
            <div className="shortcut-empty-info">没有符合条件的图标了...</div>
          </div> :
          <div className="shortcut-list-box">
            {
              currentShortcutList.map(i => 
                <div className="sidebar-shortcut-item"
                  key={i._id}
                >
                  <ShortcutItem 
                    item = { i }
                    clickCall={ i => clickCall_(i) }
                  />
                </div>
              )
            }
          </div>
        }
      </div>

      <AddCustomSiteManege
        isShowAddSite={isShowAddSite}
        closeAddSite={() => setIsShowAddSite(false)}
      />
    </div>
  )
}

export default DeskTopSidebar