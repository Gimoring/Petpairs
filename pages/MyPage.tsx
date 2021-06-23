import { GetServerSideProps } from 'next';
import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IUserProfile } from '../interface/iUser';
import { updateProfileData, userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer';
import { dataSet } from '../reducer/user';

const MyPage = () => {
	const { me, updateProfileDone, updateProfileError } = useSelector(
		(state: RootState) => state.user,
	);

	console.log(me);

	// user.me.name = 'hi';

	// const { name, email, pet } = useSelector((me: IEditUser) => ({
	//   name: me.name,
	//   email: me.email,
	//   pet: me.pet
	// })

	// const { petName, breed, age, }
	// const { petName, breed, age, introduce } = pet;

	// console.log(name);
	const dispatch = useDispatch();

	const [modalOn, setModalOn] = useState(false);
	const [toggleOn, setToggleOn] = useState(false);
	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		petName: '',
		breed: '',
		age: undefined,
		introduce: '',
	});

	const onModalClose = useCallback(() => {
		setModalOn(false);
	}, []);

	const onToggleOn = useCallback(() => {
		setToggleOn(true);
	}, [toggleOn]);

	const onSubmitUpdatedInfo = useCallback(
		(e) => {
			e.preventDefault();
			console.log(me);
			dispatch({
				type: userActionTypes.UPDATE_PROFILE_REQUEST,
				data: {
					name: inputs.name,
					email: inputs.email,
					pet: {
						petName: inputs.petName,
						breed: inputs.breed,
						age: inputs.age,
						introduce: inputs.introduce,
					},
				},
			});
			console.log(me);
			console.log(updateProfileDone);

			window.alert('프로필이 수정 되었습니다!');
			console.log(me);
			setToggleOn(false);

			if (updateProfileError) {
				window.alert('에러 발생!');
			}
		},
		[
			inputs.name,
			inputs.email,
			inputs.petName,
			inputs.breed,
			inputs.age,
			inputs.introduce,
		],
	);

	const onEditInfo = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setInputs({
			...inputs,
			[e.target.id]: e.target.value,
		});
		console.log(inputs);
	};
	// const onSubmitPetPhoto = () => {

	// }
	return (
		<div>
			{/* {console.log(user)} */}

			{me ? (
				<>
					{/* <div className="petImgSlider">
          <input></input>
          <button className="addImg">사진 추가</button>
          <button className="deleteImg">사진 삭제</button>
        </div> */}
					<div className="UserPetInfo">
						{!toggleOn ? (
							<>
								<div className="UserPetInfo">
									<div>{me?.name}</div>
									<div>{me?.email}</div>
									<div>{`펫 이름: ${me?.pet?.petName}`}</div>
									<div>{`펫의 종: ${me?.pet?.breed}`}</div>
									<div>{`펫 나이: ${me?.pet?.age}`}</div>
								</div>
								<div className="petDetails">
									<div>{`펫 소개: ${me?.pet?.introduce}`}</div>
								</div>
								<button className="editInfoBtn" onClick={onToggleOn}>
									정보 수정
								</button>
							</>
						) : (
							<>
								<div className="UserPetInfo">
									<input
										id="name"
										placeholder={`이름: ${me?.name}`}
										value={inputs.name}
										onChange={onEditInfo}
									/>
									<input
										id="email"
										type="text"
										placeholder={`이메일: ${me?.email}`}
										value={inputs.email}
										onChange={onEditInfo}
									/>
									<input
										id="petName"
										type="text"
										placeholder={
											me?.pet?.petName
												? `펫 이름: ${me?.pet?.petName}`
												: '펫 이름을 입력해주세요'
										}
										value={inputs.petName}
										onChange={onEditInfo}
									/>
									<input
										id="breed"
										type="text"
										placeholder={
											me?.pet?.breed
												? `펫의 종: ${me?.pet?.breed}`
												: '애완동물의 종을 입력해주세요'
										}
										value={inputs.breed}
										onChange={onEditInfo}
									/>
									<input
										id="age"
										type="number"
										placeholder={
											me?.pet?.age?.toString()
												? `펫 나이: ${me?.pet?.age.toString()}`
												: '펫 나이을 입력해주세요'
										}
										value={inputs.age ? inputs.age : '나이를 입력해주세요'}
										onChange={onEditInfo}
									/>
								</div>
								<div className="petDetails">
									<textarea
										id="introduce"
										placeholder={
											me?.pet?.introduce
												? `펫 소개: ${me?.pet?.introduce}`
												: '펫을 소개해주세요'
										}
										value={inputs.introduce}
										onChange={onEditInfo}
									/>
								</div>

								<button className="submitBtn" onClick={onSubmitUpdatedInfo}>
									프로필 수정
								</button>
							</>
						)}
					</div>
				</>
			) : (
				<div>Loading...</div>
			)}
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
