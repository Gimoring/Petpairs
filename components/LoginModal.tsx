import React, { ChangeEvent, ReactElement, useCallback, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import mainLogo from '../images/unknown.png';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducer';
import { userActionTypes } from '../interface/iUserActType';
import styles from '../styles/loginModal.module.scss';
import SignupModal from './SignupModal';

interface ChildProps {
	handleModal: () => void;
}

const LoginModal: React.FC<ChildProps> = (props) => {
	const dispatch = useDispatch();
	const { me, logInDone, logInLoading } = useSelector(
		(state: RootState) => state.user,
	);
	const [error, setError] = useState('');
	const [isOpen, setIsOpen] = useState(false);
	const [input, setInput] = useState({
		email: '',
		password: '',
	});

	const handleShowModal = useCallback(() => {
		setIsOpen(!isOpen);
		console.log('나와라제바알~~~');
	}, [isOpen]);

	const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
		const {
			target: { name, value },
		} = e;
		console.log(e.target.name);
		console.log(e.target.value);
		setInput({
			...input,
			[name]: value,
		});
	};

	const submitHandler = useCallback(
		(e) => {
			console.log('보낸다');
			e.preventDefault();
			dispatch({
				type: userActionTypes.LOG_IN_REQUEST,
				data: {
					email: input.email,
					password: input.password,
				},
			});
		},
		[dispatch, input.email, input.password],
	);

	return (
		<>
			<div className={styles.modal} onClick={props.handleModal}>
				<div
					onClick={(e) => {
						e.stopPropagation();
					}}
				>
					<div className={styles.loginModal}>
						<span className={styles.close} onClick={props.handleModal}>
							&times;
						</span>
						<div className={styles.modalContents}>
							<div className={styles.image}>
								<Image
									src={mainLogo}
									alt="signinIcon"
									width={80}
									height={80}
									objectFit="none"
								/>
							</div>
							<input
								name="email"
								className={styles.loginId}
								type="text"
								placeholder="아이디"
								onChange={inputChangeHandler}
							/>
							<input
								name="password"
								className={styles.loginPw}
								type="password"
								placeholder="비밀번호"
								onChange={inputChangeHandler}
							/>
							<div className={styles.loginMid}>
								<button className={styles.loginBtn} onClick={submitHandler}>
									{' '}
									로그인{' '}
								</button>
								<div className={styles.socialBox}>
									<div className={styles.kakao}>
										{/* <image
                        className={styles.kakaoLogo}
                        src="/Images/SignIn/kakao.png"
                      /> */}
										<div className={styles.kakaoText}>
											카카오 계정으로 로그인
										</div>
									</div>
									<div className={styles.facebook}>
										{/* <Image
                        className={styles.googleLogo}
                        src="/Images/SignIn/facebook.png"
                      /> */}
										<div className={styles.facebookText}>
											페이스북 계정으로 로그인
										</div>
									</div>
								</div>
								<div className={styles.loginEnd}>
									<div className={styles.loginLine}>
										회원이 아니신가요?
										<>
											{isOpen && (
												<SignupModal handleShowModal={handleShowModal} />
											)}
											<button
												className={styles.signupButton}
												onClick={handleShowModal}
											>
												회원가입
											</button>
										</>
									</div>
									<Link href='/MainPage' passHref>
										<div className={styles.noUse}>☑️회원 가입 없이 체험☑️</div>
									</Link>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default LoginModal;
