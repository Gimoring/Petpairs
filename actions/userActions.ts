import { logInData, userActionTypes } from './../interface/iUserActType';
// 3.  액션 타입과 액션타입에 맞는 인터페이스로 액션크리에이터 만들어주기
export function logInAction(data: logInData) {
	/*
		interface logInData {
		email: string;
		password: string;
		}
	*/
	return {
		type: userActionTypes.LOG_IN_REQUEST,
		data,
	};
}
