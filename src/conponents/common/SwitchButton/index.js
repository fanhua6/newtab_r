import React from 'react'
import style from './index.module.scss'

const SwitchButton = props => {
  const { value, onChange } = props

  return (
    <div className={style.switchBox}>
      <label>
        <input type="checkbox" 
          defaultChecked={value} 
          onChange={ () => onChange(!value) } 
          hidden
        />
        <div className={[style.switch, value ? style.active : ''].join(' ')}>
          <span className={style.switchBall}></span>
        </div>
      </label>
    </div>
  )
}

export default SwitchButton