import React, { useState } from 'react'
import './index.scss'
import SysMageneTab from './SysManegeTab'

const SysManege = props => {
  const { isShow, closeSysManege } = props
  const [ sysType, setSysType ] = useState('skin')

  return (
    <div className={['sys-manage-body', isShow ? 'show' : ''].join(' ')}
      onClick={ e => e.stopPropagation() }
    >
      <span className="iconfont icon-gengduo-shuqian-quxiao-px"
        onClick={() => closeSysManege() }
      ></span>
      {
        isShow && 
        <>
          <SysMageneTab
            sysType={sysType}
            setSysType={type => setSysType(type)}
          />
          <div className="sys-manege-con">
            {
              sysType === 'skin' ? 
              'skin'
                : 'individuation'
            }
          </div>
        </>
      }
    </div>
  )
}

export default SysManege