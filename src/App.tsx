import Header from "./components/Header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import "./scss/app.scss";

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ "./pages/Cart"));

function App() {
  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Suspense fallback={<div>Загрузка...</div>}>
                <Cart />
              </Suspense>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
