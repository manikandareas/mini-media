import type { RootState } from "../store";

const postSelector = (state: RootState) => state.post;

const postStatusSelector = (state: RootState) => state.post.status;

const postMediaURLsSelector = (state: RootState) => state.post.mediaURLs;

const postMediaFiles = (state: RootState) => state.post.mediaFiles;

postSelector.Status = postStatusSelector;
postSelector.MediaURLs = postMediaURLsSelector;
postSelector.MediaFiles = postMediaFiles;

export default postSelector;
