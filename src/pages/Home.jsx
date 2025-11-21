import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { setCategoryId } from "../redux/slices/filterSlice";

export default function Home({ searchValue }) {
  const { categoryId, sort, reverseSorting } = useSelector(
    (state) => state.filter
  );
  const dispatch = useDispatch();

  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  const { pathname } = useLocation();

  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://69185af821a96359486fc82f.mockapi.io/pizzas?page=${currentPage}&limit=4&${
        categoryId > 0 ? `category=${categoryId}` : ""
      }&sortBy=${sort.sortProperty}&order=${
        reverseSorting ? "asc" : "desc"
      }${search}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
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
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
