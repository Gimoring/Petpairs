import React, { useCallback, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer";
import styles from '../styles/myPetSlider.module.scss'; 

const MyPetImgSlider = () => {
  const { me, updateProfileDone, updateProfileError } = useSelector((state: RootState) => 
  state.user
  );
  const [current, setCurrent] = useState(0);
  const length = me?.pet?.fileName?.length; 
  // const [petImgs, setPetImgs] = useState(['']); 

  // useEffect(() => {
  //   if(me?.pet?.fileName) {
  //     setPetImgs(me?.pet?.fileName)  
  //   }
  // }, [me?.pet?.fileName])

  return (
    <div className={styles.petImgSlider}>
      {/* <arrow className={styles.leftArrow} />
      <arrow className={styles.rightArrow} /> */}
      <div>
        {me?.pet?.fileName ? me?.pet?.fileName.map((petImg, index) => {
          return (
            <div 
              key={index} 
              className={styles.card}
              style={{ backgroundImage: `url${petImg}`}}
            />
          )
        })
      :
        <div>Loading...</div>}
      </div>
      <div className={styles.buttons}>
        <button className={styles.addImg}>사진 추가</button>
        <button className={styles.deleteImg}>사진 삭제</button>
      </div>
    </div>
  )

}
export default MyPetImgSlider; 