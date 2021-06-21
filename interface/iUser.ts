// 펫 인터페이스

export interface IPet {
	id: null | number;
	petName: null | string;
	breed: null | string;
	species: null | string[];
	age: null | number;
	matchedId: null | number[]; //매칭된 상대 펫 ID
	fileName: null | string;
}

// 유저 인터페이스
export interface IUser {
	id: number;
	name: string;
	email: string;
	pet: IPet;
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
	users: null | IUser[];
}

//
