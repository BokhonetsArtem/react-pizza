import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import qs from "qs";
import { useSelector, useDispatch } from "react-redux";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import { sortList } from "../components/Sort";

export default function Home({ searchValue }) {
  const { categoryId, currentPage, sort, reverseSorting } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { pathname } = useLocation();

  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    setIsLoading(true);

    axios
      .get(
        `https://69185af821a96359486fc82f.mockapi.io/pizzas?page=${currentPage}&limit=4&${
          categoryId > 0 ? `category=${categoryId}` : ""
        }&sortBy=${sort.sortProperty}&order=${
          reverseSorting ? "asc" : "desc"
        }${search}`
      )
      .then((response) => {
        setPizzas(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setPizzas([]);
        } else {
          console.log(err);
        }
      });
  }, [categoryId, sort, reverseSorting, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const sort = sortList.find(
        (obj) => obj.sortProperty === params.sortProperty
      );

      dispatch(setFilters({ ...params, sort }));
    }
  }, []);

  useEffect(() => {
    const queryString = qs.stringify({
      sortProperty: sort.sortProperty,
      categoryId,
      currentPage,
    });

    navigate(`?${queryString}`);
  }, [categoryId, sort, reverseSorting, searchValue, currentPage]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const cards = pizzas
    .filter((pizza) =>
      pizza.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((pizza) => {
      return <PizzaBlock key={pizza.id} title={pizza.name} {...pizza} />;
    });

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={(id) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : cards}</div>
      <Pagination onChangePage={onChangePage} />
    </div>
  );
}
