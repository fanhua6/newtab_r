import React from 'react'

const PromptItem = props => {
  const { type, item, index, promptIndex, searchEngine, setPromptIndex } = props
  // console.log(setPromptIndex)

  const toSearchEngine = () => {
    let url = encodeURI(searchEngine.m + (type === 'hotword' ? item.keyword : item.q))
    window.open(url)
  }
  return (
    <div onMouseMove={() => setPromptIndex(index) }
      onClick={() => toSearchEngine() }
      className={['prompt-item', promptIndex === index ? 'active' : ''].join(' ')}
    >
      {
        type === 'hotword' ? 
        <>
            <span className={['item-icon', index < 4 ? 'red' : ''].join(' ')}>{index}</span>
            <span>{ item.keyword }</span>
            {
              item.iconnew === 1 ? <span className="new-icon">new</span> : ''
            }
        </> : 
        <>
            <span className="item-icon iconfont icon-search-px"></span>
            <span>{item.q}</span>
        </>
      }
    </div>
  )
}

export default PromptItem