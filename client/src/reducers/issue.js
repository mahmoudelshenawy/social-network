import {
	GET_ISSUES,
	ADD_ISSUE,
	DELETE_ISSUE,
	ISSUE_ERROR
} from "../components/actions/types";

const initialState = {
	issues: [],
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_ISSUES:
			return {
				...state,
				issues: payload,
				loading: false
			};
		default:
			return state;
	}
}
