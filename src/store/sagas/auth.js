import { delay } from 'redux-saga/effects';
import { put } from "redux-saga/effects";
import * as actions from '../actions/index';
import {logout} from "../actions/index";
import axios from "axios";
import { authFailed, authStart, authSuccess, checkAuthTimeout } from "../actions/auth";

export function* logoutSaga(action) {
  yield localStorage.removeItem("token");
  yield localStorage.removeItem("expirationDate");
  yield localStorage.removeItem("userId");
  yield put(actions.logoutSucceed());
}

export function* checkAuthTimeoutSaga(action) {
  yield delay(action.expirationTime * 1000);
  yield put(actions.logout());
}

export function* authUserSaga(action) {
  yield put(actions.authStart());
  const authData = {
    email: action.email,
    password: action.password,
    returnSecureToken: true
  };
  let url =
    "https://www.googleapis.com/identitytoolkit/v3/relyingparty/signupNewUser?key=AIzaSyDPvbpr0s8VpP6_mE94wroUr1JdJi2UEDw";
  if (!action.isSignUp) {
    url =
      "https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyDPvbpr0s8VpP6_mE94wroUr1JdJi2UEDw";
  }
  try {
    const response = yield axios.post(url, authData);
  
    const expirationDate = yield new Date(new Date().getDate() + response.data.expiresIn * 1000);
    yield localStorage.setItem("token", response.data.idToken);
    yield localStorage.setItem("expirationDate", expirationDate);
    yield localStorage.setItem("userId", response.data.localId);
    yield put(actions.authSuccess(response.data.idToken, response.data.localId));
    yield put(actions.checkAuthTimeout(response.data.expiresIn));
  } catch (error) {
    yield put(actions.authFailed(error.response.data.error));
  }
}