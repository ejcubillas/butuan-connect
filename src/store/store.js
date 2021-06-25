import { configureStore } from '@reduxjs/toolkit'

import userReducer from './slices/user'
import tracingReducer from './slices/tracing'

export default configureStore({
  reducer: {
    user: userReducer,
    tracing: tracingReducer
  },
})