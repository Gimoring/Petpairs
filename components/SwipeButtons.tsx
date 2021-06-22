import React from 'react';
import styles from '../styles/swipeButtons.module.scss';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CloseIcon from '@material-ui/icons/Close';
import { IconButton } from '@material-ui/core';
const SwipeButtons = () => {
	return (
		<div className={styles.swipeButtonContainer}>
			<IconButton className={styles.buttonBox}>
				<CloseIcon className={styles.buttonIcon} color="primary" />
			</IconButton>
			<IconButton className={styles.buttonBox}>
				<FavoriteIcon className={styles.buttonIcon} color="secondary" />
			</IconButton>
		</div>
	);
};

export default SwipeButtons;
