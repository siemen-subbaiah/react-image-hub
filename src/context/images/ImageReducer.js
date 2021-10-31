export const initialState = {
  images: [],
  publicImages: [],
  imageDetails: {},
  loading: false,
  Iserror: false,
  errorText: '',
  imageUpload: null,
  upLoading: false,
  status: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'GET_IMAGES':
      return {
        ...state,
        images: action.payload,
        loading: false,
        Iserror: false,
      };
    case 'EDIT_IMAGE':
      return {
        ...state,
        images: state.images.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
        loading: false,
        Iserror: false,
      };
    case 'DELETE_IMAGE':
      return {
        ...state,
        images: state.images.filter((item) => item.id !== action.payload),
        loading: false,
        Iserror: false,
      };
    case 'GET_IMAGE_DETAILS':
      return {
        ...state,
        imageDetails: action.payload,
        loading: false,
        Iserror: false,
      };
    case 'GET_PUBLIC_IMAGES':
      return {
        ...state,
        publicImages: action.payload,
        loading: false,
        Iserror: false,
      };
    case 'UPLOAD_IMAGE':
      return {
        ...state,
        imageUpload: action.payload,
        upLoading: false,
        Iserror: false,
      };
    case 'UPLOAD_POST':
      return {
        ...state,
        images: [action.payload, ...state.images],
        loading: false,
        Iserror: false,
        imageUpload: null,
      };
    case 'SET_CURRENT':
      return {
        ...state,
        status: action.payload,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
        Iserror: false,
      };
    case 'UPLOAD_LOADING':
      return {
        ...state,
        upLoading: true,
        Iserror: false,
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        Iserror: true,
        errorText: action.payload,
      };
    // case 'LIKE':
    //   const newLikes = {
    //     id: action.payload,
    //     counter: (state.likeCount = state.likeCount + 1),
    //   };
    //   return {
    //     ...state,
    //     likes: [...state.likes, newLikes],
    //   };
    default:
      return state;
  }
};
