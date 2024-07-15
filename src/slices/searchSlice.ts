import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";

import { baseApiUrlSearch, apiKey } from "../constants";
import { ApiResponse, Media } from "../types";

interface FetchSearchParams {
  query: string;
  filter: string;
}

interface ErrorDetails {
  message: string;
  status?: number;
}

interface SearchState {
  searchResults: Media[];
  loading: boolean;
  error: ErrorDetails | null;
}

const initialState: SearchState = {
  searchResults: [],
  loading: false,
  error: null,
};

export const fetchSearchResults = createAsyncThunk<
  Media[],
  FetchSearchParams,
  { rejectValue: ErrorDetails }
>(
  "search/fetchSearchResults",
  async ({ query, filter }, { rejectWithValue }) => {
    try {
      const url = `${baseApiUrlSearch}${filter === "all" ? "multi" : filter}`;
      const response = await axios.get<ApiResponse<Media>>(url, {
        params: {
          query,
          api_key: apiKey,
        },
      });
      return response.data.results;
    } catch (error) {
      if (error instanceof AxiosError) {
        return rejectWithValue({
          message: error.message,
          status: error.response?.status,
        });
      }
      return rejectWithValue({
        message: "Something went wrong",
      });
    }
  }
);

const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder
        .addCase(fetchSearchResults.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchSearchResults.fulfilled, (state, action: PayloadAction<Media[]>) => {
          state.searchResults = action.payload;
          state.loading = false;
        })
        .addCase(fetchSearchResults.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload as ErrorDetails;
        });
    },
  });

export const selectSearchResults = (state: { search: SearchState }) => state.search.searchResults;

export default searchSlice.reducer;
export type { SearchState };
