import Login from "./components/Login";
import Products from "./components/Products";
import Register from "./components/Register";
import Home from "./components/Home";

var routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/login",
    component: Login,
  },
  {
    path: "/register",
    component: Register,
  },
  {
    path: "/products",
    component: Products,
  },
];
export default routes;
