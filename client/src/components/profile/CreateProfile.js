import React, { useState } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createProfile } from "../actions/profile";
import { addAvatar } from "../actions/avatar";
import {
	FaUserAlt,
	FaFacebookSquare,
	FaTwitterSquare,
	FaLinkedin,
	FaMedium
} from "react-icons/fa";
const CreateProfile = ({ createProfile, history, addAvatar }) => {
	const [img, setImg] = useState("");
	const [formData, setFormData] = useState({
		company: "",
		degree: "",
		studyField: "",
		status: "",
		location: "",
		skills: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		medium: ""
	});
	const [display, toggleDisplay] = useState(false);
	const {
		company,
		degree,
		location,
		status,
		skills,
		studyField,
		bio,
		twitter,
		facebook,
		linkedin,
		medium
	} = formData;
	const onChange = e => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};
	const onSubmit = e => {
		e.preventDefault();
		createProfile(formData, history);
		const imgData = new FormData();
		imgData.append("img", img);
		addAvatar(imgData);
	};
	return (
		<div className='add-profile text-white py-4'>
			<div className='container'>
				<div className='col-9 mx-auto'>
					<h1 className='py-1'>Create Your Profile</h1>
					<p className='lead'>
						{" "}
						<FaUserAlt className='mr-1 mb-1' />
						let other developers and managers get to know you
					</p>
					<small>* = required field</small>
					<form onSubmit={e => onSubmit(e)}>
						<select
							name='status'
							value={status}
							onChange={e => onChange(e)}
							className='custom-select'>
							<option value='0'>* Select Professional Status</option>
							<option value='Developer'>Developer</option>
							<option value='Junior Developer'>Junior Developer</option>
							<option value='Senior Developer'>Senior Developer</option>
							<option value='Manager'>Manager</option>
							<option value='Student or Learning'>Student or Learning</option>
							<option value='Instructor'>Instructor or Teacher</option>
							<option value='Intern'>Intern</option>
							<option value='Other'>Other</option>
						</select>
						<small className='form-text'>
							Give us an idea of where you are at in your career
						</small>

						<input
							type='text'
							placeholder='Company'
							name='company'
							className='form-control'
							value={company}
							onChange={e => onChange(e)}
						/>
						<small className='form-text'>
							Could be your own company or one you work for
						</small>

						<div className='form-group'>
							<input
								type='text'
								placeholder='your degree'
								name='degree'
								value={degree}
								className='form-control'
								onChange={e => onChange(e)}
							/>
							<small className='form-text'>
								Could be your own or a company website
							</small>
						</div>
						<div className='form-group'>
							<input
								type='text'
								placeholder='your field of study'
								name='studyField'
								value={studyField}
								className='form-control'
								onChange={e => onChange(e)}
							/>
							<small className='form-text'>
								Could be your own or a company website
							</small>
						</div>
						<div className='form-group'>
							<input
								type='text'
								placeholder='Location'
								name='location'
								className='form-control'
								value={location}
								onChange={e => onChange(e)}
							/>
							<small className='form-text'>
								City & state suggested (eg. Boston, MA)
							</small>
						</div>
						<div className='form-group'>
							<input
								type='text'
								placeholder='* Skills'
								name='skills'
								className='form-control'
								value={skills}
								onChange={e => onChange(e)}
							/>
							<small className='form-text'>
								Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
							</small>
						</div>
						<div className='form-group'>
							<textarea
								placeholder='A short bio of yourself'
								name='bio'
								className='form-control'
								value={bio}
								onChange={e => onChange(e)}></textarea>
							<small className='form-text'>
								Tell us a little about yourself
							</small>
						</div>
						<div className='my-2'>
							<button
								type='button'
								className='btn btn-secondary my-3'
								onClick={() => toggleDisplay(!display)}>
								Add Social Network links
							</button>
							<span>Optional</span>
						</div>
						{display && (
							<>
								<div className='input-group mb-3 mt-2'>
									<div className='input-group-prepend'>
										<span className='input-group-text' id='basic-addon1'>
											<FaFacebookSquare />
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										placeholder='facebook'
										aria-label='Username'
										name='facebook'
										value={facebook}
										onChange={e => onChange(e)}
										aria-describedby='basic-addon1'
									/>
								</div>
								<div className='input-group mb-3 mt-2'>
									<div className='input-group-prepend'>
										<span className='input-group-text' id='basic-addon1'>
											<FaTwitterSquare />
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										placeholder='twitter'
										aria-label='twitter'
										name='twitter'
										value={twitter}
										onChange={e => onChange(e)}
										aria-describedby='basic-addon1'
									/>
								</div>
								<div className='input-group mb-3 mt-2'>
									<div className='input-group-prepend'>
										<span className='input-group-text' id='basic-addon1'>
											<FaLinkedin />
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										placeholder='linkedin'
										aria-label='Username'
										name='linkedin'
										value={linkedin}
										onChange={e => onChange(e)}
										aria-describedby='basic-addon1'
									/>
								</div>{" "}
								<div className='input-group mb-3 mt-2'>
									<div className='input-group-prepend'>
										<span className='input-group-text' id='basic-addon1'>
											<FaMedium />
										</span>
									</div>
									<input
										type='text'
										className='form-control'
										placeholder='medium'
										aria-label='Username'
										name='medium'
										value={medium}
										onChange={e => onChange(e)}
										aria-describedby='basic-addon1'
									/>
								</div>
							</>
						)}
						<div className='avatar-card'>
							<div className='input-group my-2 py-1 text-center'>
								<div className='input-group-prepend  '>
									<span className='input-group-text' id='inputGroupFileAddon01'>
										Add Profile
									</span>
								</div>
							</div>
							<div className='add-avatar'>
								<div className='custom-file py-1 avatar-input'>
									<input
										type='file'
										name='img'
										onChange={e => {
											// console.log(e.target.files);
											setImg(e.target.files[0]);
										}}
										className='custom-file-input  py-1'
										id='inputGroupFile01'
										aria-describedby='inputGroupFileAddon01'
									/>
									<label
										className='custom-file-label'
										htmlFor='inputGroupFile01'>
										Choose Image
									</label>
								</div>
							</div>
						</div>
						<button type='submit' className='btn btn-primary mb-3'>
							submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default connect(null, { createProfile, addAvatar })(
	withRouter(CreateProfile)
);
