import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import companyReducer from '../features/companies/companySlice';
import ipoReducer from '../features/ipos/ipoSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    companies: companyReducer,
    ipos: ipoReducer,
  },
});