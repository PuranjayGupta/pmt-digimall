import React from "react";
import { Layout } from "antd";
import { Switch, Route, Router } from "react-router-dom";
import MainLayout from "../index";
import Home from "../../templates/Home";
import ProductDetails from "../../templates/ProductDetails";
import Cart from "../../templates/Cart";
import history from "../../history";
import "./index.css";

const { Content } = Layout;

const MainRouter = (props) => {
  const { changeCount } = props;

  return (
    <Layout>
      <Content className="content-layout">
        <div className="div-layout">
          <Switch>
            <Route
              exact
              path="/"
              render={(props) => <Home {...props} changeCount={changeCount} />}
            />
            <Route
              path="/product-details"
              render={(props) => (
                <ProductDetails {...props} changeCount={changeCount} />
              )}
            />
            <Route
              path="/cart"
              render={(props) => <Cart {...props} changeCount={changeCount} />}
            />
          </Switch>
        </div>
      </Content>
    </Layout>
  );
};

export default MainRouter;
