// 펫 인터페이스

export interface IPet {
	id: null | number;
	petName: null | string;
	breed: null | string;
	species: null | string[];
	age: null | number;
	matchedId: null | number[]; //매칭된 상대 펫 ID
	fileName: null | string[];
	like: any; // null | number[]; // 좋아요한 상대 펫 ID
	introduce: null | string;
}

// 유저 인터페이스
export interface IUser {
	id: number;
	name: string;
	email: string;
	pet: null | IPet;
}

// 유저정보 수정 인터페이스
export interface IUserProfile {
	name?: string;
	email?: string;
	pet?: {
		petName?: null | string;
		breed?: null | string;
		age?: null | number;
		matchedId?: null | number[]; //매칭된 상대 펫 ID
		like?: any; // 좋아요한 상대 펫 ID
		fileName?: null | string[];
		introduce?: null | string;
	};
}

// // 유저펫정보 수정 인터페이스
// export interface IEditPet {
//   petName?: null | string;
//   breed?: null | string;
//   age?: null | number;
//   fileName?: null | string;
// }

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
	loadProfileLoading: boolean;
	loadProfileDone: boolean;
	loadProfileError: null | string;
	updateProfileLoading: boolean;
	updateProfileDone: boolean;
	updateProfileError: null | string;
	postLikeLoading: boolean;
	postLikeDone: boolean;
	postLikeError: null | string;
  deleteUserLoading: boolean;
  deleteUserDone: boolean;
  deleteUserError: null | string; 
	me: null | IUser | IUserProfile;
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
