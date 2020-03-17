import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { login } from "../actions/auth";
import { connect } from "react-redux";
const Login = ({ login, isAuth }) => {
	const [formData, setFormData] = useState({
		email: "",
		password: ""
	});
	const { email, password } = formData;
	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onSubmit = async e => {
		e.preventDefault();
		login(email, password);
		setFormData({
			email: "",
			password: ""
		});
	};
	//redirect if logged in
	if (isAuth) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<section className='signup-section'>
			<div className='signup-overlay'>
				<div className='row margined'>
					<div className='container'>
						<div className='col-10 mx-auto signup-inner'>
							<h1 className='py-1  text-center lobster'>Login</h1>
							<form onSubmit={e => onSubmit(e)}>
								<input
									type='email'
									required
									name='email'
									value={email}
									onChange={e => onChange(e)}
									placeholder='email...'
								/>
								<input
									type='password'
									required
									name='password'
									value={password}
									onChange={e => onChange(e)}
									placeholder='password...'
								/>

								<button type='submit' className='submit'>
									submit
								</button>
							</form>
							<p className='my-1 text-center'>
								Don't have an account? <Link to='/signup'>Sign Up</Link>
							</p>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

Login.propTypes = {
	login: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	isAuth: state.auth.isAuth
});
export default connect(mapStateToProps, { setAlert, login })(Login);
