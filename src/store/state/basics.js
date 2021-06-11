
const initialState = {
  viewState: 'desktop',
  wallpaper: null,
  wallpaperList: [],
  fontColor: '#222',
  viewStateList: [
    {
      id: 1,
      title: '桌面模式',
      className: 'icon-complete-px',
      value: 'desktop'
    },
    {
      id: 2,
      title: '极简模式',
      className: 'icon-gengduo-sousuo-px',
      value: 'simple'
    },
  ],
  currentSkinId: '',
  skinTypeId: 0,
  loadingSkinId: '',
  individuationData: {
    doubleClickIsShow: true,
    isShowWallpaper: true,
    skinPlayMode: true,
    isEmptyCon: false,
    isOpenHotword: true
  }
};

export default initialState;