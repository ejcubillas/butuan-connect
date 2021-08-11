import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios';
// { contacts: [...] }

export const tracingSlice = createSlice({
  name: 'tracing',
  initialState: {
    history: [],
    offlineScan: [],

    /// ESTABLISHMENT
    estabOfflineScan: [
      {
        date: '',
        id: '',
        qr:'',
        logType: 0, // or 1
        synced: false
      }
    ]
  },
  reducers: {
    setHistory: (state, { payload }) => {
      state.history = payload.history;
    },

    setOfflineScan: (state, { payload }) => {
      state.offlineScan.push(payload);
      // state.te
    },

    setEstOfflineScan: () => {

    }

    
  },
})

// Action creators are generated for each case reducer function
export const { setHistory } = tracingSlice.actions;

export default tracingSlice.reducer;

export function getHistory (username, password) {
  
  const tempHistory = [
    {
      date: Date.now(),
      location: 'Gaisano Butuan',
      type: 'Business Establishment',
      traceType: 'Exit'
    },

    {
      date: Date.now(),
      location: 'SM City Butuan',
      type: 'Business Establishment',
      traceType: 'Entrance'
    },

    {
      date: Date.now(),
      location: 'SM City Butuan',
      type: 'Business Establishment',
      traceType: 'Exit'
    },

    {
      date: Date.now(),
      location: 'SM City Butuan',
      type: 'Business Establishment',
      traceType: 'Entrance'
    },

    {
      date: Date.now(),
      location: 'SM City Butuan',
      type: 'Business Establishment',
      traceType: 'Exit'
    },

    {
      date: Date.now(),
      location: 'SM City Butuan',
      type: 'Business Establishment',
      traceType: 'Entrance'
    },

    {
      date: Date.now(),
      location: 'SM City Butuan',
      type: 'Business Establishment',
      traceType: 'Exit'
    },

    {
      date: Date.now(),
      location: 'SM City Butuan',
      type: 'Business Establishment',
      traceType: 'Entrance'
    },

    {
      date: Date.now(),
      location: 'SM City Butuan',
      type: 'Business Establishment',
      traceType: 'Exit'
    },

    {
      date: Date.now(),
      location: 'SM City Butuan',
      type: 'Business Establishment',
      traceType: 'Entrance'
    },

    {
      date: Date.now(),
      location: 'SM City Butuan',
      type: 'Business Establishment',
      traceType: 'Exit'
    },

    {
      date: Date.now(),
      location: 'SM City Butuan',
      type: 'Business Establishment',
      traceType: 'Entrance'
    },
  ]

  return async (dispatch) => {
    try {
      console.log('HAHA')
      dispatch(tracingSlice.actions.setHistory({history: tempHistory}));
    }catch (error) {
      console.log(error);
      console.log("Error Error");
    }

  }
} 

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