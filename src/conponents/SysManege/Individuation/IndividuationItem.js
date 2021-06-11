import React from 'react'
import SwitchButton from '../../common/SwitchButton/'

const IndividuationItem = props => {
  const { code, value, title, onChange } = props
  console.log(code)
  const switchChange = value => {
    // console.log(item)
    onChange({ code, value })
  }

  return (
    <div className="individuation-item">
      <div className="item-title">{title}</div>
      <SwitchButton 
        value={value}
        onChange={ value => switchChange(value) }
      />
    </div>
  )
}

export default IndividuationItem