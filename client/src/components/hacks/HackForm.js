import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addHack } from "../actions/hacks";
const HackForm = ({ addHack }) => {
	const [formData, setFormData] = useState({
		topic: "",
		advice: ""
	});
	const { topic, advice } = formData;
	const onChange = e =>
		setFormData({ ...formData, [e.target.name]: e.target.value });
	const onSubmit = e => {
		e.preventDefault();
		addHack({ topic, advice });
		setFormData({
			topic: "",
			advice: ""
		});
	};
	return (
		<div className='container'>
			<div className='row'>
				<div className='col-sm-10 mx-auto hack-form'>
					<form onSubmit={e => onSubmit(e)}>
						<input
							type='text'
							required
							name='topic'
							value={topic}
							onChange={e => onChange(e)}
							placeholder='specify your topic.. '
						/>
						<textarea
							name='advice'
							className='form-control'
							placeholder='add your advice'
							value={advice}
							onChange={e => onChange(e)}></textarea>

						<button type='submit' className='submit'>
							submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

HackForm.propTypes = {
	addHack: PropTypes.func.isRequired
};

export default connect(null, { addHack })(HackForm);
