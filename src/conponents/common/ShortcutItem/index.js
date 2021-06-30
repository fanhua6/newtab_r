import React from 'react' 
import './index.scss'

const ShortcutItem = props => {
  const { item, clickCall, children } = props

  // console.log(children)

  return (
    <div className="shortcut-item" 
      onClick={ () => clickCall(item) }
      title={ item.t }>
      <div className={[ 'shortcut-icon', item._id === 'addItemBtn' ? 'add-item-btn' : '' ].join(' ')}
        style={{ backgroundImage: `url(${ item.ic })` }}
      >
        {
          item._id === 'addItemBtn' ?
          <div className="iconfont icon-gengduo-tianjia-px"></div> :
          children
        }
      </div>
      <div className="shortcut-title">{ item.t }</div>
    </div>
  )
}

export default ShortcutItem