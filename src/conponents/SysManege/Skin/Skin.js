import React from 'react'
import SkinTabs from './SkinTabs'
import SkinList from './SkinList'

const Skin = props => {
  const { 
    skinTabs, 
    skinData, 
    currentSkinTabId, 
    changeCurrentSkinTabId
  } = props
  
  return (
    <div className="skin-body">
      <SkinTabs skinTabs={skinTabs}
        currentSkinTabId={currentSkinTabId}
        changeCurrentSkinTabId={changeCurrentSkinTabId}
      />
      <SkinList
        skinData={skinData}
      />
    </div>
  )
}

export default Skin