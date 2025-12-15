import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Sort } from "./filterSlice";

export type SearchPizzaParams = {
  currentPage: number;
  categoryId: number;
  searchValue: string;
  sort: Sort;
  reverseSorting?: boolean;
};

export const fetchPizzas = createAsyncThunk(
  "pizza/fetchPizzasStatus",
  async (params: SearchPizzaParams) => {
    const { currentPage, categoryId, sort, reverseSorting, searchValue } =
      params;
    const res = await axios.get<Pizza[]>(
      `https://69185af821a96359486fc82f.mockapi.io/pizzas?page=${currentPage}&limit=4&${
        Number(categoryId) > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sort.sortProperty}&order=${
        reverseSorting ? "asc" : "desc"
      }${searchValue}`
    );
    return res.data as Pizza[];
  }
);

type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  sizes: number[];
  types: number[];
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

interface pizzaSliceState {
  items: Pizza[];
  status: Status;
}

const initialState: pizzaSliceState = {
  items: [],
  status: Status.LOADING,
};

export const pizzasSlice = createSlice({
  name: "pizza",
  initialState,
  reducers: {
    setItems(state, action) {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPizzas.pending, (state) => {
        state.status = Status.LOADING;
        state.items = [];
      })
      .addCase(fetchPizzas.fulfilled, (state, action) => {
        state.status = Status.SUCCESS;
        state.items = action.payload;
      })
      .addCase(fetchPizzas.rejected, (state) => {
        state.status = Status.ERROR;
        state.items = [];
      });
  },
});

export const { setItems } = pizzasSlice.actions;

export default pizzasSlice.reducer;
