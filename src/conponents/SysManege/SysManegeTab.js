import React from 'react';

const SysMageneTab = props => {
  const { sysType, setSysType } = props

  const tabs = [
    { id: 1, title: '精选皮肤', value: 'skin' },
    { id: 2, title: '个性化设置', value: 'individuation' }
  ]
  return (
    <div className="sys-tab">
      {
        tabs.map(i => 
          <span className={['tab-item', sysType === i.value ? 'active' : '' ].join(' ')} 
            onClick={ () => {
              if(sysType !== i.value) {
                setSysType(i.value)
              }
            } }
            key={i.id}>
            {i.title}
          </span>
        )
      }
    </div>
  )
}

export default SysMageneTab