import React, { ChangeEvent, useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import mainLogo from '../images/unknown.png';
import LoginModal from './LoginModal';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducer';
import { userActionTypes } from '../interface/iUserActType';
import styles from '../styles/signUpModal.module.scss';

interface ChildProps {
	handleShowModal: () => void;
}

const SignupModal: React.FC<ChildProps> = (props) => {
	const dispatch = useDispatch();
	const { me, signUpDone, signUpLoading } = useSelector(
		(state: RootState) => state.user,
	);
	const [isOpen, setIsOpen] = useState(false);
	const [error, setError] = useState('');
	const [input, setInput] = useState({
		name: '',
		email: '',
		password: '',
	});

	const handleModal = useCallback(() => {
		setIsOpen(!isOpen);
		console.log('나와라제바알~~~');
	}, [isOpen]);


	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const {
			target: { name, value },
		} = e;
		setInput({
			...input,
			[name]: value,
		});
	};

	const submitHandler = useCallback(
		(e) => {
			e.preventDefault();
			dispatch({
				type: userActionTypes.SIGN_UP_REQUEST,
				data: {
					name: input.name,
					email: input.email,
					password: input.password,
				},
			});
		},
		[dispatch, input.name, input.email, input.password],
	);

	return (
		<>
			<div className={styles.modal} onClick={props.handleShowModal}>
				{/* <div onClick={e => {e.stopPropagation()}}> */}
				<div className={styles.signupModal}>
					<span className={styles.close} onClick={props.handleShowModal}>
						&times;
					</span>
					<div className={styles.modalContents} onClick={props.handleShowModal}>
						<Image
							className={styles.signinIcon}
							src={mainLogo}
							alt="headerIMG"
							width={80}
							height={80}
							objectFit="none"
						/>
						<input
							name="name"
							className={styles.signupName}
							type="text"
							placeholder="이름"
							onChange={inputChangeHandler}
						/>
						<input
							name="email"
							className={styles.signupId}
							type="text"
							placeholder="아이디"
							onChange={inputChangeHandler}
						/>
						<input
							name="password"
							className={styles.signupPw}
							type="password"
							placeholder="비밀번호"
							onChange={inputChangeHandler}
						/>
						<div className={styles.signupMid}>
							<button className={styles.signupBtn} onClick={submitHandler}>
								{' '}
								회원가입{' '}
							</button>
							<div className={styles.socialBox}>
								<div className={styles.kakao}>
									{/* <image
                        className={styles.kakaoLogo}
                        src="/Images/SignIn/kakao.png"
                      /> */}
									<div className={styles.kakaoText}>
										카카오 계정으로 신규가입
									</div>
								</div>
								<div className={styles.google}>
									{/* <Image
                        className={styles.googleLogo}
                        src="/Images/SignIn/facebook.png"
                      /> */}
									<div className={styles.googleText}>
										페이스북 계정으로 신규가입
									</div>
								</div>
							</div>
							<div className={styles.signupEnd}>
								<div className={styles.signupLine}>
									새로운 친구들을 찾아볼까요?
									<>
									{isOpen && (<LoginModal handleModal={handleModal}/>
									)}
									<button className={styles.loginButton} onClick={handleModal}>
										로그인
									</button>
									</>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			{/* </div> */}
		</>
	);
};

export default SignupModal;
