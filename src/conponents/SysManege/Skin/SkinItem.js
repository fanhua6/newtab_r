import React, { useRef } from 'react'
import { sendWithPromise } from '../../../utils/cr.m'

const SkinItem = props => {
  const { item, currentSkinId, loadingSkinId, actions } = props,
        videoEl = useRef(null);

  const playVideo = () => {
    if (item.ti === 'type_3' && videoEl.current.paused) {
      videoEl.current.play()
    }
  }

  // console.log(currentSkinId, loadingSkinId, actions)

  const pausedVideo = () => {
    if (item.ti === 'type_3' && !videoEl.current.paused) {
      videoEl.current.pause()
    }
  }

  const changeSkin_ = skin => {
    let item = {
      id: skin.id || "",
      icon: skin.io || "",
      icon_url: skin.il || "",
      icon_md5: skin.md || "",
      skin_md5: skin.sm || "",
      skin_url: skin.su || "",
      skin_skin_type: parseInt(skin.ti.substr(skin.ti.length - 1)),
      skin_sidebar_color_type: skin.sc,
      skin_font_type: skin.ic,
      skin_mask_color: skin.hc,
      skin_mask_img: skin.hi,
      skin_sidebar_type: 0,
      icon_ver: skin.ic_vs || "",
      skin_ver: skin.sk_vs || "",
    }
    sendWithPromise('updateSkin', item).then(res => {
      console.log(res)
    }).catch(err => {
      console.info(err)
    })
  }

  return (
    <div className="skin-item" 
      style={{ backgroundImage: `url(${item.im})` }}
      onMouseOver={ () => playVideo() }
      onMouseOut={ () => pausedVideo() }
      onClick={() => changeSkin_(item) }
    >
      {
        item.ti === 'type_3' && item.pv &&
        <>
          <video className="item-video"
            height="136"
            src={item.pv}
            loop="loop"
            muted="muted"
            ref={ videoEl }
          />
          <span className="iconfont icon-videopx"></span>
        </>
      }
      {
        currentSkinId === item.id &&
        <span className="iconfont icon-Selection-px"></span>
      }
      {
        loadingSkinId === item.id && 
        <div className="loading"></div>
      }
    </div>
  )
}

export default SkinItem