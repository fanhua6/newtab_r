import React from 'react' 
import './index.scss'

const BottomToolbar = props => {

  return (
    <div className="botton-toolbar">
      <div className="btn-item">
        <span className="iconfont icon-configure-px"></span>
      </div>
      <div className="btn-item">
        <span className="iconfont icon-xinbiaoqian-banquantishi"></span>
      </div>
      <div className="btn-item">
        <span className="iconfont icon-gengduo-shuaxin-px"></span>
      </div>
    </div>
  )
}

export default BottomToolbar