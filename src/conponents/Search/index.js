import { useState, useRef, useEffect } from 'react';
import { getAssociationalWords } from '../../models/httpServer'
import './index.scss';
import SearchEngineList from './SearchEngineList'
import SearchPrompt from './SearchPrompt'

const SearchBox = props => {
  const [ searchText, setSearchText ] = useState(''),
        [ isFocus, setIsFocus ] = useState(false),
        [ promptIndex, setPromptIndex ] = useState(0),
        [ associationalWords, setAssociationalWords ] = useState([]),
        [ isHaveTips, setIsHaveTips ] = useState(false),
        [ tipsType, setTipsType ] = useState('hotwords'),
        searchTextRef = useRef();

  const {
    searchEngine,
    searchEngineList,
    isShowSearchEngineList,
    hotWordsList,
    individuationData,
    actions
  } = props;

  const { isOpenHotword } = individuationData
  
  const associationUrl = searchEngine ? searchEngine.hl : '';

  // useEffect(() => {
  //   console.log(tipsType)
  //   if (searchText && tipsType === 'associational') {
  //     // console.log(associationUrl, searchText)
  //     getAssociationalWords({ associationUrl, searchText }).then(res => {
  //       console.log('getAssociationalWords', res)
  //       setAssociationalWords(res.g || [])
  //     }).catch(err => {
  //       console.log(err)
  //     })
  //   }
  // }, [
  //   searchText,
  //   associationUrl,
  //   tipsType
  // ])

  const getAssociationalWords_ = (searchText, type) => {
    // console.log(1111, type, associationUrl, searchText)
    if (searchText && type === 'associational') {
      setPromptIndex(0)
      getAssociationalWords({ associationUrl, searchText }).then(res => {
        // console.log('getAssociationalWords', res)
        setAssociationalWords(res.g || [])
      }).catch(err => {
        console.error(err)
      })
    }
  }

  const keyDownFn_ = e => {
    switch (e.keyCode) {
      case 40:
        computePromptIndex(1)
        break;
      case 38:
        computePromptIndex(-1)
        break;
      case 13:
        window.open(searchEngine.m + searchText)
        break;
      default:
        
        break;
    }
  }

  const computePromptIndex = action => {
    // console.log(action, promptIndex, hotWordsList.length, tipsType)
    let i = 0;
    let text = '';
    if ( tipsType === 'hotwords' && hotWordsList.length) {
      if(promptIndex === hotWordsList.length && action === 1) {
        i = 1
      }else if(promptIndex === 1 && action === -1){
        i = hotWordsList.length
      }else{
        i = promptIndex + action
      }
      text = hotWordsList[i - 1].keyword
    } else if (tipsType === 'associational' && associationalWords.length) {
      if(promptIndex === associationalWords.length && action === 1) {
        i = 1
      }else if(promptIndex === 1 && action === -1) {
        i = associationalWords.length
      }else{
        i = promptIndex + action
      }
      text = associationalWords[i - 1].q
    }
    setSearchText(text)
    searchTextRef.current.value = text
    setTimeout(() => {
      searchTextRef.current.setSelectionRange(text.length, text.length)
    }, 0)
    setPromptIndex(i)
  }

  const keyupFn_ = e => {
    // console.log('keyupFn_', e.target.value)
    if(e.keyCode !== 40 && e.keyCode !== 38) {
      let inputValue_ = e.target.value.trim();
      let type = inputValue_ ? 'associational' : 'hotwords';
      // console.log(11111, inputValue_, type, e)
      setTipsType(type)
      setSearchText(inputValue_)
      
      if(inputValue_) {
        getAssociationalWords_(inputValue_, type)
      }
    }else{
    }
  }
  
  const showEngineList_ = e => {
    actions.setIsShowSearchEngineList(!isShowSearchEngineList)
    e.stopPropagation()
  }

  useEffect(() => {
    // setPromptIndex(0)
    if ((searchText === '' || tipsType === 'hotwords') && isFocus && isOpenHotword && hotWordsList.length) {
      setIsHaveTips(true)
    } else if (tipsType === 'associational' && searchText.length && isFocus && associationalWords.length){
      setIsHaveTips(true)
    }else{
      setIsHaveTips(false)
    }
  }, [
    searchText,
    isFocus,
    tipsType,
    hotWordsList,
    associationalWords,
    isOpenHotword
  ])
  
  const inputOnBlur_ = () => {
    setTimeout(() => {
      setIsFocus(false)
    }, 200)
  }

  const inputOnFocus_ = e => {
    setIsFocus(true)
    setPromptIndex(0)
    setTipsType(searchText ? 'associational' : 'hotwords')
    setTimeout(() => {
      e.target.select()
    }, 100)
  }

  const clearInputSearchText_ = () => {
    setSearchText('')
    searchTextRef.current.value = ''
    setPromptIndex(0)
  }

  return (
    <div className="search">
      <div className={['search-body', isHaveTips ? 'tips' : ''].join(' ')}
        style={{ borderColor: isFocus ? '#009aff' : 'rgba(0,0,0,.1)' }}
      >
        <div className="search-engine-box">
          <div className="search-engine"
            style={{ backgroundImage: `url(${searchEngine ? searchEngine.ic : ''})` }}
            onClick={showEngineList_ }></div>
          {
            isShowSearchEngineList && searchEngineList.length > 0 &&
            <SearchEngineList 
              data={searchEngineList} 
              setSearchEngine={actions.setSearchEngine}
            />
          }
        </div>
        
        <div className="search-input">
          <input id="searchInput"
            ref={searchTextRef}
            placeholder="搜索"
            autoComplete="off"
            autoFocus={isFocus}
            onFocus={(e) => inputOnFocus_(e) }
            onBlur={() => inputOnBlur_() }
            defaultValue={searchText}
            onKeyDown={e => keyDownFn_(e)}
            onKeyUp={e => keyupFn_(e)}
            type="text" />
        </div>
        {
          searchText ? 
          <div className="iconfont icon-gengduo-shuqian-quxiao-px"
            onClick={() => { clearInputSearchText_() } }
          ></div>
          : ''
        }
        <div className="iconfont icon-search-px"
          style={{ color: isFocus ? '#009aff' : '#222' }}
          onClick={ () => { window.open(searchEngine.m + searchText) } }
        ></div>
      </div>
      {
        isFocus && <SearchPrompt
          hotWordsList={hotWordsList}
          searchText={searchText}
          searchEngine={searchEngine}
          promptIndex={promptIndex}
          associationalWords={associationalWords}
          tipsType={tipsType}
          individuationData={individuationData}
          setPromptIndex={ i => setPromptIndex(i) }
        />
      }
      
    </div>
  )
}

export default SearchBox;