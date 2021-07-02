import Router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import mainLogo from '../images/unknown.png';
import styles from '../styles/commonHeader.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../reducer';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

const CommonHeader = () => {
	const [showModal, setShowModal] = useState(false);
	const [showSignupModal, setSignupShowModal] = useState(false);
	const [isLogin, setIsLogin] = useState(false);
	const { me,loginDone } = useSelector((state: RootState) => state.user);

	const handleModal = useCallback(() => {
		setShowModal((state) => !state);
		console.log('눌렀다아아아아앙');
	}, []);

	const handleShowModal = useCallback(() => {
		setSignupShowModal(!showSignupModal);
		console.log('가입해라');
	}, [showSignupModal]);

	// const onCloseModal = useCallback(() => {
	// 	setShowModal(false);
	// 	console.log('꺼저');
	// }, []);

	const Logout = useCallback(() => {
		Router.replace('/LandingPage');
	}, []);

	const MyPage = useCallback(() => {
		Router.replace('/MyPage');
	}, []);

	return (
		<div className={styles.header}>
			<div className={styles.section1}>
				<Link href="/LandingPage" passHref>
					<Image
						className={styles.image}
						src={mainLogo}
						alt="headerImg"
						width={100}
						height={85}
					/>
				</Link>
			</div>
			<div className={styles.section2}>
				{!loginDone ? (
					<>
						{showModal && <LoginModal handleModal={handleModal} />}
						<button className={styles.button} onClick={handleModal}>
							LOG IN
						</button>
						{showSignupModal && (
							<SignupModal handleShowModal={handleShowModal} />
						)}
						<button className={styles.button} onClick={handleShowModal}>
							SIGN UP
						</button>
					</>
				) : (
					<>
						<button className={styles.button} onClick={MyPage}>
							마이페이지
						</button>
						<button className={styles.button} onClick={Logout}>
							로그아웃
						</button>
					</>
				)}
			</div>
		</div>
	);
};

export default CommonHeader;
