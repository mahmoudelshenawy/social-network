import axios from "axios";
import { GET_ISSUES, ADD_ISSUE, ISSUE_ERROR, DELETE_ISSUE } from "./types";

//get all issue
export const getAllIssues = () => async dispatch => {
	try {
		const res = await axios.get("/api/issue");
		dispatch({
			type: GET_ISSUES,
			payload: res.data
		});
	} catch (err) {
		dispatch({
			type: ISSUE_ERROR,
			payload: { msg: err.response.statusText, status: err.response.status }
		});
	}
};
