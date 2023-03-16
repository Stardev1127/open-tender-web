import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState = {
  posts: [],
  loading: 'idle',
  error: null,
}

export const fetchPosts = createAsyncThunk(
  'posts/getPosts',
  async (slug, thunkAPI) => {
    try {
      const api = thunkAPI.getState().config.api
      if (!api) return null
      const { data } = await api.getPosts(slug)
      return data
    } catch (err) {
      return thunkAPI.rejectWithValue(err)
    }
  }
)

const postsSlice = createSlice({
  name: 'posts',
  initialState: initialState,
  reducers: {
    resetPosts: () => initialState,
  },
  extraReducers: {
    // fetchPosts
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts = action.payload || []
      state.loading = 'idle'
      state.error = null
    },
    [fetchPosts.pending]: (state) => {
      state.loading = 'pending'
    },
    [fetchPosts.rejected]: (state, action) => {
      state.loading = 'idle'
      state.error = action.payload
    },
  },
})

export const { resetPosts } = postsSlice.actions

export const selectPosts = (state) => {
  const { posts, loading, error } = state.posts
  return { posts, loading, error }
}

export default postsSlice.reducer
