import PetCards from '../components/PetCards';
import styles from '../styles/main.module.scss';
import MainHeader from '../components/MainHeader';
import SwipeButtons from '../components/SwipeButtons';
import Image from 'next/image';
import Link from 'next/link';
import cat2 from '../images/cat2.jpeg';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer';

const MainPage = () => {
	const { me } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch({
			type: userActionTypes.LOG_IN_REQUEST,
		});
		console.log(me);
	}, []);
	return (
		<div id={styles.mainContainer}>
			<MainHeader />
			<section className={styles.mainSection}>
				<div className={styles.chatDivision}>
					<div className={styles.profileDiv}>
						<div className={styles.profilePicDiv}>
							<Image
								className={styles.profilePicture}
								src={cat2}
								alt="profilePic"
								width={40}
								height={40}
							/>
						</div>

						<Link href="/">
							<a className={styles.profileSpan}>내 프로필</a>
						</Link>
					</div>
				</div>
				<div className={styles.mainDivision}>
					<PetCards />
					<SwipeButtons />
				</div>
			</section>
		</div>
	);
};

export default MainPage;
