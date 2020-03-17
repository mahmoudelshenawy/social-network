import React from "react";
import { DiCodeigniter } from "react-icons/di";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
const Landing = ({ isAuth }) => {
	if (isAuth) {
		return <Redirect to='dashboard' />;
	}
	return (
		<div className='landing'>
			<div className='landing-overlay'>
				<div className='landing-inner text-white text-center'>
					<h1 className='landing-main py-1'>
						<DiCodeigniter className='mb-2 mr-1' />
						Stack Underflow
					</h1>
					<p className='lead'>
						here you can share your ideas , issues with so many developers and
						create a professional profile
					</p>
					<div className='landing-links'>
						<a href='/signup' className='link py-1'>
							signup
						</a>
						<a href='/login' className='link py-1'>
							login
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};
const mapStateToProps = state => ({
	isAuth: state.auth.isAuth
});
export default connect(mapStateToProps)(Landing);
