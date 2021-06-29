import Link from 'next/link';
import Image from 'next/image';
import catsDogs from '../images/catsDogs.png';
import { StylesProvider } from '@material-ui/styles';
import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer/index';
import styles from '../styles/landingSection1.module.scss';
import useIsInViewport from 'use-is-in-viewport';
import styled from 'styled-components';

const Section1 = () => {
	const { me } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const [isInViewport, targetRef] = useIsInViewport();

	return (
		<Wrapper ref={targetRef} className={isInViewport ? 'visible' : 'hidden'}>
			<div className={styles.section1}>
				<h1>
					<span className={styles.text}>P</span>
					<span className={styles.text}>E</span>
					<span className={styles.text}>T</span>
					<span className={styles.text}>P</span>
					<span className={styles.text}>A</span>
					<span className={styles.text}>I</span>
					<span className={styles.text}>R</span>
					<span className={styles.text}>S</span>
				</h1>
				{/* <div className={styles.buttonContain}>
					<Image src={catsDogs} alt="catsDogs" width={1500} height={800}/>
				</div> */}
			</div>
		</Wrapper>
	);
};
const Wrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
height: 100vh;
`;

export default Section1;
