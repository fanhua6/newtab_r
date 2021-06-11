import React, { useEffect } from 'react'
import SkinItem from '../../../containers/SysManege/Skin/SkinItem'

const SkinList = props => {
  const { skinData } = props
  // console.log(skinData)

  return (
    <div className="skin-list">
      <div className="skin-list-box">
        {
          skinData.length ?
            skinData.map(i =>
              <SkinItem
                key={i.id}
                item={i}
              />
            )
            :
            <div className="skin-empty">
              <div className="iconfont icon-ss_fond"></div>
              <div className="empty-text">没找到皮肤...</div>
            </div>
        }
      </div>
    </div>
  )
}

export default SkinList