import { Switch, Route } from "react-router-dom";
import HomePage from "../components/HomePage/HomePage";

const AppRoutes = (props) => {
  return (
    <>
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login">Login</Route>

        <Route path="/register">Register</Route>

        <Route path="*">404 not found!</Route>
      </Switch>
    </>
  );
};

export default AppRoutes;
