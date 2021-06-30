import React, { useState, useEffect, useCallback } from 'react'
import './index.scss'
import * as db from '../../models/localDB/'
import { getHttpSiteData } from '../../models/httpServer'
import { compare } from '../../utils/common'
import SearchBox from  '../../containers/common/Search'
import DeskTopSidebar from '../../containers/DesktopPage/Sidebar'
import UserShortcut from '../../conponents/UserShortcut/'

function DesktopPage (props) {
  const { 
    fontColor,
    isShowSidebar,
    isConnected,
    actions
  } = props;

  const [ userShortcutList, setUserShortcutList ] = useState([]),
        [ shortcutPageIndex, setShortcutPageIndex ] = useState(0);

  const formatUserShortcutList = useCallback(list => {
    list.push({
      _id: 'addItemBtn',
      ic: '',
      t: '更多'
    })
    console.log(list)
    let userShortcutList = []
    const pageNum = 9
    list.forEach((item, index) => {
      let p = Math.floor(index / pageNum)
      if(!userShortcutList[p]) {
        userShortcutList[p] = []
      }

      userShortcutList[p].push(item)
    })
    console.log(userShortcutList)
    return userShortcutList
  }, [])

  const getLocalUserShortcutList = useCallback(() => {
    db.getDataById('userStore', 'shortcutList').then(res => {
      if(res) {
        setUserShortcutList(formatUserShortcutList(res.data))
      }else{
        // 没查询到数据
        console.log('not userShortcutList')
      }
    }).catch(err => {
      console.error(err)
    })
  }, [
    formatUserShortcutList
  ])

  const initUserShortcurDB = useCallback((sysShortcutList, version) => {
    let list = sysShortcutList.filter(i => i.ir === 1)
    list = list.sort(compare('pp', false))
    console.log(list)
    db.addDataByStore('userStore', { id: 'shortcutList', data: list }).then(() => {
      setUserShortcutList(formatUserShortcutList(list))
      db.addDataByStore('sysStore', { id: 'shortcutVersion', version })
    }).catch(err => {
      console.error(err)
    })
  },[
    formatUserShortcutList
  ])

  const updataShortcutData = useCallback(newShortcutList => {
    console.log(123123, newShortcutList)
    return new Promise((resolve, reject) => {
      db.getDataById('userStore', 'shortcutList').then(res => {
        let ids = []
        res.data.map(i => ids.push(i._id))

        newShortcutList.map(i => i.using = ids.indexOf(i._id) !== -1)

        db.updateByStore('sysStore', { id: 'sysShortcutList', data: newShortcutList }).then(res => {
          resolve(res)
        }).catch(err => reject(err))
      }).catch(err => reject(err))
    })
  },[
  ])

  const getHttpShortcatData = useCallback(version => {
    getHttpSiteData(version - 1).then(res => {
      if(res && res.code === 0) {
        // console.log(JSON.parse(res.bd.d), res.bd.v)
        let sysShortcutTypes = JSON.parse(res.bd.d).gcf, 
            sysShortcutList = JSON.parse(res.bd.d).cf;

        sysShortcutList.sort(compare('pp', false))
        sysShortcutTypes.sort(compare('p', false))
        sysShortcutTypes.unshift({
          _id: 'good',
          t: '精选'
        })
        console.log(sysShortcutList)
        if(version === 0) {
          // 初始化时设置using属性
          sysShortcutList.map(i => 
            i.using = i.ir === 1
          )

          Promise.all([
            db.addDataByStore('sysStore', { id: 'sysShortcutTypes', data: sysShortcutTypes }),
            db.addDataByStore('sysStore', { id: 'sysShortcutList', data: sysShortcutList })
          ]).then(() => {
            initUserShortcurDB(sysShortcutList, res.bd.v)
          })
        }else{
          Promise.all([
            // 此处不能直接覆盖，需更新
            db.updateByStore('sysStore', { id: 'sysShortcutTypes', data: sysShortcutTypes }),
            updataShortcutData(sysShortcutList)
          ]).then(res2 => {
            console.log(res2)
            db.updateByStore('sysStore', { id: 'shortcutVersion', value: res.bd.v })
            // 此处还需要更新用户数据
          })
        }
      }
    }).catch(err => {
      if (err.message.indexOf('code 304')) {
        console.info('快捷方式数据无更新')
      }else{
        console.error(err)
      }
    })
  },[
    initUserShortcurDB,
    updataShortcutData
  ])

  const getLocalSysShortcutVersion = useCallback(() => {
    db.getDataById('sysStore', 'shortcutVersion').then(res => {
      getHttpShortcatData(res ? res.value : 0)
    }).catch(err => {
      console.error(err)
    })
  }, [getHttpShortcatData])

  useEffect(() => {
    if(isConnected) {
      getLocalUserShortcutList()
      getLocalSysShortcutVersion()
    }
  }, [
    isConnected,
    getLocalUserShortcutList,
    getLocalSysShortcutVersion
  ])

  const setIsShowSidebar_ = () => {
    actions.setIsShowSidebar(false)
  }

  const addUserShortcutList = useCallback(item => {
    console.log(item)
    // setUserShortcutList(userShortcutList.push(item))
    // setUserShortcutList(formatUserShortcutList(userShortcutList.push(item)))
    getLocalUserShortcutList()
  }, [
    getLocalUserShortcutList
  ])
  
  return (
    <div className="desktop" 
      style={{ color: fontColor }}
      onClick={ setIsShowSidebar_ }
    >
      <div className={['content', isShowSidebar ? 'show-sidebar' : '' ].join(' ')}>
        <div className="search-box">
          <SearchBox />
        </div>

        {
          userShortcutList.length > 0 &&
          <UserShortcut 
            userShortcutList = { userShortcutList }
            isShowSidebar = { isShowSidebar }
            shortcutPageIndex = { shortcutPageIndex }
          />
        }
      </div>
      <div className={['desktop-sidebar-box', isShowSidebar ? 'show-sidebar' : ''].join(' ')}
        onClick={ e => { e.stopPropagation() } }
      >
        {/* <DeskTopSidebar 
            isConnected={ isConnected }
          /> */}
        {
          isShowSidebar && 
          <DeskTopSidebar 
            isConnected={ isConnected }
            addUserShortcutList = { item => addUserShortcutList(item) }
          />
        }
      </div>
    </div>
  )
}

export default DesktopPage;