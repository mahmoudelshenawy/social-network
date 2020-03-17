import {
	GET_HACKS,
	ADD_HACK,
	GET_HACK,
	HACKS_ERROR,
	UPDATE_LIKE,
	REMOVE_HACK,
	ADD_COMMENT,
	REMOVE_COMMENT
} from "../components/actions/types";

const initialState = {
	hacks: [],
	hack: null,
	loading: true,
	error: {}
};

export default function(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case GET_HACKS:
			return {
				...state,
				hacks: payload,
				loading: false
			};
		case GET_HACK:
			return {
				...state,
				hack: payload,
				loading: false
			};
		case ADD_HACK:
			return {
				...state,
				hacks: [payload, ...state.hacks],
				loading: false
			};
		case UPDATE_LIKE:
			return {
				...state,
				hacks: state.hacks.map(hack =>
					hack._id === payload.id ? { ...hack, likes: payload.likes } : hack
				),
				loading: false
			};
		case REMOVE_HACK:
			return {
				...state,
				hacks: state.hacks.filter(hack => hack._id !== payload),
				loading: false
			};
		case ADD_COMMENT:
			return {
				...state,
				hack: { ...state.hack, comments: payload },
				loading: false
			};
		case REMOVE_COMMENT:
			return {
				...state,
				hack: {
					...state.hack,
					comments: state.hack.comments.filter(item => item.id !== payload)
				},
				loading: false
			};
		case HACKS_ERROR:
			return {
				...state,
				error: payload,
				loading: false
			};
		default:
			return state;
	}
}
