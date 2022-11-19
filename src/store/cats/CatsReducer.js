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

const catsSlice = createSlice({
    name: 'cats',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCats.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.cats = action.payload.data;
            })

    },
});

export default catsSlice.reducer;