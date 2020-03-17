import React, { useState } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import { setAlert } from "../actions/alert";
import { register } from "../actions/auth";
import { connect } from "react-redux";
import Alert from "../layouts/Alert";
const Signup = ({ setAlert, register, isAuth }) => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
		location: "",
		speciality: ""
	});
	const { name, email, password, password2, location, speciality } = formData;
	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onSubmit = async e => {
		e.preventDefault();
		if (password !== password2) {
			setAlert("passwords do not match", "danger");
		} else {
			register({ name, email, password, location, speciality });
			setFormData({
				name: "",
				email: "",
				password: "",
				password2: "",
				location: "",
				speciality: ""
			});
		}
	};
	//redirect if registered
	if (isAuth) {
		return <Redirect to='/dashboard' />;
	}
	return (
		<section className='signup-section'>
			<div className='signup-overlay'>
				<div className='container'>
					<div className='row'>
						<div className='col-10 mx-auto'>
							<div className='signup-inner'>
								<Alert className='my-1' />
								<h1 className='py-1  text-center lobster'> sign up </h1>{" "}
								<form onSubmit={e => onSubmit(e)}>
									<input
										type='text'
										required
										name='name'
										value={name}
										onChange={e => onChange(e)}
										placeholder='username...'
									/>
									<input
										type='email'
										required
										name='email'
										value={email}
										onChange={e => onChange(e)}
										placeholder='email...'
									/>
									<select
										name='speciality'
										value={speciality}
										onChange={e => onChange(e)}>
										<option value='0'> * Select Professional Status </option>{" "}
										<option value='Developer'> Developer </option>{" "}
										<option value='Junior Developer'> Junior Developer </option>{" "}
										<option value='Senior Developer'> Senior Developer </option>{" "}
										<option value='Manager'> Manager </option>{" "}
										<option value='Student or Learning'>
											Student or Learning{" "}
										</option>{" "}
										<option value='Instructor'> Instructor or Teacher </option>{" "}
										<option value='Intern'> Intern </option>{" "}
										<option value='Other'> Other </option>{" "}
									</select>
									<input
										type='text'
										placeholder='Location'
										value={location}
										onChange={e => onChange(e)}
										name='location'
									/>
									<small className='form-text ml-4'>
										City & state suggested(eg.Boston, MA){" "}
									</small>
									<input
										type='password'
										required
										name='password'
										value={password}
										onChange={e => onChange(e)}
										placeholder='password...'
									/>
									<input
										type='password'
										required
										name='password2'
										placeholder='confirm password...'
										value={password2}
										onChange={e => onChange(e)}
									/>
									<button type='submit' className='submit'>
										submit{" "}
									</button>{" "}
								</form>{" "}
								<p className='my-1 text-center'>
									Already have an account ? <Link to='/login'> Sign In </Link>{" "}
								</p>{" "}
							</div>{" "}
						</div>{" "}
					</div>{" "}
				</div>{" "}
			</div>{" "}
		</section>
	);
};

Signup.propTypes = {
	setAlert: PropTypes.func.isRequired,
	register: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	isAuth: state.auth.isAuth
});
export default connect(mapStateToProps, { setAlert, register })(Signup);
