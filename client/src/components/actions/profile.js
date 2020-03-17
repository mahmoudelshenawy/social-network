import axios from "axios";
import { ADD_PROFILE, PROFILE_ERROR, GET_PROFILES } from "./types";
import { setAlert } from "./alert";

//create and update profile
export const createProfile = (
	formData,
	history,
	edit = false
) => async dispatch => {
	try {
		const config = {
			headers: {
				"Content-Type": "application/json"
			}
		};
		const res = await axios.post("/api/profile", formData, config);
		dispatch({
			type: ADD_PROFILE,
			payload: res.data
		});
		if (!edit) {
			history.push("/dashboard");
		}
	} catch (err) {
		const errors = err.response.data.errors;
		if (errors) {
			errors.forEach(err => dispatch(setAlert(err.msg, "danger")));
		}
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//Get All Profile
export const getAllProfiles = () => async dispatch => {
	try {
		const res = await axios.get("/api/profile");
		dispatch({
			type: GET_PROFILES,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};
