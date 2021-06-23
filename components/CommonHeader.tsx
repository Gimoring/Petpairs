import Router from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { useCallback, useState } from 'react';
import mainLogo from '../images/unknown.png';
import styles from '../styles/commonHeader.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../reducer';

const CommonHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { me } = useSelector((state: RootState) => state.user);

  const onClickModal = useCallback(() => {
    setShowModal((state) => !state);
    console.log('눌렀다아아아아앙')
  }, []);

  const onCloseModal = useCallback(() => {
    setShowModal(false);
  }, []);

  const Login = useCallback(() => {
    Router.replace('/LoginPage')
  }, []);

  const Signup = useCallback(() => {
    Router.replace('/SignupPage')
  }, []);

  const MyPage = useCallback(() => {
    Router.replace('/MyPage')
  }, []);

  return (
    <nav className={styles.header}>
      <Image src={mainLogo} alt="headerImg" width={70} height={70} />
      
    </nav>
  )
}

export default CommonHeader;