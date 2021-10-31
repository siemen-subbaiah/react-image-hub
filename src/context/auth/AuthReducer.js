export const initialState = {
  user: localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null,
  loading: false,
  isError: false,
  errorText: '',
};

export const reducer = (state, action) => {
  switch (action.type) {
    case 'SIGNUP':
      return {
        ...state,
        user: action.payload,
        loading: false,
        isError: false,
      };
    case 'LOGIN':
      return {
        ...state,
        user: action.payload,
        loading: false,
        isError: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        isError: false,
        user: null,
      };
    case 'LOADING':
      return {
        ...state,
        loading: true,
      };
    case 'ERROR':
      return {
        ...state,
        loading: false,
        isError: true,
        errorText: action.payload,
      };
    default: {
      return state;
    }
  }
};
