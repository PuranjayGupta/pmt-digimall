import React from "react";
import MainHeader from "./Header";
import { Layout } from "antd";
import Router from "./Router";
import "./index.css";

const MainLayout = () => {
  const [count, setCount] = React.useState(0);

  const changeCount = (type, number) => {
    if (type === "add") {
      setCount(count + number);
    } else if (type === "sub") {
      setCount(count - number);
    } else if (type === "set") {
      setCount(number);
    }
  };
  return (
    <Layout className="site-layout">
      <MainHeader count={count} />
      <Router changeCount={changeCount} />
    </Layout>
  );
};

export default MainLayout;
