import { userActionTypes, IUserActions } from '../interface/iUserActType';
import { IUser, IUserState, IUserProfile } from '../interface/iUser';
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
  loadProfileLoading: false,
  loadProfileDone: false,
  loadProfileError: null, 
  updateProfileLoading: false,
  updateProfileDone: false,
  updateProfileError: null, 
	me: null,
	users: null
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
		fileName: ['시츄.png'],
		matchedId: [1],
    introduce: '멍멍', 
	},
});

export const dummyMe = (data: any): IUserProfile => ({
	name: '사람이된성시츄',
	email: 'Hello@world.com',
  pet: {
    petName: '강아지가된성민구',
    age: 84,
    breed: '시츄',
    fileName: ['시츄.png'],
    introduce: '멍멍', 
  }
});

export const dataSet = {
  name: '사람이된성시츄',
	email: 'Hello@world.com',
  pet: {
    petName: '강아지가된성민구',
    age: 84,
    breed: '시츄',
    fileName: '시츄.png',
  }
}

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

    
    case userActionTypes.LOAD_PROFILE_REQUEST:
      return {
        ...state,
        loadProfileLoading: true,
        loadProfileDone: false,
        loadProfileError: null,
      };

    case userActionTypes.LOAD_PROFILE_SUCCESS:
      return {
        ...state,
        loadProfileLoading: false, 
        loadProfileDone: true, 
        loadProfileError: null,
        me: action.data, 
      };

    case userActionTypes.LOAD_PROFILE_FAILURE:
      return {
        ...state,
        loadProfileLoading: false,
        loadProfileError: action.error,
      };

    case userActionTypes.UPDATE_PROFILE_REQUEST: 
      return {
        ...state,
        updateProfileLoading: true, 
        updateProfileDone: false, 
        updateProfileError: null,
        me: action.data, 
      };

    case userActionTypes.UPDATE_PROFILE_SUCCESS: 
      return {
        ...state,
        updateProfileLoading: false, 
        updateProfileDone: true, 
        updateProfileError: null,
        me: action.data, 
      };

    case userActionTypes.UPDATE_PROFILE_FAILURE: 
      return {
        ...state,
        updateProfileLoading: false, 
        updateProfileError: action.error,
      };
      


		case userActionTypes.LOG_OUT_REQUEST:
			return {
				...state,
				logOutLoading: true,
				logOutDone: false,
				logInError: null,
			};

		case userActionTypes.LOG_OUT_SUCCESS:
			return {
				...state,
				logOutLoading: false,
				logOutDone: true,
				me: null,
			};	
			
		case userActionTypes.LOG_OUT_FAILURE:
			return {
				...state,
				logOutLoading: false,
				logOutError: action.error,
			};	
		
		case userActionTypes.SIGN_UP_REQUEST:
			return {
				...state,
				signUpLoading: true,
				signUpDone: false,
				signUpError: null,
			};
		
		case userActionTypes.SIGN_UP_SUCCESS:
			return {
				...state,
				signUpLoading: false,
				signUpDone: true,
			};
		
		case userActionTypes.SIGN_UP_FAILURE:
			return {
				...state,
				signUpLoading: false,
				signUpError: action.error,
			};

		default:
			return state;
	}
};

export default reducer;
