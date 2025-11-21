import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  categoryId: 0,
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
  reverseSorting: false,
};

export const filterSlice = createSlice({
  name: "filters",
  initialState,
  reducers: {
    setCategoryId(state, action) {
      state.categoryId = action.payload;
    },
    setSort(state, action) {
      state.sort = action.payload;
    },
    setReverseSorting(state, action) {
      state.reverseSorting = action.payload;
    },
  },
});

export const { setCategoryId, setSort, setReverseSorting } =
  filterSlice.actions;

export default filterSlice.reducer;
