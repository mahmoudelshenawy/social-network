import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Navbar from "./components/layouts/Navbar";
import Landing from "./components/layouts/Landing";
import Signup from "./components/auth/Signup";
import Login from "./components/auth/Login";
import PrivateRoute from "./components/routing/PrivateRoute";
import CreateProfile from "./components/profile/CreateProfile";
//Redux
import { Provider } from "react-redux";
import store from "./store";
import Developers from "./components/developers/Developers";
import { loadUser } from "./components/actions/auth";
import { getAllAvatars } from "./components/actions/avatar";
import setAuthToken from "./components/utils/setAuth";
import Main from "./components/dashboard/Main";
import Hacks from "./components/hacks/Hacks";
import Hack from "./components/hack/Hack";
import IssueMain from "./components/issues/IssueMain";
if (localStorage.token) {
	setAuthToken(localStorage.token);
}

function App() {
	useEffect(() => {
		store.dispatch(loadUser());
		store.dispatch(getAllAvatars());
	}, []);
	return (
		<Provider store={store}>
			<Router>
				<Navbar />
				<Switch>
					<Route exact path='/' component={Landing} />
					<Route exact path='/signup' component={Signup} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/developers' component={Developers} />
					<PrivateRoute exact path='/dashboard' component={Main} />
					<PrivateRoute
						exact
						path='/create-profile'
						component={CreateProfile}
					/>
					<PrivateRoute exact path='/hacks' component={Hacks} />
					<PrivateRoute exact path='/hacks/:id' component={Hack} />
					<PrivateRoute exact path='/issues' component={IssueMain} />
				</Switch>
			</Router>
		</Provider>
	);
}

export default App;
