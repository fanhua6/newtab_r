import React from 'react' 
import ShortcutItem from '../common/ShortcutItem/'

const UserShortcutPage = props => {
  const { pageList, isShowSidebar } = props

  const clickCall_ = item => {
    console.log(item)
  }

  const removeUserShortcutItem = (e, item) => {
    e.stopPropagation()
    console.log('remove', item)
  }

  return (
    <div className="user-shortcut-page">
      {
        pageList.map(item => 
          <div className={[ 'user-shortcut-item', isShowSidebar ? 'edit' : '' ].join(' ')}
            key={item._id}>
            <ShortcutItem 
              item={item}
              clickCall={ i => clickCall_(i) }
            >
              <div className="remove-btn"
                onClick={ (e) => removeUserShortcutItem(e, item) }
              ></div>
            </ShortcutItem>
            
          </div>
        )
      }
    </div>
  )
}

export default UserShortcutPage