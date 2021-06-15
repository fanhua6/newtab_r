import React from 'react' 
import './index.scss'

const BottomToolbar = props => {
  // const {  } = props

  const showSidebar_ = e => {
    console.log(e)
    e.stopPropagation()
  }

  return (
    <div className="botton-toolbar">
      <div className="btn-item"
        onClick={ showSidebar_ }
      >
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