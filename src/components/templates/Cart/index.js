import React, { useContext, useState } from "react";
import DigiMallContext from "../../App";
import { List, InputNumber, Button, Row, Col } from "antd";
import { NavLink } from "react-router-dom";
import { DeleteTwoTone } from "@ant-design/icons";

const Cart = (props) => {
  const { globalData, dispatch } = useContext(DigiMallContext);
  const [localStorageState, setLocalStorageState] = useState(
    JSON.parse(localStorage.getItem("globalData"))
  );

  let productKey,
    productPriceObj = {};

  const cartList = () => {
    let listKeys = Object.keys(localStorageState.cartData);
    return listKeys.map((key) => {
      return localStorageState.apiData[key];
    });
  };

  const [listData, setListData] = React.useState(cartList());
  const [productPrice, setProductPrice] = useState({});

  const calSum = () => {
    let sum = 0;
    for (const [key, value] of Object.entries(productPrice)) {
      sum = sum + value / localStorageState.apiData[key].price;
    }
    return sum;
  };

  React.useEffect(() => {
    props.changeCount("set", calSum());
    listData.map((item) => {
      productKey = Object.keys(localStorageState.apiData).find(
        (key) => localStorageState.apiData[key] === item
      );

      productPriceObj[productKey] =
        item.price * localStorageState.cartData[productKey];
    });
    setProductPrice(productPriceObj);
  }, [globalData]);

  const onChange = (value, oldValue, productKey) => {
    if (value > oldValue) {
      props.changeCount("add", value - oldValue);
    } else if (value < oldValue) {
      props.changeCount("sub", oldValue - value);
    }

    let obj = {};
    obj[productKey] = value;
    dispatch({
      type: "change",
      product: obj,
    });

    localStorage.setItem("globalData", JSON.stringify(globalData));

    Object.assign(productPriceObj, productPrice);

    if (value === 0) {
      let arr = listData;
      const index = arr.indexOf(localStorageState.apiData[productKey]);
      if (index > -1) {
        arr.splice(index, 1);
      }
      setListData(arr);
      delete productPriceObj[productKey];
      setProductPrice(productPriceObj);
      return;
    }
    productPriceObj[productKey] =
      localStorageState.apiData[productKey].price * value;
    setProductPrice(productPriceObj);
  };

  return (
    <>
      {listData.length > 0 ? null : (
        <Row>
          <Col offset={11}>
            <h1> Your cart is empty</h1>
          </Col>
        </Row>
      )}
      <List
        itemLayout="horizontal"
        dataSource={listData}
        renderItem={(item) => {
          console.log("iiii");

          let productID = Object.keys(localStorageState.apiData).find(
            (key) => localStorageState.apiData[key] === item
          );

          return (
            <List.Item
              actions={[
                <Row align="left">
                  <Col>
                    <Button
                      //style={{ width: "100%" }}
                      icon={<DeleteTwoTone />}
                      onClick={(value) => onChange(0, productID)}
                    />
                  </Col>
                </Row>,
                <Row align="left">
                  <Col>
                    <InputNumber
                      //style={{ width: "100%" }}
                      min={1}
                      max={10}
                      defaultValue={localStorageState.cartData[productID]}
                      onChange={(value) =>
                        onChange(
                          value,
                          localStorageState.cartData[productID],
                          productID
                        )
                      }
                    />
                  </Col>
                </Row>,
                <Row align="left">
                  <Col>
                    <b>{"₹ " + productPrice[productID]}</b>{" "}
                  </Col>
                </Row>,
              ]}
            >
              <List.Item.Meta
                title={
                  <NavLink
                    to={{
                      pathname: "/product-details",
                      state: {
                        product: Object.keys(localStorageState.apiData).find(
                          (key) => localStorageState.apiData[key] === item
                        ),
                      },
                    }}
                  >
                    {item.name}
                  </NavLink>
                }
                description={
                  "Company: " +
                  item.company +
                  ", " +
                  "Category: " +
                  item.category +
                  ", " +
                  "Price: ₹ " +
                  item.price
                }
              />
            </List.Item>
          );
        }}
      />
      <br />
      <br />
      <Row>
        <Col offset={16}>
          <b>Total Number of Products: </b>
        </Col>
        <Col offset={1}>{calSum()}</Col>
      </Row>
      <Row>
        <Col offset={16}>
          <b>Total Price: </b>{" "}
        </Col>
        <Col offset={3}>
          {"₹ " + Object.values(productPrice).reduce((a, b) => a + b, 0)}
        </Col>
      </Row>
    </>
  );
};

export default Cart;
