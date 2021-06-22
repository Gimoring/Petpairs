import { userActionTypes, IUserActions } from '../interface/iUserActType';
import { IUser, IUserState } from '../interface/iUser';
import { HYDRATE } from 'next-redux-wrapper';
export const initialState: IUserState = {
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
	users: null,
};

const dummyUser = (data: any): IUser => ({
	name: '사람이된성시츄',
	id: 4,
	email: 'Hello@world.com',
	pet: {
		id: 1,
		petName: '강아지가된성민구',
		age: 84,
		breed: '시츄',
		species: ['강아지'],
		fileName: '시츄.png',
		matchedId: [1],
	},
});

interface HydratePayload {
	user: IUserState;
}

const reducer = (
	state = initialState,
	action: IUserActions | { type: typeof HYDRATE; payload: HydratePayload },
): IUserState => {
	switch (action.type) {
		case HYDRATE:
			return { ...state, ...action.payload.user };

		case userActionTypes.LOG_IN_REQUEST:
			return {
				...state,
				logInLoading: true,
				logInDone: false,
				logInError: null,
			};
		case userActionTypes.LOG_IN_SUCCESS:
			return {
				...state,
				logInLoading: false,
				logInDone: true,
				me: dummyUser(action.data),
				// me : action.data
			};

		case userActionTypes.LOG_IN_FAILURE:
			return {
				...state,
				logInLoading: false,
				logInError: action.error,
			};
		default:
			return state;
	}
};

export default reducer;
