import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type PostInput = {
  status: string;
  mediaURLs: string[];
  mediaFiles: (File | Blob | MediaSource)[];
};

const initialState = {
  status: "",
  mediaURLs: [],
  mediaFiles: [],
} as PostInput;

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setStatus(state, action: PayloadAction<string>) {
      state.status = action.payload;
    },
    setMediaURLs(state, action: PayloadAction<string[]>) {
      state.mediaURLs = action.payload;
    },
    setMediaFiles(state, action: PayloadAction<(File | Blob | MediaSource)[]>) {
      state.mediaFiles = action.payload;
    },
  },
});

export const { setMediaURLs, setStatus, setMediaFiles } = postSlice.actions;
export default postSlice.reducer;
