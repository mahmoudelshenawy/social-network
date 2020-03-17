import axios from "axios";
import {
	GET_HACKS,
	ADD_HACK,
	GET_HACK,
	HACKS_ERROR,
	UPDATE_LIKE,
	REMOVE_HACK,
	ADD_COMMENT,
	REMOVE_COMMENT
} from "./types";
import { setAlert } from "./alert";

//Get All Hacks
export const getHacks = () => async dispatch => {
	try {
		const res = await axios.get("/api/advice");
		dispatch({
			type: GET_HACKS,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: HACKS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//Get one hack
export const getHack = id => async dispatch => {
	try {
		const res = await axios.get(`/api/advice/${id}`);
		dispatch({
			type: GET_HACK,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: HACKS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//Add hack
export const addHack = (topic, advice) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	const formData = JSON.stringify(topic, advice);
	try {
		const res = await axios.post("/api/advice", formData, config);
		dispatch({
			type: ADD_HACK,
			payload: res.data
		});
		dispatch(setAlert("your hacks has been added", "success"));
	} catch (err) {
		dispatch({
			type: HACKS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//add like on hack
export const addLike = id => async dispatch => {
	try {
		const res = await axios.put(`/api/advice/like/${id}`);
		dispatch({
			type: UPDATE_LIKE,
			payload: { id, likes: res.data }
		});
	} catch (err) {
		dispatch({
			type: HACKS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//remove like on hack
export const removeLike = id => async dispatch => {
	try {
		const res = await axios.put(`/api/advice/unlike/${id}`);
		dispatch({
			type: UPDATE_LIKE,
			payload: { id, likes: res.data }
		});
	} catch (err) {
		dispatch({
			type: HACKS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//remove hack
export const deleteHack = id => async dispatch => {
	try {
		await axios.delete(`/api/advice/${id}`);
		dispatch({
			type: REMOVE_HACK,
			payload: id
		});
		dispatch(setAlert("your hack has been deleted", "danger"));
	} catch (err) {
		dispatch({
			type: HACKS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//add comment
export const addComment = (hackId, formData) => async dispatch => {
	const config = {
		headers: {
			"Content-Type": "application/json"
		}
	};
	try {
		const res = await axios.post(
			`/api/advice/comment/${hackId}`,
			formData,
			config
		);
		dispatch({
			type: ADD_COMMENT,
			payload: res.data
		});
		dispatch(setAlert("Comment added", "success"));
	} catch (err) {
		dispatch({
			type: HACKS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};

//delete comment
export const deleteComment = (hackId, commentId) => async dispatch => {
	try {
		await axios.delete(`/api/advice/comment/${hackId}/${commentId}`);
		dispatch({
			type: REMOVE_COMMENT,
			payload: commentId
		});
		dispatch(setAlert("comment deleted", "success"));
	} catch (err) {
		dispatch({
			type: HACKS_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};
