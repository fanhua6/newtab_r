import './index.scss';
import SearchBox from '../../containers/common/Search'

function SimplePage (props) {
  const { fontColor } = props;
  return (
    <div className="simple" style={{ color: fontColor }}>
      <div className="search-box">
        <SearchBox />
      </div>
    </div>
  )
}

export default SimplePage;