import axios from 'axios';
import { all, fork, takeLatest, delay, put } from '@redux-saga/core/effects';

import { ILogInRequest, userActionTypes } from '../interface/iUserActType';

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

function* watchLogIn() {
	yield takeLatest(userActionTypes.LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
	yield takeLatest(userActionTypes.LOG_OUT_REQUEST, logOut);
}

export default function* userSaga() {
	yield all([fork(watchLogIn), fork(watchLogOut)]);
}
