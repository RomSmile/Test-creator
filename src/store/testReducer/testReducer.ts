import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTests } from "@/store/testReducer/testsActions";
import { IInfoResponse } from "@/servises/types";
import { IGetTestsResponse, ITestReducer } from "@/store/testReducer/types";

const initialState: ITestReducer = {
  tests: null,
  lastPage: null,
  loading: false,
  error: "",
};

export const TestSlice = createSlice({
  name: "AlertStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getTests.fulfilled,
      (
        state: ITestReducer,
        action: PayloadAction<IGetTestsResponse | IInfoResponse>,
      ) => {
        const { lastPage, items } = action.payload as IGetTestsResponse;

        state.lastPage = lastPage;
        state.tests = items;
        state.loading = false;
      },
    );
    builder.addCase(getTests.pending, (state: ITestReducer) => {
      state.loading = true;
    });
    builder.addCase(getTests.rejected, (state: ITestReducer, action) => {
      state.error = action.payload as string;
    });
  },
});

export default TestSlice.reducer;
