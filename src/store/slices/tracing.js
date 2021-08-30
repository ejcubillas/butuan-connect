import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios';
import moment from 'moment-timezone';
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
    },

    clearEstOfflineScan: (state, { payload }) => {
      state.estabOfflineScan = [];
    },

    clearOfflineScan: (state, { payload }) => {
      state.offlineScan = [];
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
      code: qrcode,
      id: state.user.id,
      datetime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    }))

    resolve({
      result: 'OFFLINE'
    });

  }else {
    // if online, send to server
    try {
      const response = await axios.post('/profile-establishment-scan', {
        id: state.user.id,
        code: qrcode
      })

      if (response.data.success) {
        resolve({
          result: 'ONLINE',
          data: response.data
        })
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
      code: qrcode,
      id: state.user.id,
      datetime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
      log_type: state.user.logType
    }))

    resolve({
      result: 'OFFLINE'
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
        resolve({
          result: 'ONLINE',
          data: response.data
        });
      }else {
        reject(response.data.msg || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      reject('Something went wrong. Please try again.');
    }

  }
})

export const syncScannedEstablishment = () => (dispatch, getState) => new Promise(async (resolve, reject) => {
  const state = getState();
  // dispatch(tracingSlice.actions.clearOfflineScan())
  if (!state.network.isInternetReachable) {
    return reject({
      message: 'Unble to sync, please check your internet connection.',
      status: 'ERROR'
    })
  }

  if (state.tracing.offlineScan.length == 0) {
    return reject({
      message: 'No records to sync.',
      status: 'NORECORDS'
    })
  }

  try {
    const response = await axios.post('/establishment-sync', state.tracing.offlineScan, {
      headers: {
        'content-type': 'application/json'
      }
    });
    if (!response.data.success) {
      reject({
        message: 'Something went wrong while syncing records.',
        status: 'ERROR'
      })  
    }else {
      dispatch(tracingSlice.actions.clearOfflineScan())
      resolve({
        status: 'SUCCESS',
        message: 'Records synced successfully.'
      });
    }

  } catch (error) {
    console.log(error);
    reject({
      message: 'Something went wrong while syncing records. asdasd',
      status: 'ERROR'
    })
  }
})

export const syncScannedIndividual = () => (dispatch, getState) => new Promise(async (resolve, reject) => {
  const state = getState();
  // dispatch(tracingSlice.actions.clearEstOfflineScan())

  if (!state.network.isInternetReachable) {
    return reject({
      message: 'Unble to sync, please check your internet connection.',
      status: 'ERROR'
    })
  }

  console.log(state.tracing.estabOfflineScan);

  if (state.tracing.estabOfflineScan.length == 0) {
    return reject({
      message: 'No records to sync.',
      status: 'NORECORDS'
    })
  }

  try {
    const response = await axios.post('/individual-sync', state.tracing.estabOfflineScan, {
      headers: {
        'content-type': 'application/json'
      }
    });
    if (!response.data.success) {
      reject({
        message: 'Something went wrong while syncing records.',
        status: 'ERROR'
      })  
    }else {
      dispatch(tracingSlice.actions.clearEstOfflineScan())
      resolve({
        status: 'SUCCESS',
        message: 'Records synced successfully.'
      });
    }

  } catch (error) {
    console.log(error);
    reject({
      message: 'Something went wrong while syncing records. asdasd',
      status: 'ERROR'
    })
  }
})