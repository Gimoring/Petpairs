import React, {
	useCallback,
	useState,
	useEffect,
	ReactHTMLElement,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer';
import styles from '../styles/myPetSlider.module.scss';
import Axios from 'axios';

const MyPetImgSlider = () => {
	const { me, updatePetImageDone } = useSelector(
		(state: RootState) => state.user,
	);
	const dispatch = useDispatch();
	const [current, setCurrent] = useState(0);
	const [imgFileList, setImgFileList] = useState<any>([]);
	const [imgPreviewUrls, setImgPreviewUrls] = useState<string[]>([]);

	useEffect(() => {
		console.log(imgPreviewUrls.length);
		handleChange;
		// setImgPreviewUrls([]);
		// if (imgPreviewUrls || imgFileList) {
		// 	setImgPreviewUrls([]);
		// }
		console.log(imgFileList[0]);
		// }
	}, [imgFileList]);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			console.log(imgPreviewUrls);
			console.log(imgPreviewUrls.length);
			if (e.target.files && e.target.files.length >= 1) {
				const multipleFilesArray: any[] = [];
				const newFilesArray = multipleFilesArray.concat(e.target.files);
				console.log(newFilesArray);
				const urlArray = [];
				for (let i = 0; i < e.target.files.length; i++) {
					let previewFile = e.target.files[i];
					const previewURL = URL.createObjectURL(previewFile);
					urlArray.push(previewURL);
				}
				setImgPreviewUrls([...urlArray]);

				setImgFileList([...newFilesArray]);
				// setImgFileList((existing) => existing.concat(newFilesArray))
				console.log(imgFileList);
			}

			if (
				(e.target.files && e.target.files.length > 4) ||
				imgFileList.length > 4
			) {
				window.alert('사진은 4장까지 올릴 수 있습니다! 다시 올려주세요');
				setImgFileList([]);
				setImgPreviewUrls([]);
			}
			console.log(imgFileList);
		},
		[imgFileList, setImgFileList, imgPreviewUrls, setImgPreviewUrls],
	);

	const handleSubmit = useCallback(() => {
		// if (imgFileList) {
		const formData = new FormData();
		for (var i = 0; i < imgFileList[0].length; i++) {
			// 배열로 보내짐
			formData.append('image', imgFileList[0][i]); //
			console.log(imgFileList[0][i]);
		}
		// for (let value of formData.values().toString()) {
		// 	console.log(value);
		// }
		// for (let key of formData.keys()) {
		// 	console.log(key);
		// }
		console.log(formData);
		dispatch({
			type: userActionTypes.UPDATE_PETIMAGE_REQUEST,
			data: formData,
		});

		// 	if (updatePetImageDone === true) {
		// 		window.alert('사진이 추가되었습니다!');
		// 	}
		// 	// dispatch()
		// 	// 보낼때 imgFile들 담은 배열 (formData) 를 보낸다
		// 	// 받을때 : fileName, 즉 파일의 이름들 담은 배열을 받는다
		// 	// 받은걸 디스플레이 하는건 다음 로딩 시에도 뜨게 하기 위함
		// 	// 코드:
		// 	// 사진 추가시 프리뷰 뜨게 하기
		// 	// 코드:
		// } else {
		// 	window.alert('사진을 추가해주세요!');
		// }
	}, [imgFileList]);

	// const petImgs = [
	// 	{
	// 		id: 2,
	// 		petName: '사슴이된성민G',
	// 		age: 88,
	// 		breed: '시츄',
	// 		species: ['강아지'],
	// 		fileName:
	// 			'https://images.pexels.com/photos/7853223/pexels-photo-7853223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	// 		matchedId: [5],
	// 	},
	// 	{
	// 		id: 3,
	// 		petName: '혼란을틈탄여자',
	// 		age: 82,
	// 		breed: '고양이',
	// 		species: ['고양이'],
	// 		fileName:
	// 			'https://images.pexels.com/photos/5428550/pexels-photo-5428550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
	// 		matchedId: [1],
	// 	},
	// 	{
	// 		id: 4,
	// 		petName: '강아지가된엄호태',
	// 		age: 818,
	// 		breed: '시츄',
	// 		species: ['강아지'],
	// 		fileName:
	// 			'https://images.pexels.com/photos/7098011/pexels-photo-7098011.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
	// 		matchedId: [1],
	// 	},
	// ];
	const petImgs = [
		'https://images.pexels.com/photos/7853223/pexels-photo-7853223.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
		'https://images.pexels.com/photos/5428550/pexels-photo-5428550.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
		'https://images.pexels.com/photos/7098011/pexels-photo-7098011.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
	];
	let length =
		imgPreviewUrls.length > 0
			? imgPreviewUrls.length
			: me?.pet?.fileName?.length;
	// let length = petImgs.length || imgPreviewUrls.length;
	console.log(me?.pet?.fileName?.length);
	if (!imgPreviewUrls && !me?.pet?.fileName) {
		length = 0;
	}

	console.log(length);
	const prevSlide = useCallback(
		(e) => {
			if (length) {
				setCurrent(current === 0 ? length - 1 : current - 1);
			}
		},
		[length, current],
	);

	const nextSlide = useCallback(
		(e) => {
			if (length) {
				setCurrent(current === length - 1 ? 0 : current + 1);
			}
		},
		[length, current],
	);

	if (me?.pet?.fileName && imgFileList.length === 0) {
		console.log(imgFileList);
		return <div>Loading...</div>;
	}
	return (
		<>
			<form
				className={styles.petImgSlider}
				method="post"
				encType="multipart/form-data"
			>
				<div>
					{/* {me?.pet?.fileName ? (
					<>
						{me?.pet?.fileName.map((petImg, index) => {
							return (
								<div
									className={index === current ? 'active slide' : 'slide'}
									key={index}
								> */}

					{imgPreviewUrls && imgPreviewUrls.length !== 0 ? (
						<>
							{imgPreviewUrls.map(
								(imgUrl: any, index: React.Key | null | undefined) => {
									return (
										<div
											className={index === current ? 'active slide' : 'slide'}
											key={index}
										>
											{index === current && (
												<div
													// key={index}
													className={styles.card}
													style={{
														backgroundImage: `url(${imgUrl})`,
													}}
												>
													{/* <img
													src={URL.createObjectURL(imgFile)}
													style={{ width: '100%' }}
												/> */}
													<div className={styles.arrows}>
														<div
															className={styles.leftArrow}
															onClick={prevSlide}
														>
															&#8592;
														</div>
														<div
															className={styles.rightArrow}
															onClick={nextSlide}
														>
															&#8594;
														</div>
													</div>
												</div>
											)}
										</div>
									);
								},
							)}
						</>
					) : (
						// <div>Loading...</div>
						<div>
							{me?.pet?.fileName &&
								me?.pet?.fileName.map(
									(petImg: any, index: React.Key | null | undefined) => {
										return (
											<>
												{/* {console.log(me?.pet?.fileName)} */}
												<div
													className={
														index === current ? 'active slide' : 'slide'
													}
													key={index}
												>
													{index === current && (
														<div
															className={styles.card}
															style={{
																backgroundImage: `url(${petImg.fileName})`,
															}}
														>
															<div className={styles.arrows}>
																<div
																	className={styles.leftArrow}
																	onClick={prevSlide}
																>
																	&#8592;
																</div>
																<div
																	className={styles.rightArrow}
																	onClick={nextSlide}
																>
																	&#8594;
																</div>
															</div>
														</div>
													)}
												</div>
											</>
										);
									},
								)}
						</div>
					)}
				</div>

				<div className={styles.buttons}>
					<input
						name="image"
						className={styles.addImg}
						type="file"
						onChange={handleChange}
						multiple
					/>
					<div>
						<button type="button" onClick={handleSubmit}>
							사진 업로드
						</button>
					</div>
					<button className={styles.deleteImg}>사진 삭제</button>
				</div>
			</form>
			<div>
				<input type="file" name="image" onChange={handleChange} multiple />
				<button type="button" onClick={handleSubmit}>
					hh4h54
				</button>
			</div>
		</>
	);
};
export default MyPetImgSlider;
function e(e: any) {
	throw new Error('Function not implemented.');
}
