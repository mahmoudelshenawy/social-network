import axios from "axios";
import { ADD_AVATAR, GET_AVATAR, AVATAR_ERROR, GET_ALL_AVATAR } from "./types";

//add the avatar to the data base

export const addAvatar = formData => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	};
	try {
		const res = await axios.post("/api/img", formData, config);
		dispatch({
			type: ADD_AVATAR,
			payload: res.data
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: AVATAR_ERROR,
			payload: error
		});
	}
};
//get the fucking avatar
const arrayBufferToBase64 = buffer => {
	var binary = "";
	var bytes = [].slice.call(new Uint8Array(buffer));
	bytes.forEach(b => (binary += String.fromCharCode(b)));
	return window.btoa(binary);
};

export const getImgProfile = () => async dispatch => {
	try {
		const res = await axios.get("/api/img");
		const base64Flag = "data:image/jpg;base64,";
		const imageStr = arrayBufferToBase64(res.data.img.data.data);
		const image = base64Flag + imageStr;
		dispatch({
			type: GET_AVATAR,
			payload: image
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: AVATAR_ERROR,
			payload: error
		});
	}
};

//get all avatars
export const getAllAvatars = () => async dispatch => {
	try {
		const res = await axios.get("/api/profiles");
		const avatars = res.data.map(imag => {
			const base64Flag = "data:image/jpg;base64,";
			const imageStr = arrayBufferToBase64(imag.img.data.data);
			const image = base64Flag + imageStr;
			return { ...imag, image };
		});
		dispatch({
			type: GET_ALL_AVATAR,
			payload: avatars
		});
	} catch (error) {
		console.error(error);
		dispatch({
			type: AVATAR_ERROR,
			payload: error
		});
	}
};
