import axios from 'axios';
import {
	all,
	fork,
	takeLatest,
	takeEvery,
	delay,
	put,
} from '@redux-saga/core/effects';
import {
	ISignUpRequest,
	ILogInRequest,
	ILoadProfileRequest,
	IUpdateRequest,
	userActionTypes,
	IPostLikeRequest,
  IDeleteUserRequest,
} from '../interface/iUserActType';

function* logIn(action: ILogInRequest) {
	try {
		// const result = yield call(logInAPI, action.data);
		yield delay(1000);
		yield put({
			type: userActionTypes.LOG_IN_SUCCESS,
			// data: result.data
		});
	} catch (err) {
		console.error(err);
		yield put({
			type: userActionTypes.LOG_IN_FAILURE,
			error: err.response.data,
		});
	}
}

function* signup(action: ISignUpRequest) {
	try {
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
	return axios.post('/api/logout');
}

function* logOut() {
	try {
		// const result = yield call(logOutAPI);
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

function* loadUserProfile(action: ILoadProfileRequest) {
	try {
		// const result = yield call (loadUserAPI, action.data);
		yield delay(1000);
		yield put({
			type: userActionTypes.LOAD_PROFILE_SUCCESS,
			// data: result.data.user
		});
	} catch (err) {
		yield put({
			type: userActionTypes.LOAD_PROFILE_FAILURE,
			error: err.response.data,
		});
	}
}
// async function updateUserAPI(userId: string, data: any, access_token: string) {
//   return axios({
//     method: 'PATCH',
//     url:,
//     data,
//     headers: { access_token },
//   })
// }
function* updateProfile(action: IUpdateRequest) {
	try {
		// const result = yield call(updateUserAPI, action.data);
		yield delay(1000);
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
  return axios.post('url', data)
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

function* watchLoadProfile() {
	yield takeEvery(userActionTypes.LOAD_PROFILE_REQUEST, loadUserProfile);
}

function* watchProfileUpdate() {
	yield takeEvery(userActionTypes.UPDATE_PROFILE_REQUEST, updateProfile);
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
		fork(watchLoadProfile),
		fork(watchProfileUpdate),
		fork(watchSignUp),
		fork(watchPostLike),
    fork(watchDeleteUser), 
	]);
}