import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../config';


const initialState = {
    error: null,
    isLoading: false,
    cats: [],
};


export const getCats = createAsyncThunk(
    'cats/getCats',
    async ({ limit = 10, page = 1, id = null }) => {
        return await axios.get(`${BASE_URL}/images/search?limit=10&page=1&category_ids=1`, { params: { _limit: limit, _page: page, albumId: id } });
    },
);

const isError = (action) => {
    return action.type.endsWith('rejected');
};

const catsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCats.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.cats = [];
            })
            .addCase(getCats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.cats = action.payload.data;
            })
            .addMatcher(isError, (state) => {
                state.error = "Couldn't get cats";
                state.isLoading = false;
                state.cats = [];
            });
    },
});

export default catsSlice.reducer;