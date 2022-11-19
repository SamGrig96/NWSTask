import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { BASE_URL } from '../../config';


const initialState = {
    error: null,
    isLoading: false,
    categories: [],
};

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        return await axios.get(`${BASE_URL}/categories`);
    },
);

const isError = (action) => {
    return action.type.endsWith('rejected');
};

const catsSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCategories.pending, (state) => {
                state.isLoading = true;
                state.error = null;
                state.categories = [];
            })
            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.categories = action.payload.data;
            })
            .addMatcher(isError, (state) => {
                state.error = "Couldn't get categories";
                state.isLoading = false;
                state.categories = [];
            });
    },
});

export default catsSlice.reducer;