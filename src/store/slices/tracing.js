import { createSlice } from '@reduxjs/toolkit'
import axios from '../../utils/axios';
// { contacts: [...] }

export const tracingSlice = createSlice({
  name: 'tracing',
  initialState: {
    history: []
  },
  reducers: {
    setHistory: (state, { payload }) => {
      state.history = payload.history;
    },

    setLogin: (state, {payload}) => {
      console.log('YAYA');
      state.loggedIn = true;
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