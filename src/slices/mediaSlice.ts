import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

import { baseApiUrl, apiKey } from "../constants";
import { Movie, TVShow } from "../types";

export interface MediaState {
  movies: Movie[];
  tvShows: TVShow[];
  loadingMovies: boolean;
  loadingTvShows: boolean;
  errorMovies: boolean;
  errorTvShows: boolean;
  search: string;
}

const initialState: MediaState = {
  movies: [],
  tvShows: [],
  loadingMovies: false,
  loadingTvShows: false,
  errorMovies: false,
  errorTvShows: false,
  search: "",
};

export const fetchMovies: ReturnType<typeof createAsyncThunk<Movie[], void>> =
  createAsyncThunk("media/fetchMovies", async () => {
    const url = `${baseApiUrl}/movie/popular`;
    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data.results as Movie[];
  });

export const fetchTvShows: ReturnType<typeof createAsyncThunk<TVShow[], void>> =
  createAsyncThunk("media/fetchTvShows", async () => {
    const url = `${baseApiUrl}/tv/popular`;
    const response = await axios.get(url, {
      params: {
        api_key: apiKey,
      },
    });
    return response.data.results as TVShow[];
  });

const mediaSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    setSearch(state, action: PayloadAction<string>) {
      state.search = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMovies.pending, (state) => {
        state.loadingMovies = true;
        state.errorMovies = false;
      })
      .addCase(
        fetchMovies.fulfilled,
        (state, action: PayloadAction<Movie[]>) => {
          state.loadingMovies = false;
          state.movies = action.payload;
        }
      )
      .addCase(fetchMovies.rejected, (state) => {
        state.loadingMovies = false;
        state.errorMovies = true;
      })
      .addCase(fetchTvShows.pending, (state) => {
        state.loadingTvShows = true;
        state.errorTvShows = false;
      })
      .addCase(
        fetchTvShows.fulfilled,
        (state, action: PayloadAction<TVShow[]>) => {
          state.loadingTvShows = false;
          state.tvShows = action.payload;
        }
      )
      .addCase(fetchTvShows.rejected, (state) => {
        state.loadingTvShows = false;
        state.errorTvShows = true;
      });
  },
});

export const { setSearch } = mediaSlice.actions;

export default mediaSlice.reducer;
