// 유저 인터페이스
export interface IUser {
	id: number;
	name: string;
	email: string;
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
	me: null | IUser;
}
