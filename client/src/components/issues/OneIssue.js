import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaTrash } from "react-icons/fa";
const OneIssue = ({ issue: { issue } }) => {
	return (
		<div className='issue-card col-lg-8 col-md-8 col-sm-10 mx-auto'>
			<h3 className='py-1 text-white dev-info'>{issue}</h3>
			<button className='btn btn-danger trash'>
				<FaTrash className='' />
			</button>
			<butt className='btn btn-info'>answer </butt>
		</div>
	);
};

OneIssue.propTypes = {};
export default connect()(OneIssue);
