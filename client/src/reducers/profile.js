import {
	ADD_PROFILE,
	PROFILE_ERROR,
	GET_PROFILES
} from "../components/actions/types";

const initialState = {
	profiles: [],
	profile: null,
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_PROFILE:
			return {
				...state,
				profile: payload,
				loading: false
			};
		case GET_PROFILES:
			return {
				...state,
				profiles: payload,
				loading: false
			};
		case PROFILE_ERROR:
			return {
				...state,
				profile: null,
				loading: false
			};
		default:
			return state;
	}
}
