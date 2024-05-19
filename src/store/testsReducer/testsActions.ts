import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGetTestsResponse } from "@/store/testsReducer/types";
export const getTests = createAsyncThunk<
  IGetTestsResponse,
  { page: number; filter?: string },
  { rejectValue: string }
>("getTests", async (params, { rejectWithValue }) => {
  const { page, filter } = params;
  try {
    const response: { data: IGetTestsResponse } = await axios.get(
      `${process.env.BASE_API_URL}/exercises?${page ? `page=${page}` : ""}${
        filter ? `&filter=${filter}` : ""
      }`,
    );

    return response.data;
  } catch (e) {
    return rejectWithValue(e.response.data.message);
  }
});
