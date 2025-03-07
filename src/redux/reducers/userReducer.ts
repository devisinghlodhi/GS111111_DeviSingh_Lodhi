import { createReducer, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  isLogin: boolean;
}

const initialState: UserState = {
  isLogin: false,
};

export const userReducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(
      (action): action is PayloadAction<undefined> => action.type === 'login',
      (state) => {
        state.isLogin = true;
      }
    )
    .addMatcher(
      (action): action is PayloadAction<undefined> => action.type === 'logout',
      (state) => {
        state.isLogin = false;
      }
    );
});