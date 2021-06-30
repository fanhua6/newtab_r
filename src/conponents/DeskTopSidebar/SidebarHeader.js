import React from 'react' 

const SidebarHeader = props => {
  const { closeSidebar, showAddSite, showSearchFn, isShowSearch } = props
  // console.log

  return (
    <div className="header">
      <div className="iconfont icon-gengduo-tianjia-px" title="添加自定义图标"
        onClick={ () => showAddSite() }
      ></div>
      <div className={[ 'iconfont', 'icon-gengduo-sousuo-px', isShowSearch ? 'active' : '' ].join(' ')}
        onClick={ () => showSearchFn() }
        title="搜索图标">
      </div>
      <div className="title">图标管理</div>
      <div className="iconfont icon-gengduo-guanbi-px" 
        onClick={() => closeSidebar()}
        title="关闭图标管理"
      ></div>
    </div>
  )
}

export default SidebarHeader