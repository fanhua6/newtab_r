import React, { useEffect } from 'react' 
import './index.scss'
import UserShortcutPage from './UserShortcutPage'
import PageIndicator from './PageIndicator'

const UserShortcut = props => {
  const { userShortcutList, isShowSidebar, shortcutPageIndex } = props
  
  return (
    <div className="user-shortcut">
      <div className="user-shortcut-page-box">
        {
          userShortcutList.length > 0 &&
          userShortcutList.map((pageList, index) => 
            <UserShortcutPage 
              key={ index }
              pageList = { pageList }
              isShowSidebar = { isShowSidebar }
            />
          )
        }
      </div>

      <div className="page-list">
        {
          userShortcutList.length > 1 &&
          <PageIndicator 
            count = { userShortcutList.length }
            shortcutPageIndex = { shortcutPageIndex }
          />
        }
      </div>
    </div>
  )
}

export default UserShortcut