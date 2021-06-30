import React from 'react' 

const TypeItem = props => {
  const { 
    item,
    currentTypeId,
    setCurrentTypeId
  } = props
  
  return (
    <div className={[ 'type-item', currentTypeId === item._id ? 'active' : '' ].join(' ')}
      onClick={ () => setCurrentTypeId(item._id) }
    >
      { item.t }
    </div>
  )
}

export default TypeItem