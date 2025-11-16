import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Cart from "./pages/Cart";

import { Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import "./scss/app.scss";

function App() {
  const [pizzas, setPizzas] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://69185af821a96359486fc82f.mockapi.io/pizzas")
      .then((res) => res.json())
      .then((json) => {
        setPizzas(json);
        setIsLoading(false);
      })
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
          <Routes>
            <Route
              path="/"
              element={<Home isLoading={isLoading} pizzas={pizzas} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
