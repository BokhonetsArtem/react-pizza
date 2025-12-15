import { configureStore } from "@reduxjs/toolkit";
import filter from "./slices/filterSlice";
import cart from "./slices/cartSlice";
import pizza from "./slices/pizzasSlice";
import { useSelector, useDispatch, TypedUseSelectorHook } from "react-redux";

export const store = configureStore({
  reducer: { filter, cart, pizza },
});

type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
