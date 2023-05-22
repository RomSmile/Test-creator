import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ITest, ITestReducer } from './typesReducer';

const initialState: ITestReducer = {
  tests: null,
};

export const TestSlice = createSlice({
  name: 'AlertStore',
  initialState,
  extraReducers: {},
  reducers: {
    addTest: (state, action: PayloadAction<ITest>) => {
      const { payload } = action;  
      state.tests = state.tests === null
        ? [ payload ]
        : [ ...state.tests, payload];
    },
  },
});

export default TestSlice.reducer;
