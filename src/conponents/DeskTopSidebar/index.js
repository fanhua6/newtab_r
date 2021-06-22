import React, { useState } from 'react' 
import './index.scss'
import SidebarHeader from './SidebarHeader'
import SearchBox from './SearchBox'
import AddCustomSiteManege from './AddCustomSiteManege/'

const DeskTopSidebar = props => {
  const { 
    actions
  } = props

  const [ isShowAddSite, setIsShowAddSite ] = useState(false),
        [ isShowSearch, setIsShowSearch ] = useState(false),
        [ searchText, setSearchText ] = useState('');

  console.log(actions)

  return (
    <div className="desktop-sidebar">
      <SidebarHeader 
        closeSidebar={() => actions.setIsShowSidebar(false) }
        showAddSite={ () => setIsShowAddSite(true) }
      />

      <SearchBox 
        searchText={ searchText }
      />

      <div className="sidebar-con-box">
        custom AddCustomSiteManege
      </div>

      <AddCustomSiteManege
        isShowAddSite={isShowAddSite}
        closeAddSite={() => setIsShowAddSite(false)}
      />
    </div>
  )
}

export default DeskTopSidebar