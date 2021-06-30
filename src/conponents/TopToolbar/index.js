import React, { useCallback } from 'react'
import './index.scss';
import * as db from '../../models/localDB/'

const TopToolbar = props => {
  const { fontColor, viewState, viewStateList, showSysManege, actions } = props,
        { changeViewState } = actions;

  const changeViewState_ = val => {
    db.updateByStore('userStore', { id: 'viewState', value: val }).then(() => {
      changeViewState(val)
    }).catch(err => {
      console.error(err)
    })
  }

  const showSysManege_ = e => {
    e.stopPropagation()
    showSysManege(e)
  }

  return (
    <div className="tool-box" style={{ 'color': fontColor }}>
      {
        viewStateList.map(i => <span key={i.id}
          className={['iconfont', i.className, i.value === viewState ? 'active' : '' ].join(' ')}
          onClick={ () => changeViewState_(i.value) }
          ></span>)
      }
      <span className="line"></span>
      <span className="text-btn" onClick={ e => showSysManege_(e) }>个性化</span>
    </div>
  )
}

export default TopToolbar;