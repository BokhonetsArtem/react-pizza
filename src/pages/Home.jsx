import Categories from "../components/Categories";
import Sort from "../components/Sort";
import PizzaBlock from "../components/PizzaBlock";
import Skeleton from "../components/PizzaBlock/Skeleton";

import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function Home() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [sortObj, setSortObj] = useState({
    name: "популярности",
    sortProperty: "rating",
  });
  const [reverseSorting, setReverseSorting] = useState(false);

  const { pathname } = useLocation();

  useEffect(() => {
    setIsLoading(true);

    fetch(
      `https://69185af821a96359486fc82f.mockapi.io/pizzas?${
        categoryIndex > 0 ? `category=${categoryIndex}` : ""
      }&sortBy=${sortObj.sortProperty}&order=${reverseSorting ? "asc" : "desc"}`
    )
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [categoryIndex, sortObj, reverseSorting]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
      <div className="content__items">
        {isLoading
          ? [...new Array(8)].map((_, index) => <Skeleton key={index} />)
          : pizzas.map((pizza) => {
              return (
                <PizzaBlock key={pizza.id} title={pizza.name} {...pizza} />
              );
            })}
      </div>
    </div>
  );
}
