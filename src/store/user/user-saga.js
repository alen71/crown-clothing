import { takeLatest, all, call, put } from 'redux-saga/effects';
import {
  createUserDocumentFromAuth,
  getCurrentUser,
} from '../../utils/firebase/firebase.utils';
import { signInFailed, signInSuccess } from './user.action';
import { USER_ACTION_TYPES } from './user.types';

export function* getSnapshotFromAuth(userAuth, additionalInfo) {
  try {
    const userSnapshot = yield call(
      createUserDocumentFromAuth,
      userAuth,
      additionalInfo
    );
    yield put(signInSuccess({ is: userSnapshot.id, ...userSnapshot.data() }));
    console.log(userSnapshot.data());
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield call(getCurrentUser);
    if (!userAuth) return;
    yield call(getSnapshotFromAuth, userAuth);
  } catch (error) {
    yield put(signInFailed(error));
  }
}

export function* onCheckUserSession() {
  yield takeLatest(USER_ACTION_TYPES.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* userSaga() {
  yield all([call(onCheckUserSession)]);
}
