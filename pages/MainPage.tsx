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
import wrapper from '../store/configure';
import axios from 'axios';
import { END } from 'redux-saga';

const MainPage = () => {
	const { me } = useSelector((state: RootState) => state.user);
	const dispatch = useDispatch();
	console.log(me);
	useEffect(() => {
		dispatch({
			type: userActionTypes.LOG_IN_REQUEST,
		});
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
				</div>
			</section>
		</div>
	);
};

export default MainPage;

export const getServerSideProps = wrapper.getServerSideProps(
	(store) =>
		async ({ req }): Promise<any> => {
			const cookie = req?.headers.cookie; // req가 있다면 cookie에 요청에 담겨진 cookie를 할당한다.
			axios.defaults.headers.Cookie = ''; // 요청이 들어올 때마다 초기화 시켜주는 것이다. 여기는 클라이언트 서버에서 실행되므로 이전 요청이 남아있을 수 있기 때문이다
			if (req && cookie) {
				axios.defaults.headers.Cookie = cookie;
			}
			store.dispatch({
				type: userActionTypes.LOAD_CARDS_REQUEST,
			});
			store.dispatch(END);
			await store.sagaTask.toPromise();
		},
);
