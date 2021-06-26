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

// interface FormDataValue {
//   uri: string;
//   name: string;
//   type: string;
// }

// interface FormData {
//   append(name: string, value: FormDataValue, fileName?: string): void;
//   set(name: string, value: FormDataValue, fileName?: string): void;
// }

const MyPetImgSlider = () => {
	const { me } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	const [current, setCurrent] = useState(0);
	const [imgName, setImgName] = useState('');
	const [imgFileList, setImgFileList] = useState<File[]>([]);
	// const [selectedFiles, setSelectedFiles] = useState<File["name"][]>(['']);
	const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
	const [currentSelected, setCurrentSelected] = useState(0);

	const handleChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			e.preventDefault();
			if (e.target.files && e.target.files.length === 1) {
				const filesArray = [];

				// filesArray = ...e.target.files
				for (let i = 0; i < e.target.files.length; i++) {
					let imageFile = e.target.files[i];
					console.log(e.target.files[0]);

					filesArray.push(e.target.files[i]);
					console.log(e.target.files[i]);
					console.log(imageFile);
				}
				console.log(filesArray);
				setImgFileList([...imgFileList, ...filesArray]); // 각 이미지 파일 담은 배열
				console.log(imgFileList);
			}
			if (e.target.files && e.target.files.length > 1) {
				const multipleFilesArray: any[] = [];
				const newFilesArray = multipleFilesArray.concat(e.target.files);
				console.log(newFilesArray);
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
			}
			console.log(imgFileList);
		},
		[imgFileList, setImgFileList],
	);

	useEffect(() => {
		// if (imgFileList.length < 5) {
		handleChange;

		console.log(imgFileList);
		// }
	}, [imgFileList, setImgFileList]);

	const handleSubmit = useCallback(() => {
		if (imgFileList) {
			const formData = new FormData();
			for (var i = 0; i < imgFileList.length + 1; i++) {
				// 배열로 보내짐
				formData.append('imageFile', imgFileList[i]); //
			}
			console.log(formData);
			dispatch({
				type: userActionTypes.UPDATE_PETIMAGE_REQUEST,
				data: {
					id: me?.id,
					formData: formData,
				},
			});
			// dispatch()
			// 보낼때 imgFile들 담은 배열 (formData) 를 보낸다
			// 받을때 : fileName, 즉 파일의 이름들 담은 배열을 받는다
			// 받은걸 디스플레이 하는건 다음 로딩 시에도 뜨게 하기 위함
			// 코드:
			// 사진 추가시 프리뷰 뜨게 하기
			// 코드:
		} else {
			window.alert('사진을 추가해주세요!');
		}
	}, [imgFileList]);

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
											<div className={styles.arrows}>
												<div className={styles.leftArrow} onClick={prevSlide}>
													&#8592;
												</div>
												<div className={styles.rightArrow} onClick={nextSlide}>
													&#8594;
												</div>
											</div>
										</div>
									)}
								</div>
							);
						})}
					</>
				) : (
					// <div>Loading...</div>
					<div>
						{/* {imgFileList.map((imgFile) => {
							<div
								className={styles.card}
								style={{ backgroundImage: `url(${imgFile.name})` }}
							>
								<p className={styles.leftArrow} onClick={prevSlide}>
									&#8592;
								</p>
								<p className={styles.rightArrow} onClick={nextSlide}>
									&#8594;
								</p>
							</div>;
						})}
						<input type="file" onChange={handleChange} /> */}
						{imgFileList &&
							imgFileList.map(
								(imgFile: any, index: React.Key | null | undefined) => {
									return (
										<>
											{console.log(imgFile.name)}
											<div
												className={index === current ? 'active slide' : 'slide'}
												key={index}
											>
												{index === current && (
													<div
														className={styles.card}
														style={{
															backgroundImage: `url(${imgFile.name})`,
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
				{/* <button type="submit" className={styles.addImg}>
					사진 추가
				</button> */}
				<input
					className={styles.addImg}
					type="file"
					onChange={handleChange}
					multiple
				/>
				<div>
					<button type="submit" onClick={handleSubmit}>
						사진 업로드
					</button>
				</div>
				<button className={styles.deleteImg}>사진 삭제</button>
			</div>
		</div>
	);
};
export default MyPetImgSlider;
function e(e: any) {
	throw new Error('Function not implemented.');
}
