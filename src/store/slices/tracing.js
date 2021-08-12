import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios';
// { contacts: [...] }

export const tracingSlice = createSlice({
  name: 'tracing',
  initialState: {
    history: [],
    offlineScan: [],

    /// ESTABLISHMENT
    estabOfflineScan: []
  },
  reducers: {
    setHistory: (state, { payload }) => {
      state.history = payload.history;
    },

    setOfflineScan: (state, { payload }) => {
      state.offlineScan.push(payload);
      // state.te
    },

    setEstOfflineScan: (state, { payload }) => {
      console.log(state.estabOfflineScan);
      state.estabOfflineScan.push(payload);
    }

    
  },
})

// Action creators are generated for each case reducer function
export const { setHistory } = tracingSlice.actions;

export default tracingSlice.reducer;

///// INDIVIDUAL
export const scanEstablishment = (qrcode) => (dispatch, getState) => new Promise(async (resolve, reject) => {
  //tracing
  const state = getState();
  // resolve();
  
  if (!state.network.isInternetReachable) {
    // if offline (network.isInternetReachable == false), save it to offlineScan
    // save it to offline scan
    dispatch(tracingSlice.actions.setOfflineScan({
      qrcode,
      id: state.user.id,
      synced: false,
      date: Date.now()
    }))

    resolve('Offline Scan - success');

  }else {
    // if online, send to server
    try {
      const response = await axios.post('/profile-establishment-scan', {
        id: state.user.id,
        code: qrcode
      })

      if (response.data.success) {
        resolve('Online Scan - success');
      }else {
        reject(response.data.msg);
      }
    } catch (error) {
      reject('Something went wrong. Please try again.')
    }
  }


  
  
})


///// Establishment
export const scanIndividual = (qrcode) => (dispatch, getState) => new Promise(async (resolve, reject) => {
  const state = getState();
  console.log(qrcode);

  if (!state.network.isInternetReachable) {
    // if offline (network.isInternetReachable == false), save it to offlineScan
    // save it to offline scan
    dispatch(tracingSlice.actions.setEstOfflineScan({
      qrcode,
      id: state.user.id,
      synced: false,
      date: Date.now()
    }))

    resolve({
      status: 'COMPLETED-OFFLINE'
    })

  }else {
    try {
      const response = await axios.post('/scan-individual', {
        code: qrcode,
        id: state.user.id,
        log_type: state.user.logType
      })
  
      console.log(response.data);
  
      if (response.data.success) {
        if (response.data.status == 'INVALID') {
          resolve({
            status: 'INVALID',
            data: response.data
          });
        }else if (response.data.status == 'COMPLETED') {
          resolve({
            status: 'COMPLETED',
            data: response.data
          })
        }
      }else {
        reject(response.data.msg || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      reject('Something went wrong. Please try again.');
    }

  }
})