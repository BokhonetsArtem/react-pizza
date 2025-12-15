import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import qs from "qs";

import {
  setCategoryId,
  setCurrentPage,
  setFilters,
} from "../redux/slices/filterSlice";

import { fetchPizzas } from "../redux/slices/pizzasSlice";

import { useAppDispatch, useAppSelector } from "../redux/store";
import { SearchPizzaParams } from "../redux/slices/pizzasSlice";

const Home = () => {
  const { categoryId, currentPage, sort, reverseSorting, searchValue } =
    useAppSelector((state) => state.filter);
  const { items, status } = useAppSelector((state) => state.pizza);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const getPizzas = async () => {
    dispatch(
      fetchPizzas({
        searchValue: searchValue ? `&search=${searchValue}` : "",
        categoryId,
        reverseSorting,
        sort,
        currentPage,
      })
    );
  };

  useEffect(() => {
    getPizzas();
  }, [categoryId, sort, reverseSorting, searchValue, currentPage]);

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;

      // const sort = sortList.find(
      //   (obj) => obj.sortProperty === params.sortProperty
      // );

      dispatch(setFilters(params));
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

  const cards = items
    .filter((pizza: any) =>
      pizza.name.toLowerCase().includes(searchValue.toLowerCase())
    )
    .map((pizza: any) => {
      return <PizzaBlock key={pizza.id} title={pizza.name} {...pizza} />;
    });

  const skeletons = [...new Array(8)].map((_, index) => (
    <Skeleton key={index} />
  ));

  const onChangePage = (number: number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <div className="container">
      <div className="content__top">
        <Categories
          categoryId={categoryId}
          onChangeCategory={(id: number) => dispatch(setCategoryId(id))}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === "error" ? (
        <div className="content__error-info">
          <h2>Произошла ошибка</h2>
          <p>
            К сожалению, не удалось получить питсы. Попробуйте повторить попытку
            позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeletons : cards}
        </div>
      )}

      <Pagination onChangePage={onChangePage} />
    </div>
  );
};

export default Home;
