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
    logType: 1, // or 0 (1 = Entrance, 0 = Exit) // for establishment only
    camera: 'back',

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
      state.logType = payload.log_type;
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
      state.camera = 'back';
    },
    setUserProfile: (state, { payload }) => {
      console.log(payload);
    },
    setEstablishmentCamera: (state, { payload }) => {
      console.log(payload);
      state.camera = payload;
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  setName,
  setLogin,
  setLoginEstablishment,
  setLogout,
  setUserProfile,
  setEstablishmentCamera
} = userSlice.actions;

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

export const loginEstablishment = (username, password, logType, camera = 'back') => (dispatch, getState) => new Promise(async (resolve, reject) => {
  console.log(username, password, logType);
  try {
    const response = await axios.post('/scan-login', {
      username,
      password,
      log_type: logType,
      camera
    });
    // console.log(response.data);
    if (response.data.success) {
      dispatch(userSlice.actions.setLoginEstablishment(response.data))
      resolve('success')

    }else {
      reject(response.data.msg || 'Something went wrong. Please try again.')
    }
  } catch (error) {
    reject('Something went wrong. Please try again.');
  }
  
})

export const establishmentCamera = () => (dispatch, getState) => {
  const state = getState();
  console.log(state.user);
  if (state.user.camera == 'back') {
    dispatch(userSlice.actions.setEstablishmentCamera('front'))
  }else {
    dispatch(userSlice.actions.setEstablishmentCamera('back'))
  }
  return;
}

export const logout = () => (dispatch, getState) => new Promise(async (resolve, reject) => {
  try {
    dispatch(userSlice.actions.setLogout())
    resolve();
  } catch (error) {
    reject('Something went wrong.');
  }
  
})
