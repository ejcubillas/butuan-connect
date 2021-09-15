import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios';
// { contacts: [...] }

export const networkSlice = createSlice({
  name: 'network',
  initialState: {
    type: '',
    isConnected: false,
    isInternetReachable: false
  },
  reducers: {
    setNetwork: (state, { payload }) => {
      state.type = payload.type;
      state.isConnected = payload.isConnected;
      state.isInternetReachable = payload.isInternetReachable;
    },

    
  },
})

// Action creators are generated for each case reducer function
export const { setNetwork } = networkSlice.actions;

export default networkSlice.reducer;

export const setNetworkInfo = (netinfo) => (dispatch, getState) => new Promise((resolve, reject) => {
  // console.log(netinfo);
  dispatch(networkSlice.actions.setNetwork(netinfo))
  resolve('saved');

})

export const Test = () => (dispatch, getState) => new Promise ((resolve, reject) => {
  console.log('=========== CURRENT NETWORK STATE ===============');
  const netinfo = useNetInfo();
  console.log(netinfo);
  resolve('NICE');
})