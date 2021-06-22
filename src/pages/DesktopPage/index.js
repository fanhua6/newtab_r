import { useState } from 'react'
import './index.scss'
import SearchBox from  '../../containers/common/Search'
import DeskTopSidebar from '../../containers/DesktopPage/Sidebar'

function DesktopPage (props) {
  const { 
    fontColor,
    isShowSidebar,
    actions
  } = props;

  const setIsShowSidebar_ = () => {
    actions.setIsShowSidebar(false)
  }
  
  return (
    <div className="desktop" 
      style={{ color: fontColor }}
      onClick={ setIsShowSidebar_ }
    >
      <div className={['content', isShowSidebar ? 'show-sidebar' : '' ].join(' ')}>
        <div className="search-box">
          <SearchBox />
        </div>
      </div>
      <div className={['desktop-sidebar-box', isShowSidebar ? 'show-sidebar' : ''].join(' ')}
        onClick={ e => { e.stopPropagation() } }
      >
        {
          isShowSidebar && 
          <DeskTopSidebar />
        }
      </div>
    </div>
  )
}

export default DesktopPage;