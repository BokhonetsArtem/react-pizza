import Categories from "./components/Categories";
import Header from "./components/Header";
import Sort from "./components/Sort";
import PizzaBlock from "./components/PizzaBlock/PizzaBlock";

import { useState, useEffect } from "react";

import "./scss/app.scss";

function App() {
  const [pizzas, setPizzas] = useState([]);

  useEffect(() => {
    fetch("https://69185af821a96359486fc82f.mockapi.io/pizzas")
      .then((res) => res.json())
      .then((json) => setPizzas(json))
      .catch((err) => {
        console.log(err);
        alert("Произошла ошибка при получении пицц");
      });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {pizzas.map((pizza) => {
              return (
                <PizzaBlock key={pizza.id} title={pizza.name} {...pizza} />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
