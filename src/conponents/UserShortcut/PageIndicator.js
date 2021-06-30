import React from 'react' 

const PageIndicator = props => {
  const { count, shortcutPageIndex } = props

  const list = new Array(count).fill(1)
  console.log(list)

  return (
    <div className="page-indicator">
      {
        list.map((item, index) => 
          <span key={index}
            className={['page-indicator-item', index === shortcutPageIndex ? 'active' : ''].join(' ')}
          ></span>
        )
      }
    </div>
  )
}

export default PageIndicator