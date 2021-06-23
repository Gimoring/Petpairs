// 1. 액션타입 지정해주기

import { IPet, IUser, IUserProfile } from './iUser';

export enum userActionTypes {
	LOG_IN_REQUEST = 'LOG_IN_REQUEST',
	LOG_IN_SUCCESS = 'LOG_IN_SUCCESS',
	LOG_IN_FAILURE = 'LOG_IN_FAILURE',

	LOG_OUT_REQUEST = 'LOG_OUT_REQUEST',
	LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS',
	LOG_OUT_FAILURE = 'LOG_OUT_FAILURE',

	POST_LIKE_REQUEST = 'POST_LIKE_REQUEST',
	POST_LIKE_SUCCESS = 'POST_LIKE_SUCCESS',
	POST_LIKE_FAILURE = 'POST_LIKE_FAILURE',

	LOAD_PROFILE_REQUEST = 'LOAD_PROFILE_REQUEST',
	LOAD_PROFILE_SUCCESS = 'LOAD_PROFILE_SUCCESS',
	LOAD_PROFILE_FAILURE = 'LOAD_PROFILE_FAILURE',

	UPDATE_PROFILE_REQUEST = 'UPDATE_PROFILE_REQUEST',
	UPDATE_PROFILE_SUCCESS = 'UPDATE_PROFILE_SUCCESS',
	UPDATE_PROFILE_FAILURE = 'UPDATE_PROFILE_FAILURE',

	SIGN_UP_REQUEST = 'SIGN_UP_REQUEST',
	SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS',
	SIGN_UP_FAILURE = 'SIGN_UP_FAILURE',
}

export interface signupData {
	name: string;
	email: string;
	password: string;
}

export interface logInData {
	email: string;
	password: string;
}

export interface updateProfileData {
	name?: string;
	email?: string;
	pet?: {
		petName?: null | string;
		breed?: null | string;
		age?: null | number;
		fileName?: null | string;
		introduce?: null | string;
	};
}
// 2. 액션 크리에이터의 인터페이스 만들어주기

export interface ISignUpRequest {
	type: userActionTypes.SIGN_UP_REQUEST;
	data: signupData;
}

export interface ISignUpSuccess {
	type: userActionTypes.SIGN_UP_SUCCESS;
}

export interface ISignUpFailure {
	type: userActionTypes.SIGN_UP_FAILURE;
	error: string;
}

export interface ILogInRequest {
	type: userActionTypes.LOG_IN_REQUEST;
	data: logInData;
}

export interface ILogInSuccess {
	type: userActionTypes.LOG_IN_SUCCESS;
	data: IUser;
}

export interface ILogInFailure {
	type: userActionTypes.LOG_IN_FAILURE;
	error: string;
}

export interface ILogOutRequest {
	type: userActionTypes.LOG_OUT_REQUEST;
}

export interface IPostLikeRequest {
	type: userActionTypes.POST_LIKE_REQUEST;
	data: number;
}

export interface IPostLikeSuccess {
	type: userActionTypes.POST_LIKE_SUCCESS;
	data: number;
}

export interface IPostLikeFailure {
	type: userActionTypes.POST_LIKE_FAILURE;
	error: string;
}

export interface ILoadProfileRequest {
	type: userActionTypes.LOAD_PROFILE_REQUEST;
	data: IUser['id'];
}

export interface ILoadProfileSuccess {
	type: userActionTypes.LOAD_PROFILE_SUCCESS;
	data: IUserProfile;
}

export interface ILoadProfileFailure {
	type: userActionTypes.LOAD_PROFILE_FAILURE;
	error: string;
}

export interface IUpdateRequest {
	type: userActionTypes.UPDATE_PROFILE_REQUEST;
	data: updateProfileData;
}

export interface IUpdateSuccess {
	type: userActionTypes.UPDATE_PROFILE_SUCCESS;
	data: IUserProfile;
}

export interface IUpdateFailure {
	type: userActionTypes.UPDATE_PROFILE_FAILURE;
	error: string;
}

export interface ILogOutSuccess {
	type: userActionTypes.LOG_OUT_SUCCESS;
}

export interface ILogOutFailure {
	type: userActionTypes.LOG_OUT_FAILURE;
	error: string;
}

// 리듀서에서 리턴 값으로 쓰기위해 인터페이스 내보내기

export type IUserActions =
	| ILogInRequest
	| ILogInSuccess
	| ILogInFailure
	| ISignUpRequest
	| ISignUpSuccess
	| ISignUpFailure
	| ILogOutRequest
	| ILogOutSuccess
	| ILogOutFailure
	| ILoadProfileRequest
	| ILoadProfileSuccess
	| ILoadProfileFailure
	| IUpdateRequest
	| IUpdateSuccess
	| IUpdateFailure
	| IPostLikeRequest
	| IPostLikeSuccess
	| IPostLikeFailure;
