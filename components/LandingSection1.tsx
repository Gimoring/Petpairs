import Link from 'next/link';
import { StylesProvider } from '@material-ui/styles';
import { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { userActionTypes } from '../interface/iUserActType';
import { RootState } from '../reducer/index';
import styles from '../styles/landingSection1.module.scss'

const Section1 = () => {
    const { me } = useSelector((state: RootState) => state.user);
    const dispatch = useDispatch();

    return (
        <div className={styles.section1}>
            <h1>
                <span className={styles.text}>P</span>
                <span className={styles.text}>E</span>
                <span className={styles.text}>T</span>
                <span className={styles.text}>P</span>
                <span className={styles.text}>A</span>
                <span className={styles.text}>I</span>
                <span className={styles.text}>R</span>
                <span className={styles.text}>S</span>
            </h1>
        </div>
    );
};

export default Section1;