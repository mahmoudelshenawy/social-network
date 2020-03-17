import React from "react";
import PropTypes from "prop-types";
import { DiMongodb } from "react-icons/di";
import {
	FaFacebookSquare,
	FaTwitterSquare,
	FaLinkedin,
	FaMedium
} from "react-icons/fa";
import Img from "../img/2.jpg";
const DeveloperCard = ({
	profile: {
		user: { _id, name, avatar },
		status,
		degree,
		company,
		studyField,
		location,
		skills,
		social
	},
	avatars
}) => {
	const avatarImg = avatars.find(img => img.user === _id);

	return (
		<div className='col-lg-4 col-md-6 col-sm-10 mx-auto mb-3'>
			<div className='dev-card card'>
				<img
					src={Img}
					alt=''
					height='75px'
					style={{ height: "160px" }}
					className='card-img-top img-fluid'
				/>

				<img
					src={avatarImg.image}
					alt=''
					style={{
						border: "2px solid #000",
						borderRadius: "50%",
						marginTop: "-66px"
					}}
					className='rounded-circle mx-auto'
					width='120px'
					height='120px'
				/>
				<div className='card-body text-center'>
					<h3 className='dev-info py-1 mb-1'>{name}</h3>
					<h3 className='py-1 mb-1 dev-info'>{status}</h3>
					<h5 className='py-1 mb-1 dev-info'>works at : {company}</h5>
					<h5 className='py-1 mb-1 dev-info'>studied : {studyField}</h5>
					<h5 className='py-1 mb-1 dev-info'>{degree}</h5>
					<h5 className='py-1 mb-1 dev-info'>{location}</h5>
					<ul className='d-flex justify-content-around align-items-center text-center'>
						{skills.slice(0, 4).map((skill, index) => (
							<li className='text-primary' key={index}>
								<DiMongodb />
								{skill}
							</li>
						))}
					</ul>
				</div>
				<div className='card-footer d-flex justify-content-around align-items-center'>
					{social && social.facebook && (
						<a href={social.facebook} target='_blank' rel='noopener noreferrer'>
							<FaFacebookSquare className='card-icon' />
						</a>
					)}
					{social && social.twitter && (
						<a href={social.twitter} target='_blank' rel='noopener noreferrer'>
							<FaTwitterSquare className='card-icon' />
						</a>
					)}
					{social && social.linkedin && (
						<a href={social.linkedin} target='_blank' rel='noopener noreferrer'>
							<FaLinkedin className='card-icon' />
						</a>
					)}
					<a href='#!' target='_blank' rel='noopener noreferrer'>
						<FaMedium className='card-icon' />
					</a>
				</div>
			</div>
		</div>
	);
};

DeveloperCard.propTypes = {
	profile: PropTypes.object.isRequired
};

export default DeveloperCard;
