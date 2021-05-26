import React from 'react'

import PromptItem from './PromptItem'

const SearchPrompt = props => {
  const { hotWordsList, searchText, searchEngine, promptIndex, setPromptIndex, tipsType, associationalWords } = props;
        // [ associationalWords, setAssociationalWords ] = useState([]);
  // const associationUrl = searchEngine ? searchEngine.hl : '';
  // console.log(setPromptIndex)
  // useMemo(() => {
  //   if(searchText) {
  //     // console.log(associationUrl, searchText)
  //     getAssociationalWords({ associationUrl, searchText}).then(res => {
  //       console.log('getAssociationalWords', res)
  //       setAssociationalWords(res.g || [])
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //   }
  // }, [
  //   searchText,
  //   associationUrl
  // ])
  
  return (
    <div className="search-prompt">
      {
        tipsType === 'associational' ?
        (associationalWords.length ?
        <div className="prompt-box">
          {
            associationalWords.map((i, key) => 
              <PromptItem
                type="associationalWord"
                key={key}
                item={i}
                index={key + 1}
                searchEngine={searchEngine}
                promptIndex={promptIndex}
                setPromptIndex={setPromptIndex}
              />
            )
          }
        </div> : '')
        : (hotWordsList.length ? 
        <div className="prompt-box">
          {
            hotWordsList.map((i, key) => (
              <PromptItem
                type="hotword"
                key={key}
                item={i}
                index={key + 1}
                searchEngine={searchEngine}
                promptIndex={promptIndex}
                setPromptIndex={setPromptIndex}
              />
            ))
          }
        </div> : '')
      }
    </div>
  )
}

export default SearchPrompt