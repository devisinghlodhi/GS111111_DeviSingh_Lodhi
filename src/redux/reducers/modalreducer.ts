import { createReducer, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  content: any;
  size: string | null;
}

const initialState: ModalState = {
  isOpen: false,
  content: '',
  size: null,
};

interface ModalPayload {
  content?: any;
  size?: string | null;
}

export const modalReducer = createReducer(initialState, (builder) => {
  builder
    .addMatcher(
      (action): action is PayloadAction<ModalPayload> => action.type === 'openModal',
      (state, action) => {
        state.isOpen = true;
        state.content = action.payload?.content ?? action.payload;
        state.size = action.payload?.size ?? null;
      }
    )
    .addMatcher(
      (action): action is PayloadAction<undefined> => action.type === 'closeModal',
      (state) => {
        state.isOpen = false;
      }
    );
});