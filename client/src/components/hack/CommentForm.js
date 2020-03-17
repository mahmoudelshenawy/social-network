import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addComment } from "../actions/hacks";
const CommentForm = ({ hackId, addComment }) => {
	const [text, setText] = useState("");
	const onSubmit = e => {
		e.preventDefault();
		addComment(hackId, { text });
		setText("");
	};
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-sm-10 mx-auto comment-form'>
					<form onSubmit={e => onSubmit(e)}>
						<textarea
							name='text'
							className='form-control'
							placeholder='add your comment'
							value={text}
							onChange={e => setText(e.target.value)}></textarea>

						<button type='submit' className='submit'>
							submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

CommentForm.propTypes = {
	addComment: PropTypes.func.isRequired
};

export default connect(null, { addComment })(CommentForm);
