import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { DiCodeigniter, DiCode } from "react-icons/di";
import {
	FaRegUser,
	FaUserCheck,
	FaSignOutAlt,
	FaGlassCheers,
	FaCodeBranch
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { logout } from "../actions/auth";
const Navbar = ({ auth: { isAuth, loading }, logout }) => {
	const authLinks = (
		<ul className='nav-links d-flex justify-content-center align-items-center'>
			<Link to='/issues' className='nav-link'>
				<FaCodeBranch style={{ fontSize: "25px" }} className='' /> Issues
			</Link>
			<Link to='/hacks' className='nav-link'>
				<FaGlassCheers style={{ fontSize: "27px" }} className='' /> Hacks
			</Link>
			<Link to='/developers' className='nav-link'>
				<DiCode style={{ fontSize: "33px" }} className='' /> Developers
			</Link>
			<a href='#!' className='nav-link' onClick={logout}>
				<FaSignOutAlt style={{ fontSize: "20px" }} className='' /> Logout
			</a>
		</ul>
	);
	const guestLinks = (
		<ul className='nav-links d-flex justify-content-center align-items-center'>
			<Link to='/developers' className='nav-link'>
				<DiCode style={{ fontSize: "33px" }} className='' /> Developers
			</Link>
			<Link to='/signup' className='nav-link'>
				<FaRegUser /> Sign up
			</Link>
			<Link to='/login' className='nav-link'>
				<FaUserCheck /> login
			</Link>
		</ul>
	);
	return (
		<nav className='navbar bg-dark text-white'>
			<Link to='/' className='navbar-brand'>
				<DiCodeigniter className='mb-2 mr-1' />
				Stack underflow
				{/* <img
					src={avatar}
					class='img-fluid rounded-circle'
					style={{ width: "60px", height: "60px" }}
					alt=''
				/> */}
			</Link>
			{!loading && isAuth ? authLinks : guestLinks}
		</nav>
	);
};

Navbar.propTypes = {
	auth: PropTypes.object.isRequired,
	logout: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(mapStateToProps, { logout })(Navbar);
