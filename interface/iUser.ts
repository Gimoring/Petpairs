export interface IUser {
	logInLoading: boolean;
	logInDone: boolean;
	logInError: null | Error;
	logOutLoading: boolean;
	logOutDone: boolean;
	logOutError: null | Error;
	signUpLoading: boolean;
	signUpDone: boolean;
	signUpError: null | Error;
	me: null | {
		nickname: string;
		id: Number;
	};
}
