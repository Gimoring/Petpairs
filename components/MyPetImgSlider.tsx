import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer';
import styles from '../styles/myPetSlider.module.scss';

const MyPetImgSlider = () => {
	const { me } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const [current, setCurrent] = useState(0);
	// const length = me?.pet?.fileName?.length;

	// const [petImgs, setPetImgs] = useState(['']);

	// useEffect(() => {
	//   if(me?.pet?.fileName) {
	//     setPetImgs(me?.pet?.fileName)
	//   }
	// }, [me?.pet?.fileName])

	const handleSubmit = useCallback((e) => {}, []);

	const petImgs = [
		{
			id: 2,
			petName: '사슴이된성민G',
			age: 88,
			breed: '시츄',
			species: ['강아지'],
			fileName:
				'https://images.pexels.com/photos/7853223/pexels-photo-7853223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			matchedId: [5],
		},
		{
			id: 3,
			petName: '혼란을틈탄여자',
			age: 82,
			breed: '고양이',
			species: ['고양이'],
			fileName:
				'https://images.pexels.com/photos/5428550/pexels-photo-5428550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
			matchedId: [1],
		},
		{
			id: 4,
			petName: '강아지가된엄호태',
			age: 818,
			breed: '시츄',
			species: ['강아지'],
			fileName:
				'https://images.pexels.com/photos/7098011/pexels-photo-7098011.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
			matchedId: [1],
		},
	];
	const length = petImgs.length;
	// if (!me?.pet?.fileName) {
	// 	return null;
	// }
	const prevSlide = useCallback(
		(e) => {
			if (length !== undefined) {
				setCurrent(current === 0 ? length - 1 : current - 1);
			}
		},
		[length, current],
	);

	const nextSlide = useCallback(
		(e) => {
			if (length !== undefined) {
				setCurrent(current === length - 1 ? 0 : current + 1);
			}
		},
		[length, current],
	);

	return (
		<div className={styles.petImgSlider}>
			{/* <div className={styles.arrows}> */}

			{/* </div> */}
			<div>
				{/* {me?.pet?.fileName ? (
					<>
						{me?.pet?.fileName.map((petImg, index) => {
							return (
								<div
									className={index === current ? 'active slide' : 'slide'}
									key={index}
								> */}
				{petImgs ? (
					<>
						{petImgs.map((petImg: any, index: React.Key | null | undefined) => {
							return (
								<div
									className={index === current ? 'active slide' : 'slide'}
									key={index}
								>
									{index === current && (
										<div
											// key={index}
											className={styles.card}
											style={{ backgroundImage: `url(${petImg.fileName})` }}
										>
											<p className={styles.leftArrow} onClick={prevSlide}>
												&#8592;
											</p>
											<p className={styles.rightArrow} onClick={nextSlide}>
												&#8594;
											</p>
										</div>
									)}
								</div>
							);
						})}
					</>
				) : (
					// <div>Loading...</div>
					<div className={styles.card}>
						<p className={styles.leftArrow} onClick={prevSlide}>
							&#8592;
						</p>
						<p className={styles.rightArrow} onClick={nextSlide}>
							&#8594;
						</p>
					</div>
				)}
			</div>
			<div className={styles.buttons}>
				<button type="submit" onClick={handleSubmit} className={styles.addImg}>
					사진 추가
				</button>
				<button className={styles.deleteImg}>사진 삭제</button>
			</div>
		</div>
	);
};
export default MyPetImgSlider;
