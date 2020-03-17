import {
	ADD_AVATAR,
	GET_AVATAR,
	GET_ALL_AVATAR,
	AVATAR_ERROR
} from "../components/actions/types";

const initialState = {
	avatars: [],
	avatar: "",
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_AVATAR:
			return {
				...state,
				avatars: [...state.avatars, payload],
				loading: false
			};
		case GET_AVATAR:
			return {
				...state,
				avatar: payload,
				loading: false
			};
		case GET_ALL_AVATAR:
			return {
				...state,
				avatars: payload,
				loading: false
			};
		case AVATAR_ERROR:
			return {
				...state,
				loading: false,
				error: payload
			};
		default:
			return state;
	}
}
