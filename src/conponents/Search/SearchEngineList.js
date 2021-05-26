import React from 'react'
import SearchEngineItem from './SearchEngineItem'

const SearchEngineList = props => {
  const { data, setSearchEngine } = props
  
  return (
    <div className="search-engine-list">
      {
        data.map(item => {
          return (
            <SearchEngineItem
              data={item}
              key={item.id}
              setSearchEngine={setSearchEngine}
            />
          )
        })
      }
    </div>
  )
}

export default SearchEngineList