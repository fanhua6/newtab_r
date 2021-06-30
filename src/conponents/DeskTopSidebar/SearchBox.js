import React from 'react' 

const SearchBox = props => {
  const { isShowSearch, setSearchText } = props

  const changeSearchText_ = (e) => {
    setSearchText(e.target.value)
  }

  return (
    <div className={[ 'search-box', isShowSearch ? 'show' : '' ].join(' ')}>
      <input type="text" 
        className="search-input"
        placeholder="搜索图标"
        onChange={ changeSearchText_ }
        autoFocus
      />
    </div>
  )
}

export default SearchBox