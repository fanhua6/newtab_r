import React, { useEffect } from 'react' 
import './index.scss'
import UserShortcutPage from './UserShortcutPage'

const UserShortcut = props => {
  const { userShortcutList, isShowSidebar } = props
  
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
        page list
      </div>
    </div>
  )
}

export default UserShortcut