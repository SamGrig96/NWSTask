import { combineReducers, configureStore } from '@reduxjs/toolkit';

import catsReducer from './cats/CatsReducer';
import categoriesReducer from './categories/CategoriesReducer.js';

const rootReducer = combineReducers({
    cats: catsReducer,
    categories: categoriesReducer,
});

export const store = configureStore({
    reducer: rootReducer,

    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});