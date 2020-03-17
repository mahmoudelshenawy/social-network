import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";
import {
	FaThumbsUp,
	FaThumbsDown,
	FaCommentAlt,
	FaTrashAlt
} from "react-icons/fa";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { addLike, removeLike, deleteHack } from "../actions/hacks";
const SingleHack = ({
	auth,
	avatars,
	hack: { _id, name, avatar, topic, advice, user, date, comments, likes },
	showAction,
	addLike,
	removeLike,
	deleteHack
}) => {
	const avatarImg = avatars.find(img => img.user === user);
	// console.log(avatarImg);
	return (
		<div className='row mb-2'>
			<div className='container'>
				<div className='col-lg-6 col-md-8 col-sm-10 mx-auto hack-container  py-3'>
					<div className='row'>
						<div className='col-lg-4 col-md-4 col-sm-10 mx-auto d-flex align-items-center'>
							{avatarImg ? (
								<img
									src={avatarImg.image}
									className='img-fluid rounded-circle hack-img'
									style={{ width: "100px", height: "100px" }}
									alt=''
								/>
							) : (
								<img
									src={avatar}
									className='img-fluid rounded-circle'
									width='100px'
									height='100px'
									alt=''
								/>
							)}
						</div>
						<div className='col-lg-8 col-mg-8 col-sm-10 mx-auto'>
							<h2 className='dev-info py-1'>{name}</h2>
							<h6 className='py-1 dev-info mb-1'>about : {topic}</h6>
							<h6 className='py-1 dev-info mb-1'>{advice}</h6>
							<p className='post-date'>
								Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
							</p>
							{showAction && (
								<div className=''>
									<button
										className='btn btn-light mr-1'
										onClick={() => addLike(_id)}>
										<FaThumbsUp />{" "}
										{likes.length > 0 && <span>{likes.length}</span>}
									</button>
									<button
										className='btn btn-light mr-1'
										onClick={() => removeLike(_id)}>
										<FaThumbsDown />
									</button>
									<Link to={`/hacks/${_id}`} className='btn btn-primary mr-1'>
										<FaCommentAlt /> comments{" "}
										{comments.length > 0 && <span>{comments.length}</span>}{" "}
									</Link>
									{!auth.loading && user === auth.user._id && (
										<button
											className='btn btn-danger'
											onClick={() => deleteHack(_id)}>
											<FaTrashAlt />
										</button>
									)}
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
SingleHack.defaultProps = {
	showAction: true
};
SingleHack.propTypes = {
	addLike: PropTypes.func.isRequired,
	removeLike: PropTypes.func.isRequired,
	deleteHack: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(mapStateToProps, { addLike, removeLike, deleteHack })(
	SingleHack
);
