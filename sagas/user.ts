import axios, { AxiosResponse } from 'axios';
import {
	all,
	call,
	fork,
	takeLatest,
	takeEvery,
	delay,
	put,
} from '@redux-saga/core/effects';
import {
	ISignUpRequest,
	ILogInRequest,
	IUpdateRequest,
	userActionTypes,
	IPostLikeRequest,
	IDeleteUserRequest,
	IUpdatePetImageRequest,
	updateProfileData,
	logInData,
	signupData,
	updatePetImageData,
	ILoadProfileRequest,
	ILoadCardsRequest,
	loadProfileData,
} from '../interface/iUserActType';
import { IImgFile, IPet, IUser } from '../interface/iUser';

function logInAPI(data: logInData) {
	return axios.post('http://localhost:4000/user/login', data);
}


function* logIn(action: ILogInRequest) {
	try {
		const response: AxiosResponse<any> = yield call(logInAPI, action.data);
		const token = response.data.accessToken;
		axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
		document.cookie = `token=${token}`
		yield put({
			type: userActionTypes.LOG_IN_SUCCESS,
			data: response.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: userActionTypes.LOG_IN_FAILURE,
			error: err.response.data,
		});
	}
}

function signupAPI(data: signupData) {
	return axios.post('http://localhost:4000/user/signup', data);
}


function* signup(action: ISignUpRequest) {
	try {
		const { data }: AxiosResponse<any> = yield call(signupAPI, action.data);
		yield delay(1000);
		yield put({
			type: userActionTypes.SIGN_UP_SUCCESS,
		});
	} catch (err) {
		console.log(err);
		yield put({
			type: userActionTypes.SIGN_UP_FAILURE,
			error: err.response.data,
		});
	}
}

function logOutAPI() {
	return axios.post('http://localhost:4000/user/logout');
}

function* logOut() {
	
	try {
		const response: AxiosResponse<any> = yield call(logOutAPI);
		delete axios.defaults.headers.common["Authorization"];
		yield delay(1000);
		yield put({
			type: userActionTypes.LOG_OUT_SUCCESS,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: userActionTypes.LOG_OUT_FAILURE,
			error: err.response.data,
		});
	}
}


// interface IUpdateUser {
// 	id: number;
// }
// async function updateUserAPI(data: updateProfileData, access_token: string) {
//   return axios({
//     method: 'PATCH',
//     url:,
//     data,
//     headers: { access_token },
//   })
// }

// interface ILoadProfile {
// 	data?: number;
// }
function loadProfileAPI(data: loadProfileData) {
	return axios.get('url');
}
function* loadProfile(action: ILoadProfileRequest) {
	try {
		// const token = yield call()
		const { data }: AxiosResponse<any> = yield call(
			loadProfileAPI,
			action.data,
		);
		yield put({
			type: userActionTypes.LOAD_MYPROFILE_SUCCESS,
			data: data, // result.data
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: userActionTypes.LOAD_MYPROFILE_FAILURE,
			error: err.response.data,
		});
	}
}

interface ILoadCards {
	data: number;
}
function loadCardsAPI(data: number) {
	return axios.get('url');
}
function* loadCards(action: ILoadCardsRequest) {
	try {
		const { data }: AxiosResponse<any[]> = yield call(
			loadCardsAPI,
			action.data,
		);
		yield put({
			type: userActionTypes.LOAD_CARDS_SUCCESS,
			data: data, //result.data
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: userActionTypes.LOAD_CARDS_FAILURE,
			error: err.response.data,
		});
	}
}

function updateUserAPI(data: updateProfileData) {
	return axios.post('http://localhost:4000/user/userOrPetEdit', data);
}

function* updateProfile(action: IUpdateRequest) {
	try {
		const { data }: AxiosResponse<any[]> = yield call(
			updateUserAPI,
			action.data,
		);
		yield put({
			type: userActionTypes.UPDATE_PROFILE_SUCCESS,
			// data: result.data.user,
			data: action.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: userActionTypes.UPDATE_PROFILE_FAILURE,
			error: err.response.data,
		});
	}
}

// interface IUpdatePetImage {
// 	petId: number;
// 	formData: File[];
// }

function updatePetImageApi(data: updatePetImageData) {
	return axios.post('http://localhost:4000/pet/updatePetPhotoFile', data, {
		headers: { 'Content-Type': 'multipart/form-data' },
	});
}
function* updatePetImage(action: IUpdatePetImageRequest) {
	/* 
  const token = yield select(access_token)
  const headerParams = {
    'Authorization': `JWT ${access_token}`,
    'Content-Type': 'multipart/form-data',
  }
  */
	try {
		const { data } = yield call(updatePetImageApi, action.data);
		yield put({
			type: userActionTypes.UPDATE_PETIMAGE_SUCCESS,
			data: data,
			// data: result.data,
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: userActionTypes.UPDATE_PETIMAGE_FAILURE,
			error: err.response.data,
		});
	}
}

interface IPostLike {
	id: number;
}

// data will be  id : number

function postLikeApi(data: IPostLike) {
	return axios.post('url', data);
}

function* postLike(action: IPostLikeRequest) {
	//action: IPostLikeRequest
	try {
		// const result = yield call(postLIkeApi, action.data)
		yield delay(1000);
		yield put({
			type: userActionTypes.POST_LIKE_SUCCESS,
			data: action.data,
			//data: result.data
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: userActionTypes.POST_LIKE_FAILURE,
			error: err.response.data,
		});
	}
}

interface IDeleteUser {
	id: number;
}

function deleteUserApi(data: IDeleteUser) {
	return axios.post('url', data);
}

function* deleteUser(action: IDeleteUserRequest) {
	try {
		// const result = yield call(deleteUserApi, action.data)
		yield delay(1000);
		yield put({
			type: userActionTypes.DELETE_USER_SUCCESS,
			data: action.data,
			// data: result.data
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: userActionTypes.DELETE_USER_FAILURE,
			error: err.response.data,
		});
	}
}

function* watchSignUp() {
	yield takeLatest(userActionTypes.SIGN_UP_REQUEST, signup);
}

function* watchLogIn() {
	yield takeLatest(userActionTypes.LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
	yield takeLatest(userActionTypes.LOG_OUT_REQUEST, logOut);
}

function* watchLoadProfileRequest() {
	yield takeLatest(userActionTypes.LOAD_MYPROFILE_REQUEST, loadProfile);
}

function* watchLoadCardsRequest() {
	yield takeLatest(userActionTypes.LOAD_CARDS_REQUEST, loadCards);
}

function* watchProfileUpdate() {
	yield takeEvery(userActionTypes.UPDATE_PROFILE_REQUEST, updateProfile);
}

function* watchPetImageUpdate() {
	yield takeEvery(userActionTypes.UPDATE_PETIMAGE_REQUEST, updatePetImage);
}

function* watchPostLike() {
	yield takeLatest(userActionTypes.POST_LIKE_REQUEST, postLike);
}

function* watchDeleteUser() {
	yield takeEvery(userActionTypes.DELETE_USER_REQUEST, deleteUser);
}

export default function* userSaga(): Generator {
	yield all([
		fork(watchLogIn),
		fork(watchLogOut),
		fork(watchProfileUpdate),
		fork(watchPetImageUpdate),
		fork(watchSignUp),
		fork(watchPostLike),
		fork(watchDeleteUser),
		fork(watchLoadProfileRequest),
		fork(watchLoadCardsRequest),
	]);
}
