import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHack } from "../actions/hacks";
import Spinner from "../layouts/Spinner";
import SingleHack from "../hacks/SingleHack";
import { Link } from "react-router-dom";
import CommentForm from "./CommentForm";
import CommentItem from "./CommentItem";
const Hack = ({
	match,
	hacks: { hack, loading },
	getHack,
	avatar: { avatars }
}) => {
	useEffect(() => {
		getHack(match.params.id);
	}, []);
	return loading && hack === null ? (
		<Spinner />
	) : (
		<div className='hacks-section'>
			<div className='container'>
				<Link to='/hacks' className='btn btn-info mt-4 mb-2'>
					back to hacks
				</Link>
				<SingleHack hack={hack} showAction={false} avatars={avatars} />
				<CommentForm hackId={hack._id} />
				<div className='comments'>
					{hack.comments.map(comment => (
						<CommentItem
							key={comment._id}
							comment={comment}
							hackId={hack._id}
							avatars={avatars}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

Hack.propTypes = {
	getHack: PropTypes.func.isRequired
};
const mapStateToProps = state => ({
	hacks: state.hacks,
	avatar: state.avatar
});

export default connect(mapStateToProps, { getHack })(Hack);
