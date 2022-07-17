import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { UserType } from '../../types/UserType';

interface InitialState {
  value: UserType
}

const initialState:InitialState = {
  value: {
    uid: "",
    email: "",
    displayName: "",
    photoUrl: "",
  }
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state, action) => {
      state.value = action.payload
    },
    logout: (state) => {
      state = initialState
    }
  },
});

export const { login, logout } = userSlice.actions;

export const selectUser = (state: RootState) => state.user.value;

export default userSlice.reducer;
