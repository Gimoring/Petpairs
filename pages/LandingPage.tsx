import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer/index';
import wrapper from '../store/configure';
import CommonHeader from '../components/CommonHeader';
import styles from '../styles/layout.module.scss';
import Section1 from '../components/LandingSection1';
import Link from 'next/link';
import Image from 'next/image';

const LandingPage = () => {
	const { me } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	return (
		<div className="container">
			<CommonHeader/>
			<Section1/>
			
		</div>
	);
};

export default LandingPage;

