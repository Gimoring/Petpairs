import {
	GetServerSideProps,
	GetServerSidePropsContext,
	GetServerSidePropsResult,
	InferGetServerSidePropsType,
} from 'next';
import React, {
	useCallback,
	useState,
	useEffect,
	useLayoutEffect,
} from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/myPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IUser, IUserState } from '../interface/iUser';
import { updateProfileData, userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer';
import user, { dataSet } from '../reducer/user';
import MyPetImgSlider from '../components/MyPetImgSlider';
import DeleteUserModal from '../components/deleteUserModal';
import CommonHeader from '../components/CommonHeader';
import CommonFooter from '../components/CommonFooter';
import wrapper from '../store/configure';
import axios, { AxiosPromise } from 'axios';
import { END } from 'redux-saga';
import { Context, GetServerSidePropsCallback } from 'next-redux-wrapper';

// InferGetServerSidePropsType<typeof getServerSideProps>)

const MyPage = () => {
	const { me } = useSelector((state: RootState) => state.user);
	const router = useRouter();
	const dispatch = useDispatch();
	const [modalOn, setModalOn] = useState(false);
	const [changeInfoBtnOn, setChangeInfoBtnOn] = useState(false);
	const [changeUserInfoOn, setChangeUserInfoOn] = useState(false);
	const [editPetName, setEditPetName] = useState(false);
	const [editSpecies, setEditSpecies] = useState(false);
	const [editBreed, setEditBreed] = useState(false);
	const [editAge, setEditAge] = useState(false);
	const [editIntroduce, setEditIntroduce] = useState(false);

	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		petName: '',
		species: '',
		breed: '',
		age: undefined,
		introduce: '',
	});

	// useEffect(() => {
	// 	if (!me) {
	// 		router.push('/login');
	// 	}
	// }, [me]);

	const handleModal = useCallback(() => {
		setModalOn(!modalOn);
	}, [modalOn]);

	const isValidEmail = (str: string) => {
		const regExp =
			/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		return regExp.test(str);
	};

	// useEffect(() => {
	// 	changeInfoOn;
	// }, [changeInfoBtnOn]);
	const changeInfoOn = useCallback(
		(e) => {
			e.preventDefault();
			setChangeInfoBtnOn(true);
			console.log(changeInfoBtnOn);
		},
		[changeInfoBtnOn, setChangeInfoBtnOn],
	);

	const onSubmitUpdatedInfo = useCallback(
		(e) => {
			e.preventDefault();
			console.log(me);

			console.log(changeUserInfoOn);

			if (
				(!me?.name && !inputs.name) ||
				(!me?.email && !inputs.email) ||
				(!me?.pet?.petName && !inputs.petName) ||
				(!me?.pet?.species && !inputs.species) ||
				(!me?.pet?.breed && !inputs.breed) ||
				(!me?.pet?.age && !inputs.age) ||
				(!me?.pet?.introduce && !inputs.introduce)
			) {
				window.alert('????????? ????????? ?????????!');
			} else if (
				inputs.species !== '??????' &&
				inputs.species !== '?????????' &&
				me?.pet?.species !== '??????' &&
				me?.pet?.species !== '?????????'
			) {
				window.alert('?????? ?????? ???????????? ??????????????????!');
			} else if (inputs.email && !isValidEmail(inputs.email)) {
				window.alert('????????? ????????? ????????? ????????????');

				// else if (!me?.pet?.fileName) {
				// 	window.alert('??? ????????? ????????????!');
			} else {
				dispatch({
					type: userActionTypes.UPDATE_PROFILE_REQUEST,
					data: {
						id: me?.id,
						name: inputs.name,
						email: inputs.email,
						pet: {
							petId: me?.pet?.petId,
							petName: inputs.petName,
							species: inputs.species,
							breed: inputs.breed,
							age: inputs.age,
							introduce: inputs.introduce,
							// fileName: me?.pet?.fileName,
						},
					},
				});
				// console.log(changeUserInfoOn);
				// console.log(updateProfileDone);

				window.alert('???????????? ?????? ???????????????!');
				console.log(me);
				// router.reload();
				setChangeInfoBtnOn(false);
				setChangeUserInfoOn(false);
				setEditPetName(false);
				setEditSpecies(false);
				setEditBreed(false);
				setEditAge(false);
				setEditIntroduce(false);
				// router.reload();
				// router.replace(router.asPath); // server-side props refresh
			}

			// if (updateProfileError) {
			// 	window.alert('?????? ??????!');
			// }
		},
		[
			// updateProfileDone,
			inputs.name,
			inputs.email,
			inputs.petName,
			inputs.species,
			inputs.breed,
			inputs.age,
			inputs.introduce,
			// me?.name,
			// me?.email,
			// me?.pet?.petName,
			// me?.pet?.age,
			// me?.pet?.breed,
			// me?.pet?.introduce,
			// me?.pet?.fileName,
		],
	);

	const onEditInfo = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});

		console.log(inputs);
	};

	// if (!me) {
	//   return <div>Loading...</div>
	// }
	useEffect(() => {
		// function loadProfile() {
		// 	const promise = axios.get('http://localhost4000/user/userInfo');
		// 	const data = promise.then((res) => res.data);
		// 	return data;
		// }
		// loadProfile().then((data) => console.log(data));

		dispatch({
			type: userActionTypes.LOAD_MYPROFILE_REQUEST,
		});
		// dispatch({
		// 	type: userActionTypes.LOAD_CARDS_REQUEST,
		// });
	}, [dispatch]);
	return (
		<>
			<CommonHeader />

			<div className={styles.bodyContainer}>
				<>
					<section className={styles.bodyWhole}>
						{modalOn && <DeleteUserModal handleModal={handleModal} />}

						<div className={styles.upperBodyContainer}>
							<div className={styles.slider}>
								<MyPetImgSlider />
							</div>
						</div>
						{!changeInfoBtnOn ? ( //  ????????? ?????? ????????? ?????? ??????
							// <section className={styles.bodyWhole}>
							// 	{modalOn && <DeleteUserModal handleModal={handleModal} />}

							// 	<div className={styles.upperBodyContainer}>
							// 		<div className={styles.slider}>
							// 			<MyPetImgSlider />
							// 		</div>
							// 	</div>

							<div className={styles.lowerBodyContainer}>
								{console.log(me)}
								{console.log(me?.user)}
								<div
									className={styles.userPetInfo}
									// style={{ paddingRight: '50px' }}
								>
									<div
										className={styles.userInfo}
										style={{ border: '2rem, solid, black' }}
									>
										<div>{me?.data?.userName || me?.name}</div>
										<div>{me?.data?.email}</div>
									</div>
									<div className={styles.petInfo}>
										{me?.pet?.petName ? (
											<div>??? ??????: {me?.pet?.petName}</div>
										) : (
											<div style={{ color: 'red' }}>??? ??????:</div>
										)}
										{me?.pet?.species ? (
											<div>?????? ???: {me?.pet?.species}</div>
										) : (
											<div style={{ color: 'red' }}>
												?????? ???: ?????? or ?????????
											</div>
										)}
										{me?.pet?.breed ? (
											<div>?????? ??????: {me?.pet?.breed}</div>
										) : (
											<div style={{ color: 'red' }}>
												?????? ??????: ????????? ?????????, ???????????? ???
											</div>
										)}
										{me?.pet?.age?.toString() ? (
											<div>??? ??????: {me?.pet?.age.toString()}</div>
										) : (
											<div style={{ color: 'red' }}>??? ??????: </div>
										)}
										<div className={styles.introduceBox}>
											{me?.pet?.introduce ? (
												<div className={styles.introduce}>
													??? ??????: {me?.pet?.introduce}
												</div>
											) : (
												<div
													className={styles.introduce}
													style={{ color: 'red' }}
												>
													??? ??????: ffdsadaffdsfffdsadaffdsfssffdsa
												</div>
											)}
										</div>
									</div>
									<button
										className={styles.editInfoBtn}
										type="button"
										onClick={changeInfoOn}
									>
										????????? ??????
									</button>
									<button
										className={styles.deleteUserBtn}
										onClick={handleModal}
									>
										?????? ??????
									</button>
								</div>
							</div>
						) : (
							// </section>
							// ????????? ?????? ?????? ??????
							// <section className={styles.bodyWhole}>
							// 	<div className={styles.upperBodyContainer}>
							// 		<div className={styles.slider}>
							// 			<MyPetImgSlider />
							// 		</div>
							// 	</div>

							<div className={styles.lowerBodyContainer}>
								<div className={styles.editUserPetInfo}>
									{changeUserInfoOn === false ? ( // ?????? ?????? ?????? ????????? ?????? ??????
										<button
											// style={{ width: '40px' }}
											onClick={() => {
												setChangeUserInfoOn(true);
												console.log('??????129');
											}}
										>
											???????????? ??????
										</button>
									) : (
										// ?????? ?????? ?????? ??????
										<div className={styles.userInfoEdit}>
											<input
												id={styles.name}
												name="name"
												placeholder={`??????: ${me?.userName || me?.name}`}
												value={inputs.name}
												onChange={onEditInfo}
											/>
											<input
												id={styles.email}
												name="email"
												type="text"
												placeholder={`?????????: ${me?.email}`}
												value={inputs.email}
												onChange={onEditInfo}
											/>
										</div>
									)}
									<div className={styles.petInfoEdit}>
										{editPetName ? (
											<input
												id={styles.petName}
												name="petName"
												type="text"
												placeholder={
													me?.pet?.petName
														? `?????? ??????: ${me?.pet?.petName}`
														: '?????? ????????? ??????????????????'
												}
												value={inputs.petName}
												onChange={onEditInfo}
											/>
										) : (
											<div className={styles.editPetName}>
												<button
													style={{ width: '60px' }}
													onClick={() => {
														setEditPetName(true);
														console.log(editPetName);
													}}
												>
													??? ??????
												</button>
												{me?.pet?.petName ? (
													<div className={styles.name}>{me?.pet?.petName}</div>
												) : (
													<div className={styles.name} style={{ color: 'red' }}>
														??? ??????:
													</div>
												)}
											</div>
										)}
										{editSpecies ? (
											<input
												id={styles.species}
												name="species"
												type="text"
												placeholder={
													me?.pet?.species
														? `?????? ???: ${me?.pet?.species}`
														: '?????? ?????? ??????????????????'
												}
												value={inputs.species}
												onChange={onEditInfo}
											/>
										) : (
											<div className={styles.editSpecies}>
												<button
													style={{ width: '60px' }}
													onClick={() => {
														setEditSpecies(true);
													}}
												>
													?????? ???
												</button>
												{me?.pet?.species ? (
													<div className={styles.petSpecies}>
														{me?.pet?.species}
													</div>
												) : (
													<div
														className={styles.petSpecies}
														style={{ color: 'red' }}
													>
														?????? ???: ?????? or ?????????
													</div>
												)}
											</div>
										)}
										{editBreed ? (
											<input
												id={styles.breed}
												name="breed"
												type="text"
												placeholder={
													me?.pet?.breed
														? `?????? ??????: ${me?.pet?.breed}`
														: '?????? ????????? ??????????????????'
												}
												value={inputs.breed}
												onChange={onEditInfo}
											/>
										) : (
											<div className={styles.editBreed}>
												<button
													style={{ width: '60px' }}
													onClick={() => {
														setEditBreed(true);
													}}
												>
													?????? ??????
												</button>
												{me?.pet?.breed ? (
													<div className={styles.petBreed}>
														{me?.pet?.breed}
													</div>
												) : (
													<div
														className={styles.petBreed}
														style={{ color: 'red' }}
													>
														?????? ??????: ????????? ?????????, ???????????? ???
													</div>
												)}
											</div>
										)}
										{editAge ? (
											<input
												id={styles.age}
												name="age"
												type="number"
												placeholder={
													me?.pet?.age?.toString()
														? `??? ??????: ${me?.pet?.age.toString()}`
														: '?????? ????????? ??????????????????'
												}
												value={inputs.age}
												onChange={onEditInfo}
											/>
										) : (
											<div className={styles.editAge}>
												<button
													style={{ width: '60px' }}
													onClick={() => {
														setEditAge(true);
													}}
												>
													?????? ??????
												</button>
												{me?.pet?.age ? (
													<div className={styles.petAge}>{me?.pet?.age}</div>
												) : (
													<div
														className={styles.petAge}
														style={{ color: 'red' }}
													>
														??? ??????:
													</div>
												)}
											</div>
										)}
									</div>

									{editIntroduce ? (
										<textarea
											id={styles.introduce}
											name="introduce"
											placeholder={
												me?.pet?.introduce
													? `??? ??????: ${me?.pet?.introduce}`
													: '?????? ??????????????????'
											}
											value={inputs.introduce}
											onChange={onEditInfo}
										/>
									) : (
										<div className={styles.editIntroduce}>
											<button
												style={{ width: '60px' }}
												onClick={() => {
													setEditIntroduce(true);
												}}
											>
												??? ??????
											</button>
											{me?.pet?.introduce ? (
												<div className={styles.petIntroduce}>
													{me?.pet?.introduce}
												</div>
											) : (
												<div
													className={styles.petIntroduce}
													style={{ color: 'red' }}
												>
													??? ??????:
												</div>
											)}
										</div>
									)}
								</div>
								<div className={styles.onEditBtns}>
									<button className="submitBtn" onClick={onSubmitUpdatedInfo}>
										?????? ??????
									</button>
									<button
										className={styles.cancelEditProfile}
										type="button"
										onClick={() => router.reload()}
									>
										??????
									</button>
								</div>
							</div>
							// </section>
						)}
					</section>
				</>
			</div>
			<CommonFooter />
		</>
	);
};

// export const getServerSideProps = wrapper.getServerSideProps(
//  ({ store, req, res, ...etc }) => {
// 		const cookie = req ? req.headers.cookie : '';
// 		if (cookie) {
// 			axios.defaults.headers.common.Authorization = `Bearer ${cookie}`;
// 			// store.dispatch(ApplicationSlice.actions.updateConfiguration());
// 			store.dispatch({ type: userActionTypes.LOAD_MYPROFILE_REQUEST });
// 			store.dispatch({ type: userActionTypes.LOAD_CARDS_REQUEST });
// 		}
// 		store.dispatch(END);
// 		store.sagaTask.toPromise();
// 	},
// );
// export const getServerSideProps: GetServerSideProps = async (context) => {

// export const getServerSideProps: GetServerSideProps =
// 	wrapper.getServerSideProps(async (ctx) => {
// 		// get the cookies
// 		const cookieString = ctx.req ? ctx.req.headers.cookie : '';

// 		// set the cookies
// 		ctx.res.setHeader('set-Cookie', 'foo=bar; HttpOnly');
// 		return {
// 			props: {},
// 		};
// 	});

// export const getServerSideProps = wrapper.getServerSideProps(
// 	(store) =>
// 		async (context): Promise<any | null> => {
// 			console.log('hello ServerSideProps');
// 			const cookie = context.req ? context.req.headers.cookie : '';
// 			axios.defaults.headers.Cookie = ''; //????????? <--- ???????????????
// 			console.log(
// 				'????????? ?????? ????????????????~ ???????????????-------------------------------------------------------------------------',
// 				context.req.headers,
// 			);
// 			if (context.req && cookie) {
// 				console.log(
// 					'????????? ?????? ???????????????~ ???????????????-------------------------------------------------------------------------',
// 				);
// 				axios.defaults.headers.Cookie = cookie;
// 			}
// 			await store.dispatch({
// 				type: userActionTypes.LOAD_MYPROFILE_REQUEST,
// 			});
// 			store.dispatch(END);
// 			await store.sagaTask?.toPromise();
// 		},
// );

// export const getServerSideProps =
// 	wrapper.getServerSideProps(async (context): Promise<any> => {
// 		const cookies = nookies.get(context);
// 		if (cookies.userId && cookies.token) {
// 			context.store.dispatch(
// 				{ type: userActionTypes.LOAD_MYPROFILE_REQUEST },
// 				cookies.userId,
// 			);
// 			context.store.dispatch(
// 				{ type: userActionTypes.LOAD_CARDS_REQUEST },
// 				cookies.userId,
// 				cookies.token,
// 			);
// 			context.store.dispatch(END);
// 			await context.store.sagaTask?.toPromise();
// 		} else {
// 			return {
// 				props: { ...cookies },
// 			};
// 		}
// 	});
// 	return {
// 		redirect: {
// 			permanent: false,
// 			destination: '/user/signin',
// 		},
// 	};
// }

// export const getServerSideProps: GetServerSideProps = wrapper.getServerSideProps(async (context) => {
// const cookie = context.req ? context.req.headers.cookie : '';
//   if (cookie) {
//     axios.defaults.headers.common.Authorization = `Bearer ${cookie}`;
//     context.store.dispatch({ type: userActionTypes.LOAD_MYPROFILE_REQUEST });
//     context.store.dispatch({ type: userActionTypes.LOAD_CARDS_REQUEST});
//   }
// }
// context.store.dispatch(END);
// await context.store.sagaTask.toPromise();
// return {
//   props: {
//     me
//   }
// }

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

//   return {
//     props: {
//       me
//     }
//   }
// }

export default MyPage;
