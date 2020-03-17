import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "../layouts/Spinner";
import { FaConnectdevelop } from "react-icons/fa";
import { getAllProfiles } from "../actions/profile";
import DeveloperCard from "./DeveloperCard";
const Developers = ({
	getAllProfiles,

	profile: { profiles, loading },
	avatar: { avatars }
}) => {
	useEffect(() => {
		getAllProfiles();
	}, [getAllProfiles]);
	return (
		<>
			{loading ? (
				<Spinner />
			) : (
				<div className='developer-section'>
					<div className='container'>
						<h1 className='py-1 text-white'>
							Developers
							<FaConnectdevelop />
						</h1>
						<p className='lead dev-info'>
							share your profile all over the world and connect with other
							developers as well
						</p>
						<div className='profiles row'>
							{profiles.length > 0 && avatars.length > 0 ? (
								profiles.map(profile => (
									<DeveloperCard
										key={profile._id}
										profile={profile}
										avatars={avatars}
									/>
								))
							) : (
								<h4 className='py-1'>No Profile Found Yet...</h4>
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

Developers.propTypes = {
	getAllProfiles: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	profile: state.profile,
	avatar: state.avatar
});
export default connect(mapStateToProps, { getAllProfiles })(Developers);
