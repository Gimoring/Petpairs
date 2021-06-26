import { GetServerSideProps } from 'next';
import React, { useCallback, useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from '../styles/myPage.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { IUser } from '../interface/iUser';
import { updateProfileData, userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer';
import { dataSet } from '../reducer/user';
import MyPetImgSlider from '../components/MyPetImgSlider';
import DeleteUserModal from '../components/deleteUserModal';

const MyPage = () => {
	const { me, updateProfileDone, updateProfileError } = useSelector(
		(state: RootState) => state.user,
	);
	const router = useRouter();
	const dispatch = useDispatch();
	const [modalOn, setModalOn] = useState(false);
	const [changeInfoBtnOn, setChangeInfoBtnOn] = useState(false);
	const [changeUserInfoOn, setChangeUserInfoOn] = useState(false);
	const [editPetName, setEditPetName] = useState(false);
	const [editBreed, setEditBreed] = useState(false);
	const [editAge, setEditAge] = useState(false);
	const [editIntroduce, setEditIntroduce] = useState(false);

	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		petName: '',
		breed: '',
		age: undefined,
		introduce: '',
	});

	const handleModal = useCallback(() => {
		setModalOn(!modalOn);
	}, [modalOn]);

	const isValidEmail = (str: string) => {
		const regExp =
			/^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
		return regExp.test(str);
	};

	const changeInfoOn = useCallback(() => {
		setChangeInfoBtnOn(true);
		console.log(changeInfoBtnOn);
	}, [changeInfoBtnOn, setChangeInfoBtnOn]);

	const onSubmitUpdatedInfo = useCallback(
		(e) => {
			e.preventDefault();
			console.log(me);

			console.log(changeUserInfoOn);

			if (
				(!me?.name && !inputs.name) ||
				(!me?.email && !inputs.email) ||
				(!me?.pet?.petName && !inputs.petName) ||
				(!me?.pet?.breed && !inputs.breed) ||
				(!me?.pet?.age && !inputs.age) ||
				(!me?.pet?.introduce && !inputs.introduce)
			) {
				window.alert('모든 항목을 채워주세요!');
			} else if (
				inputs.breed !== '냥이' &&
				inputs.breed !== '멍멍이' &&
				me?.pet?.breed !== '냥이' &&
				me?.pet?.breed !== '멍멍이'
			) {
				window.alert('냥이 또는 멍멍이로 명시해주세요!');
			} else if (!isValidEmail(inputs.email)) {
				window.alert('올바른 이메일 형태가 아닙니다');

				// else if (!me?.pet?.fileName) {
				// 	window.alert('펫 사진이 필요해요!');
			} else {
				dispatch({
					type: userActionTypes.UPDATE_PROFILE_REQUEST,
					data: {
						id: me?.id,
						name: inputs.name || me?.name,
						email: inputs.email || me?.email,
						pet: {
							petName: inputs.petName || me?.pet?.petName,
							breed: inputs.breed || me?.pet?.breed,
							age: inputs.age || me?.pet?.age,
							introduce: inputs.introduce || me?.pet?.introduce,
							fileName: me?.pet?.fileName,
						},
					},
				});
				console.log(changeUserInfoOn);
				console.log(updateProfileDone);

				window.alert('프로필이 수정 되었습니다!');
				console.log(me);
				setChangeInfoBtnOn(false);
				setChangeUserInfoOn(false);
				setEditPetName(false);
				setEditBreed(false);
				setEditAge(false);
				setEditIntroduce(false);
			}

			if (updateProfileError) {
				window.alert('에러 발생!');
			}
		},
		[
			updateProfileDone,
			inputs.name,
			inputs.email,
			inputs.petName,
			inputs.breed,
			inputs.age,
			inputs.introduce,
			me?.name,
			me?.email,
			me?.pet?.petName,
			me?.pet?.age,
			me?.pet?.breed,
			me?.pet?.introduce,
			me?.pet?.fileName,
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

	return (
		<div className={styles.bodyContainer}>
			{/* {console.log(user)} */}
			<>
				{!changeInfoBtnOn ? ( //  프로필 수정 누르지 않은 상태
					<section className={styles.bodyWhole}>
						{modalOn && <DeleteUserModal handleModal={handleModal} />}

						<div className={styles.upperBodyContainer}>
							<div className={styles.slider}>
								<MyPetImgSlider />
							</div>
						</div>

						<div className={styles.lowerBodyContainer}>
							<div
								className={styles.userPetInfo}
								style={{ paddingRight: '50px' }}
							>
								<div className={styles.userInfo}>
									<div>{me?.name}</div>
									<div>{me?.email}</div>
								</div>
								<div className={styles.petInfo}>
									{me?.pet?.petName ? (
										<div>펫 이름: {me?.pet?.petName}</div>
									) : (
										<div style={{ color: 'red' }}>펫 이름:</div>
									)}
									{me?.pet?.breed ? (
										<div>펫의 종: {me?.pet?.breed}</div>
									) : (
										<div style={{ color: 'red' }}>펫의 종: 냥이 or 멍멍이</div>
									)}
									{me?.pet?.age?.toString() ? (
										<div>펫 나이: {me?.pet?.age.toString()}</div>
									) : (
										<div style={{ color: 'red' }}>펫 나이: </div>
									)}
									<div className={styles.introduceBox}>
										{me?.pet?.introduce ? (
											<div className={styles.introduce}>
												펫 소개: {me?.pet?.introduce}
											</div>
										) : (
											<div
												className={styles.introduce}
												style={{ color: 'red' }}
											>
												펫 소개: ffdsadaffdsfffdsadaffdsfssffdsa
											</div>
										)}
									</div>
								</div>
								<button className={styles.editInfoBtn} onClick={changeInfoOn}>
									프로필 수정
								</button>
								<button className={styles.deleteUserBtn} onClick={handleModal}>
									회원 탈퇴
								</button>
							</div>
						</div>
					</section>
				) : (
					// 프로필 수정 누른 상태
					<section className={styles.bodyWhole}>
						<div className={styles.upperBodyContainer}>
							<div className={styles.slider}>
								<MyPetImgSlider />
							</div>
						</div>

						<div className={styles.lowerBodyContainer}>
							<div className={styles.editUserPetInfo}>
								{!changeUserInfoOn ? ( // 유저 정보 수정 누르지 않은 상태
									<button
										onClick={() => {
											setChangeUserInfoOn(true);
										}}
									>
										유저정보 수정
									</button>
								) : (
									// 유저 정보 누른 상태
									<div className={styles.userInfoEdit}>
										<input
											id={styles.name}
											name="name"
											placeholder={`이름: ${me?.name}`}
											value={inputs.name}
											onChange={onEditInfo}
										/>
										<input
											id={styles.email}
											name="email"
											type="text"
											placeholder={`이메일: ${me?.email}`}
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
													? `펫의 이름: ${me?.pet?.petName}`
													: '펫의 이름을 입력해주세요'
											}
											value={inputs.petName}
											onChange={onEditInfo}
										/>
									) : (
										<div className={styles.editPetName}>
											<button
												style={{ width: '40px' }}
												onClick={() => {
													setEditPetName(true);
													console.log(editPetName);
												}}
											>
												펫 이름
											</button>
											{me?.pet?.petName ? (
												<div className={styles.name}>{me?.pet?.petName}</div>
											) : (
												<div className={styles.name} style={{ color: 'red' }}>
													펫 이름:
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
													? `펫의 종: ${me?.pet?.breed}`
													: '펫의 종을 입력해주세요'
											}
											value={inputs.breed}
											onChange={onEditInfo}
										/>
									) : (
										<div className={styles.editBreed}>
											<button
												style={{ width: '40px' }}
												onClick={() => {
													setEditBreed(true);
												}}
											>
												펫의 종
											</button>
											{me?.pet?.breed ? (
												<div className={styles.petBreed}>{me?.pet?.breed}</div>
											) : (
												<div
													className={styles.petBreed}
													style={{ color: 'red' }}
												>
													펫의 종: 냥이 or 멍멍이
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
													? `펫 나이: ${me?.pet?.age.toString()}`
													: '펫의 나이을 입력해주세요'
											}
											value={inputs.age}
											onChange={onEditInfo}
										/>
									) : (
										<div className={styles.editAge}>
											<button
												style={{ width: '40px' }}
												onClick={() => {
													setEditAge(true);
												}}
											>
												펫의 나이
											</button>
											{me?.pet?.age ? (
												<div className={styles.petAge}>{me?.pet?.age}</div>
											) : (
												<div className={styles.petAge} style={{ color: 'red' }}>
													펫 나이:
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
												? `펫 소개: ${me?.pet?.introduce}`
												: '펫을 소개해주세요'
										}
										value={inputs.introduce}
										onChange={onEditInfo}
									/>
								) : (
									<div className={styles.editIntroduce}>
										<button
											style={{ width: '40px' }}
											onClick={() => {
												setEditIntroduce(true);
											}}
										>
											펫 소개
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
												펫 소개:
											</div>
										)}
									</div>
								)}
							</div>
							<div className={styles.onEditBtns}>
								<button className="submitBtn" onClick={onSubmitUpdatedInfo}>
									프로필 수정
								</button>
								<button
									className={styles.cancelEditProfile}
									type="button"
									onClick={() => router.reload()}
								>
									취소
								</button>
							</div>
						</div>
					</section>
				)}
			</>
		</div>
	);
};

// export const getServerSideProps = wrapper.getServerSideProps(async (context) => {

//   return {
//     props: {
//       me
//     }
//   }
// }

export default MyPage;
