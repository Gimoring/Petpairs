// 펫 인터페이스
export interface IImgFile {
	id?: null | number;
	file?: null | string;
}

export interface IPet {
	id?: null | number;
	petName?: null | string;
	breed?: null | string;
	species?: null | string;
	age?: null | number;
	matchedId?: null | number[]; //매칭된 상대 펫 ID
	fileName?: null | IImgFile[];
	like?: any; // null | number[]; // 좋아요한 상대 펫 ID
	introduce?: null | string;
}

// 유저 인터페이스
export interface IUser {
	id?: number;
	name?: string;
	email?: string;
	pet?: null | IPet;
}

// 유저 리듀서 인터페이스

export interface IUserState {
	logInLoading: boolean;
	logInDone: boolean;
	logInError: null | string;
	logOutLoading: boolean;
	logOutDone: boolean;
	logOutError: null | string;
	signUpLoading: boolean;
	signUpDone: boolean;
	signUpError: null | string;
	updateProfileLoading: boolean;
	updateProfileDone: boolean;
	updateProfileError: null | string;
	updatePetImageLoading: boolean;
	updatePetImageDone: boolean;
	updatePetImageError: null | string;
	postLikeLoading: boolean;
	postLikeDone: boolean;
	postLikeError: null | string;
	deleteUserLoading: boolean;
	deleteUserDone: boolean;
	deleteUserError: null | string;
	me: null | IUser;
	users: null | IUser[];
}

//
/*
	me: {
		id: number;
		name: string;
		email: string;
		pet: {
			id: null | number | any;
			petName: null | string | any;
			breed: null | string | any;
			species: null | string[] | any;
			age: null | number | any;
			matchedId: null | number[] | any; //매칭된 상대 펫 ID
			fileName: null | string | any;
			like: null | number[] | any; // 좋아요한 상대 펫 ID
			introduce: null | string | any;
		}
	}
*/
