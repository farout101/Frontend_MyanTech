import {
  AUTH_LOGIN_REQUEST,
  AUTH_LOGIN_SUCCESS,
  AUTH_LOGIN_FAILURE,
} from "../actions/authActions";

const initialState = {
  token: localStorage.getItem("authToken") || null, // Get token from localStorage if it exists
  loading: false,
  error: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_LOGIN_REQUEST:
      return { ...state, loading: true };
    case AUTH_LOGIN_SUCCESS:
      return { ...state, loading: false, token: action.payload };
    case AUTH_LOGIN_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
};

export default authReducer;
