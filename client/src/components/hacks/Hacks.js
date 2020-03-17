import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHacks } from "../actions/hacks";
import { FaChartLine, FaCheck } from "react-icons/fa";
import Alert from "../layouts/Alert";
import Spinner from "../layouts/Spinner";
import HackForm from "./HackForm";
import SingleHack from "./SingleHack";
const Hacks = ({ getHacks, hack: { hacks, loading }, avatar }) => {
	useEffect(() => {
		getHacks();
	}, [getHacks]);
	// console.log(avatar.avatars);
	return loading && avatar.loading ? (
		<Spinner />
	) : (
		<>
			<div className='hacks-section'>
				<div className='container'>
					<h1 className='py-1 text-white'>
						Hacks <FaChartLine />
					</h1>
					<p className='lead'>add any advice that could help others</p>
					<p className='dev-info'>
						<FaCheck /> specify your topic{" "}
					</p>
					<Alert />
					<HackForm />
					<div className='hacks mt-4'>
						{hacks.map(hack => (
							<SingleHack key={hack._id} hack={hack} avatars={avatar.avatars} />
						))}
					</div>
				</div>
			</div>
		</>
	);
};

Hacks.propTypes = {
	getHacks: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
	hack: state.hacks,
	avatar: state.avatar
});
export default connect(mapStateToProps, { getHacks })(Hacks);
