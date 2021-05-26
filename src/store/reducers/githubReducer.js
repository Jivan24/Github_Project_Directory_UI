import { createSlice } from '@reduxjs/toolkit'

const githubSlice = createSlice({
  name: 'github',
  initialState: {
    org: '',
    repo: '',
    repos: {
      loading: false,
      list: [],
    },
    commits: {
      loading: false,
      sha: '',
      list: [],
    }
  },
  reducers: {
    loadingRepos(state) {
      state.repos.list = [];
      state.repos.loading = true;
    },
    addRepos(state, action) {
      state.org = action.payload.org;
      state.repos.list = action.payload.repos;
      state.repos.loading = false;
    },
    repoClicked(state, action) {
      state.repo = action.payload;
      state.commits.list = [];
    },
    loadingCommits(state, action) {
      state.commits.loading = true;
    },
    addCommits(state, action) {
      if (action.payload.repo !== state.repo) {
        state.repo = action.payload.repo;
        state.commits.list = [];
      }
      state.commits.list.push(...action.payload.commits);
    }
  }
})

export const { loadingRepos, addRepos, loadingCommits, addCommits, repoClicked } = githubSlice.actions;

export default githubSlice.reducer;
