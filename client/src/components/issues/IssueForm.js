import React, { useState } from "react";
import PropTypes from "prop-types";

const IssueForm = props => {
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-sm-10 mx-auto comment-form'>
					<form>
						<textarea
							name='text'
							className='form-control'
							placeholder='add your issue...'></textarea>

						<button type='submit' className='submit'>
							submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

IssueForm.propTypes = {};

export default IssueForm;
