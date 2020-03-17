import {
	SIGNUP_DONE,
	SIGNUP_FAIL,
	USER_LOADED,
	LOGIN_DONE,
	LOGIN_FAIL,
  AUTH_ERROR,
  LOGOUT
} from "../components/actions/types";

const initialState = {
	token: localStorage.getItem("token"),
	isAuth: false,
	user: {},
	loading: true
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuth: true,
				loading: false,
				user: payload
			};
		case SIGNUP_DONE:
		case LOGIN_DONE:
      	localStorage.setItem("token", payload.token);
			return {
				...state,
				...payload,
				isAuth: true,
				loading: false
			};
		case SIGNUP_FAIL:
		case LOGIN_FAIL:
		case AUTH_ERROR:
      case LOGOUT:
			localStorage.removeItem("token");
			return {
				...state,
				token: null,
				isAuth: false,
				loading: false
			};
		default:
			return state;
	}
}
