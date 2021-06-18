import produce from 'immer';
import { AnyAction } from 'redux';
import { IUser } from '../interface/iUser';

export const initialState = {
	logInLoading: false,
	logInDone: false,
	logInError: null,
	logOutLoading: false,
	logOutDone: false,
	logOutError: null,
	signUpLoading: false,
	signUpDone: false,
	signUpError: null,
	me: null,
};

export type IUserReducerState = typeof initialState;

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST';
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS';
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE';

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST';
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS';
export const LOG_OUT_FAILURE = 'LOG_OUT_FAILURE';

export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST';
export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS';
export const SIGN_UP_FAILURE = 'SIGN_UP_FAILURE';

const dummyUser = (data: any) => ({
	...data,
	nickname: '성민호',
	id: 1,
});

const reducer = (state = initialState, action: AnyAction) =>
	produce(state, (draft) => {
		switch (action.type) {
			case LOG_IN_REQUEST:
				draft.logInLoading = true;
				draft.logInDone = false;
				draft.logInError = null;
				break;
			case LOG_IN_SUCCESS:
				draft.logInLoading = false;
				draft.logInDone = true;
				draft.me = dummyUser(action.data);
				break;
			case LOG_IN_FAILURE:
				draft.logInLoading = false;
				draft.logInError = action.error;
				break;
			default:
				break;
		}
	});

export default reducer;
