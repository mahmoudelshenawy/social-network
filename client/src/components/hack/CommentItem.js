import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Moment from "react-moment";
import { FaTrashAlt } from "react-icons/fa";
import { deleteComment } from "../actions/hacks";
const CommentItem = ({
	comment: { _id, text, name, avatar, user, date },
	avatars,
	hackId,
	auth,
	deleteComment
}) => {
	const avatarImg = avatars.find(img => img.user === user);
	return (
		<div className='row mb-2'>
			<div className='container'>
				<div className='col-lg-6 col-md-8 col-sm-10 mx-auto comment-container  py-3'>
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
							<h4 className='dev-info py-1'>{text}</h4>
							<p className='post-date'>
								Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
							</p>
							{!auth.loading && auth.user._id === user && (
								<button
									className='btn btn-danger'
									onClick={() => deleteComment(hackId, _id)}>
									<FaTrashAlt />
								</button>
							)}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

CommentItem.propTypes = {
	deleteComment: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	auth: state.auth
});
export default connect(mapStateToProps, { deleteComment })(CommentItem);
