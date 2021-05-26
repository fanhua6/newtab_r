import React from 'react'
import { updateByStore } from '../../models/localDB'

const SearchEngineItem = props => {
  const { data, setSearchEngine } = props

  const setSearchEngine_ = () => {
    updateByStore('userStore', { id: 'searchEngine', data }).then(res => {
      setSearchEngine(data)
    }).catch(err => {
      console.error(err)
    })
  }

  return (
    <div className="search-engine-item"
      onClick={ setSearchEngine_ }
    >
      <span className="item-icon" style={{ 'backgroundImage': `url(${data.ic})` }}>
        {/* <img src={data.ic} /> */}
      </span>
      <span className="item-title">{data.t}</span>
    </div>
  )
}

export default SearchEngineItem