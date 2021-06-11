import React, { useEffect } from 'react'
import './index.scss'

const Background = props => {
  const { isConnected, wallpaper } = props

  useEffect(() => {
    if (isConnected) {
      console.log('background', isConnected)
    }
  },[
    isConnected
  ])
  console.log(wallpaper)
  return (
  <div className="bg-box"
    style={{ backgroundImage: `url(${wallpaper ? wallpaper.ic : ''})` }}
  >
  </div>
  )
}

export default Background;