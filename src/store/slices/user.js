import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axios';
// { contacts: [...] }

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,
    fullName: '',
    qrcode: '',
    profileImage: '',
    brgy: '',
    loggedIn: false,
    userType: 'individual', // could be individual or establishment

    /// FOR ESTABLISHMENT
    scanType: 'entrance' // or exit // for establishment only
  },
  reducers: {
    setName: (state, { payload }) => {
      state.firstName = payload.fullName
    },
    setLogin: (state, { payload }) => {
      state.loggedIn = true;
      state.id = payload.id;
      state.fullName = payload.fullname;
      state.qrcode = payload.qr_image_url;
      state.profileImage = payload.picture_url;
      state.brgy = payload.brgy;
      state.userType = 'individual';
    },
    setLoginEstablishment: (state, { payload }) => {
      state.loggedIn = true;
      state.id = payload.id;
      state.fullName = payload.fullname;
      state.qrcode = payload.qr_image_url;
      state.profileImage = payload.picture_url;
      state.brgy = payload.brgy;
      state.userType = 'establishment';
    },
    setLogout: (state, { payload }) => {
      state.id = null;
      state.fullName = '';
      state.qrcode = '';
      state.profileImage = '';
      state.brgy = '';
      state.loggedIn = false;
      state.userType = 'individual';
    },
    setUserProfile: (state, { payload }) => {
      console.log(payload);
    }
  },
})

// Action creators are generated for each case reducer function
export const { setName, setUserName, setUserPassword } = userSlice.actions;

export default userSlice.reducer;

export const loginIndividual = (username, password) => (dispatch, getState) => new Promise(async (resolve, reject) => {

  try {
    const response = await axios.post('/profile-log-in', {
      username,
      password
    });

    if (response.data.id) {
      dispatch(userSlice.actions.setLogin(response.data))
      resolve()
    }else {
      console.log('DIRI ERROR');
      reject(response.data.msg || 'Something went wrong.')
    }
  } catch (error) {
    reject(error)
  }
    
})

export const loginEstablishment = (username, password, loginType) => (dispatch, getState) => new Promise(async (resolve, reject) => {
  const response = await axios.post('/profile-log-in', {
    username,
    password
  });

  console.log(response.data);

  if (response.data.id) {
    dispatch(userSlice.actions.setUserProfile('MAO NI FULL'))
    resolve()
    
    
  }else {
    reject(response.data.msg || 'Something went wrong.')
  }
})

export const logout = () => (dispatch, getState) => new Promise(async (resolve, reject) => {
  try {
    dispatch(userSlice.actions.setLogout())
    resolve();
  } catch (error) {
    reject('Something went wrong.');
  }
  
})
