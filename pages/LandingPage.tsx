import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer/index';
import wrapper from '../store/configure';
import CommonHeader from '../components/CommonHeader';
import Section1 from '../components/LandingSection1';
const LandingPage = () => {
	const { me } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	return (
		<div className=''>
			<CommonHeader />
			<Section1 />
		</div>
	);
};

export default LandingPage;

