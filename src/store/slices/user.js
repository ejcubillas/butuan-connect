import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios';
// { contacts: [...] }

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    firstName: '',
    lastName: '',

    // account
    username: '',
    password: '',
    loggedIn: false,
  },
  reducers: {
    setName: (state, { payload }) => {
      state.firstName = payload.firstName
      state.lastName = payload.lastName
    },

    setUserName: (state, {payload}) => {
      state.username = payload.username
    },

    setUserPassword: (state, {payload}) => {
      state.password = payload.password
    },

    setLogin: (state, {payload}) => {
      console.log('YAYA');
      state.loggedIn = true;
    }
  },
})

// Action creators are generated for each case reducer function
export const { setName, setUserName, setUserPassword } = userSlice.actions;

export default userSlice.reducer;

export function login (username, password) {
  return async (dispatch) => {
    try {
      console.log('HAHA')
      dispatch(userSlice.actions.setLogin());
    }catch (error) {
      console.log(error);
      console.log("Error Error");
    }

  }
} 