import {
  ADD_TO_VIDEOSETS,
  REMOVE_FROM_VIDEOSETS,
  SELECT_VIDEOSET,
  SET_TITLE_TO_VIDEOSET,
  SET_ANG_TO_VIDEOSET,
  SET_FILE_TO_VIDEOSET,
  SET_LAT_TO_VIDEOSET,
  SET_LNG_TO_VIDEOSET,
} from '../actions/index';

const getVideoSets = () => {
  let videosets = localStorage.getItem("videosets");
  if (videosets) {
    return JSON.parse(videosets);
  } else {
    videosets = [
      {
        id: Date.now(),
        title: 'Nuevo Paradero',
        lat: -13.53027,
        lng: -71.96679,
        angle: 0,
        file:  ['',''],
        selected: true
      },
    ];
    saveToLocalStorage(videosets);
    return videosets;
  }
}

const saveToLocalStorage = videosets => {
  localStorage.setItem("videosets", JSON.stringify(videosets))
}

const videosets = (state = getVideoSets(), action) => {
  let newState;
  switch (action.type) {
    
    case ADD_TO_VIDEOSETS:
      const videosets = state.map(videoset => ({...videoset, selected: false}))
      newState = [
        ...videosets, {
          id: Date.now(),
          title: 'Nuevo Paradero',
          lat: -13.53027,
          lng: -71.96679,
          angle: 0,
          file: ['',''],
          selected: true
        }
      ];
      saveToLocalStorage(newState);
      return newState

    case REMOVE_FROM_VIDEOSETS:
      let sets = [...state]
      if (sets.length > 1) {
        let found = false
        sets.forEach(videoset => {
          if (!found && videoset.id != action.id) {
            videoset.selected = true
            found = true;
          }
        });
        newState = [
          ...sets.filter(videoset => videoset.id !== action.id),
        ];
        saveToLocalStorage(newState)
        return newState
      }
      return state

    case SELECT_VIDEOSET:
      newState = [
        ...state.map(videoset => ({
          ...videoset, selected: videoset.id == action.id ? true : false
        }))
      ]
      saveToLocalStorage(newState)
      return newState

    case SET_TITLE_TO_VIDEOSET:
      newState = [
        ...state.map(videoset => ({
          ...videoset, title: videoset.id == action.id ? action.title : videoset.title
        }))
      ]
      saveToLocalStorage(newState)
      return newState

    case SET_LAT_TO_VIDEOSET:
      const selVideoset = state.filter(videoset => videoset.selected == true)[0]
      selVideoset.lat=action.lat
      const videosetLat = selVideoset.lat;

      newState = [
        ...state.map(videoset => ({
          ...videoset, lat: videoset.selected == true ? videosetLat : videoset.lat
        }))
      ]
      saveToLocalStorage(newState)
      return newState
    
    case SET_LNG_TO_VIDEOSET:
      const selVideosetl = state.filter(videoset => videoset.selected == true)[0]
      selVideosetl.lng=action.lng
      const videosetLng = selVideosetl.lng;

      newState = [
        ...state.map(videoset => ({
          ...videoset, lng: videoset.selected == true ? videosetLng : videoset.lng
        }))
      ]
      saveToLocalStorage(newState)
      return newState  
    
    case SET_ANG_TO_VIDEOSET:
      const selVideoseta = state.filter(videoset => videoset.selected == true)[0]
      selVideoseta.angle=action.angle
      const videosetAngle = selVideoseta.angle;

      newState = [
        ...state.map(videoset => ({
          ...videoset, angle: videoset.selected == true ? videosetAngle : videoset.angle
        }))
      ]
      saveToLocalStorage(newState)
      return newState

    case SET_FILE_TO_VIDEOSET:
      const selVideosetf = state.filter(videoset => videoset.selected == true)[0]
      selVideosetf.file=action.file
      const videosetFile = selVideosetf.file;

      newState = [
        ...state.map(videoset => ({
          ...videoset, file: videoset.selected == true ? videosetFile : videoset.file
        }))
      ]
      saveToLocalStorage(newState)
      return newState

    default:
      return state;
  }
};

export default videosets;