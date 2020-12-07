import React from "react";
import { NavLink } from "react-router-dom";
import { Layout, Menu, Row, Col, Badge } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import DigiMallContext from "../../App";

const { Header } = Layout;

const MainHeader = (props) => {
  console.log("hhhhh");
  console.log(props);

  return (
    <Layout>
      <Header style={{ position: "fixed", width: "100%" }}>
        <Row>
          <Col>
            <NavLink to="/" style={{ fontSize: "25px", color: "white" }}>
              DigiMall
            </NavLink>
          </Col>
          <Col offset={20}>
            <NavLink to="/cart">
              <Badge count={props.count}>
                <ShoppingCartOutlined
                  style={{ fontSize: "25px", color: "white" }}
                />
              </Badge>
            </NavLink>
          </Col>
        </Row>
      </Header>
    </Layout>
  );
};

export default MainHeader;
