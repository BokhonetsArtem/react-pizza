import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";
import Pagination from "../components/Pagination";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home({ searchValue }) {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sortObj, setSortObj] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [reverseSorting, setReverseSorting] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const { pathname } = useLocation();

  const search = searchValue ? `&search=${searchValue}` : "";

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://69185af821a96359486fc82f.mockapi.io/pizzas?page=${currentPage}&limit=4${
        categoryIndex > 0 ? `category=${categoryIndex}` : ""
      }&sortBy=${sortObj.sortProperty}&order=${
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
  }, [categoryIndex, sortObj, reverseSorting, searchValue, currentPage]);

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
          categoryIndex={categoryIndex}
          setCategoryIndex={setCategoryIndex}
        />
        <Sort
          sortObj={sortObj}
          setSortObj={setSortObj}
          reverseSorting={reverseSorting}
          setReverseSorting={setReverseSorting}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : cards}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </div>
  );
}
