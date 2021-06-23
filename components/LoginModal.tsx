import React, { ChangeEvent, useCallback, useState } from "react";
import { IUser } from "../interface/iUser";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../reducer";
import { IUserActions } from "../interface/iUserActType";
import styles from '../styles/modal.module.scss';
import { useRouter } from "next/router";
import { useEffect } from "react";
import { SettingsInputAntenna } from "@material-ui/icons";

const LoginModal = () => {
  const router = useRouter()
  const dispatch = useDispatch();
  const { me, logInDone, logInLoading } = useSelector((state: RootState) => state.user);
  const [error, setError] = useState('');
  const [input, setInput] = useState({
    email: '',
    password: '',
  });
  const { email, password } = input;

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { name, value },
    } = e
    setInput({
      ...input,
      [name]: value,
    })
  }

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input) {
      setError('정확한 정보를 입력해주세요!');
    }
    return;
  }
  dispatch(login(email, password))
}
return (
  <>
    {!me && !logInDone ? (

    )}
  </>
)
}



export default LoginModal;

