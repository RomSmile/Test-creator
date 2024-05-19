import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getTests } from "@/store/testsReducer/testsActions";
import { IInfoResponse } from "@/servises/types";
import { IGetTestsResponse, ITestsReducer } from "@/store/testsReducer/types";

const initialState: ITestsReducer = {
  tests: null,
  lastPage: null,
  loading: false,
  error: "",
};

export const TestsSlice = createSlice({
  name: "AlertStore",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      getTests.fulfilled,
      (
        state: ITestsReducer,
        action: PayloadAction<IGetTestsResponse | IInfoResponse>,
      ) => {
        const { lastPage, items } = action.payload as IGetTestsResponse;

        state.lastPage = lastPage;
        state.tests = items;
        state.loading = false;
      },
    );
    builder.addCase(getTests.pending, (state: ITestsReducer) => {
      state.loading = true;
    });
    builder.addCase(getTests.rejected, (state: ITestsReducer, action) => {
      state.error = action.payload as string;
    });
  },
});

export default TestsSlice.reducer;
