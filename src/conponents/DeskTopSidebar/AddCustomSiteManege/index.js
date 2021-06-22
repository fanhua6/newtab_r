import React, { useState, useEffect } from 'react' 
import './index.scss'

const AddCustomSiteManege = props => {
  const { 
    isShowAddSite,
    closeAddSite
  } = props

  const [ addSiteUrl, setAddSiteUrl ] = useState(''),
        [ addSiteName, setAddSiteName ] = useState(''),
        [ addSiteBackgroundColor, setAddSiteBackgroundColor ] = useState('#0179fd');
  
  const bgColors = [
    '#0179fd',
    '#925afd',
    '#66d73b',
    '#ffcc53',
    '#ff9300',
    '#f31918'
  ]

  return (
    <div className={['add-custom-site-manege', isShowAddSite ? 'show' : '' ].join(' ')}>
      <div className="close-btn-box">
        <span className="iconfont icon-gengduo-guanbi-px"
          onClick={ () => closeAddSite() }
        ></span>
      </div>
      
    </div>
  )
}

export default AddCustomSiteManege