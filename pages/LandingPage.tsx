import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer/index';
const LandingPage = () => {
	const userReducer = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	return (
		<div>
			Hello LandingPage{' '}
			<button
				onClick={() => {
					dispatch({
						type: userActionTypes.LOG_IN_REQUEST,
					});
				}}
			></button>
		</div>
	);
};

export default LandingPage;
