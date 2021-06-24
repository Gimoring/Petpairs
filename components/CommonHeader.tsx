import Router from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image';
import React, { Component, useCallback, useState } from 'react';
import mainLogo from '../images/unknown.png';
import styles from '../styles/commonHeader.module.scss';
import { useSelector } from 'react-redux';
import { RootState } from '../reducer';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import { useModal } from './Modal';

const CommonHeader = () => {
  const [showModal, setShowModal] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const { me } = useSelector((state: RootState) => state.user);
  const { isOpen: isAuthModalOpen, modalController, setIsOpen } = useModal();

  const handleModal = useCallback(() => {
    setShowModal(!showModal);
    console.log('눌렀다아아아아앙')
  },[showModal]);

  const onCloseModal = () => {
    setShowModal(false);
  };

  // const Login = useCallback(() => {
  //   Router.replace('/LoginPage')
  // }, []);

  // const Signup = useCallback(() => {
  //   Router.replace('/SignupPage')
  // }, []);

  const Logout = useCallback(() => {
    Router.replace('/LandingPage')
  }, []);

  const MyPage = useCallback(() => {
    Router.replace('/MyPage')
  }, []);

  return (
    <div className={styles.header}>
      <Image src={mainLogo} alt="headerImg" width={100} height={80} />
      {!isLogin ? (
        <div className={styles.button}>
          {showModal && <LoginModal handleModal={handleModal}/>}
          <button onClick={handleModal}>로그인이다아아아아</button>
          {showModal && <SignupModal handleModal={handleModal}/>}
          <button onClick={handleModal}>회원가입이다아아아</button>
          </div>) : (
            <>
              <button onClick ={MyPage}>마이페이지</button>
              <button onClick ={Logout}>로그아웃</button>
            </>)
      }
    </div>
      )
}

export default CommonHeader;