import {
	SIGNUP_DONE,
	SIGNUP_FAIL,
	LOGIN_DONE,
	LOGIN_FAIL,
	USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from "./types";
import setAuthToken from "../utils/setAuth";
import axios from "axios";
import { setAlert } from "./alert";
//load user
export const loadUser = () => async dispatch => {
	if (localStorage.token) {
		setAuthToken(localStorage.token);
	}
	try {
		const res = await axios.get("/api/auth");
		dispatch({
			type: USER_LOADED,
			payload: res.data
		});
	} catch (error) {
		dispatch({
			type: AUTH_ERROR
		});
	}
};

//Register user
export const register = ({
	name,
	email,
	password,
	location,
	speciality
}) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	const body = JSON.stringify({ name, email, password, location, speciality });
	try {
		const res = await axios.post("/api/users", body, config);
		dispatch({
			type: SIGNUP_DONE,
			payload: res.data
		});
		dispatch(loadUser());
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
		}
		dispatch({
			type: SIGNUP_FAIL
		});
	}
};

//login user
export const login = (email, password) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	const body = JSON.stringify({ email, password });
	try {
		const res = await axios.post("/api/auth", body, config);
		dispatch({
			type: LOGIN_DONE,
			payload: res.data
		});
		dispatch(loadUser());
	} catch (error) {
		const errors = error.response.data.errors;
		if (errors) {
			errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
		}
		dispatch({
			type: LOGIN_FAIL
		});
	}
};
//LOGOUT
export const logout = () => dispatch => {
  dispatch({type:LOGOUT})
};
