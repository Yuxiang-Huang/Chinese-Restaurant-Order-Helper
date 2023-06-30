import { Routes, Route } from "react-router";
import { Link } from "react-router-dom";
import AddOrderPage from "./components/AddOrderPage";
import OrderListPage from "./components/OrderListPage";

const App = () => {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/AddOrder">AddOrder</Link>
          </li>
          <li>
            <Link to="/OrderList">OrderList</Link>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/AddOrder" element={<AddOrderPage />} />
        <Route path="/OrderList" element={<OrderListPage />} />
      </Routes>
    </>
  );
};

export default App;
