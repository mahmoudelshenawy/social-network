import { combineReducers } from "redux";
import alert from "./alert";
import auth from "./auth";
import profile from "./profile";
import avatar from "./avatar";
import hacks from "./hacks";
import issue from "./issue";
export default combineReducers({
	alert,
	auth,
	profile,
	avatar,
	hacks,
	issue
});
