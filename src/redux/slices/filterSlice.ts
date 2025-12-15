import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Sort = {
  name: string;
  sortProperty: "rating" | "price" | "title";
};

export interface filterSliceState {
  currentPage: number;
  categoryId: number;
  searchValue: string;
  sort: Sort;
  reverseSorting?: boolean;
}

const initialState: filterSliceState = {
  searchValue: "",
  categoryId: 0,
  currentPage: 1,
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
    setCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
    },
    setSearchValue(state, action: PayloadAction<string>) {
      state.searchValue = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setReverseSorting(state, action: PayloadAction<boolean>) {
      state.reverseSorting = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setFilters(state, action: PayloadAction<filterSliceState>) {
      state.currentPage = Number(action.payload.currentPage);
      state.sort = action.payload.sort;
      state.categoryId = Number(action.payload.categoryId);
    },
  },
});

export const {
  setCategoryId,
  setSort,
  setReverseSorting,
  setCurrentPage,
  setFilters,
  setSearchValue,
} = filterSlice.actions;

export default filterSlice.reducer;
