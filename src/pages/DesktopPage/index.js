import { useState } from 'react'
import './index.scss'
import SearchBox from  '../../containers/common/Search'
import BottomToolbar from './BottomToolbar';

function DesktopPage (props) {
  const { viewState, fontColor } = props;
  const [ isShowSidebar, setIsShowSidebar ] = useState(false);

  const showSidebar_ = e => {
    setIsShowSidebar(!isShowSidebar)
    e.stopPropagation()
  }
  
  return (
    <div className="desktop" 
      style={{ color: fontColor }}
      onClick={ () => { setIsShowSidebar(false) } }
    >
      <div className={['content', isShowSidebar ? 'show-sidebar' : '' ].join(' ')}>
        <div className="search-box">
          <SearchBox />
        </div>
        <button onClick={ e => { showSidebar_(e) }}>click</button>
      </div>
      <div className={['desktop-sidebar', isShowSidebar ? 'show-sidebar' : ''].join(' ')}>
        desktop-sidebar
      </div>

      <BottomToolbar />
    </div>
  )
}

export default DesktopPage;