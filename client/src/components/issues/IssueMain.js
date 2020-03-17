import React, { useEffect } from "react";
import PropTypes from "prop-types";
import IssueForm from "./IssueForm";
import { FaCodeBranch, FaCheck } from "react-icons/fa";
import { connect } from "react-redux";
import { getAllIssues } from "../actions/issue";
import Spinner from "../layouts/Spinner";
import OneIssue from "./OneIssue";
const IssueMain = ({ getAllIssues, issue: { issues, loading } }) => {
	useEffect(() => {
		getAllIssues();
	}, [getAllIssues]);
	return loading && issues.length === 0 ? (
		<Spinner />
	) : (
		<div className='issue-section'>
			<div className='container'>
				<h1 className='py-1 text-white'>
					Issue Section <FaCodeBranch />
				</h1>
				<p className='lead text-white dev-info my-1'>
					<FaCheck /> add your issues , bugs and problem here and let other
					developer help you{" "}
				</p>
				<IssueForm />
				<div className='issue my-2'>
					{issues.map(issue => (
						<OneIssue key={issue._id} issue={issue} />
					))}
				</div>
				)
			</div>
		</div>
	);
};

IssueMain.propTypes = {
	getAllIssues: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	issue: state.issue
});
export default connect(mapStateToProps, { getAllIssues })(IssueMain);
