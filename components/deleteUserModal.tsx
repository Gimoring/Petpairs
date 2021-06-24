import { StylesProvider } from "@material-ui/core";
import React, { useState } from "react";
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer";
import Image from 'next/image';
import mainLogo from '../images/unknown.png';
import styles from "../styles/deleteUserModal.module.scss";

interface ChildProps {
  handleModal: () => void; 
}

const DeleteUserModal: React.FC<ChildProps> = (props) => {
  // const [inputs, setInputs] = useState({
  //   email: '',
  //   password: '', 
  // })
  // const { me } = useSelector((state: RootState) => state.user)
  const router = useRouter(); 
  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   setInputs({ ...inputs, [e.target.name]: e.target.value });
  //   console.log(inputs); 
  // }

  const handleSubmit = () => {
    router.push('/'); 
  }
  return (
    <div className={styles.delUserModal} onClick={props.handleModal}>
      <div className={styles.delUserModalOuter} 
        onClick={e => {
          e.stopPropagation();
        }}
      >
        <div className={styles.delUserModalContents}>
          <Image
            className={styles.logoIcon}
            src={mainLogo}
            alt="logoIMG"        
            width={100}
            height={100}
            />
          <p className={styles.alertNote} style={{color: 'orange'}}>탈퇴 시 회원님의 모든 정보는 영구적으로 삭제됨을 알려드립니다! </p>
          <p className={styles.alertMessage}>탈퇴 하시겠습니까?</p>
          <div className={styles.delUserBtns}>
            <button className={styles.submitDelBtn} type="submit" onClick={handleSubmit}>탈퇴</button>
            <button className={styles.cancelDelBtn} type="button" onClick={() => router.reload()}>취소</button> 
          </div>
        </div>
      </div>
    </div>
  ); 
}

export default DeleteUserModal; 