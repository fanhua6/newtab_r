import React from 'react'

const SkinTabs = props => {
  const { skinTabs, currentSkinTabId, changeCurrentSkinTabId } = props

  const toWebSkin = () => {
    window.open('https://skin.minibai.com')
  }
  
  return (
    <div className="skin-tabs">
      {
        skinTabs.length && skinTabs.map(i => 
          <span className={[ 'skin-tab-item', currentSkinTabId === i.id ? 'active' : '' ].join(' ')}
            onClick={() => changeCurrentSkinTabId(i.id) }
            key={i.id}>
            {i.t}
          </span>
        )
      }
      <span className="skin-tab-item iconfont icon-more-px"
        onClick={ () => toWebSkin() }
      ></span>
    </div>
  )
}

export default SkinTabs