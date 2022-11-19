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



const catsSlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(getCategories.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = null;
                state.categories = action.payload.data;
            })

    },
});

export default catsSlice.reducer;