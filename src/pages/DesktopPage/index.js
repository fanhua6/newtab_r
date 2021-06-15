import { useState } from 'react'
import './index.scss'
import SearchBox from  '../../containers/common/Search'

function DesktopPage (props) {
  const { 
    fontColor 
  } = props;
  const [ isShowSidebar, setIsShowSidebar ] = useState(false);
  
  return (
    <div className="desktop" 
      style={{ color: fontColor }}
      onClick={ () => { setIsShowSidebar(false) } }
    >
      <div className={['content', isShowSidebar ? 'show-sidebar' : '' ].join(' ')}>
        <div className="search-box">
          <SearchBox />
        </div>
      </div>
      <div className={['desktop-sidebar', isShowSidebar ? 'show-sidebar' : ''].join(' ')}>
        desktop-sidebar
      </div>
    </div>
  )
}

export default DesktopPage;