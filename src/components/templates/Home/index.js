import React from "react";
import { List, Col, InputNumber, Row, Button } from "antd";
import { NavLink } from "react-router-dom";
import { apiMock } from "../../../api";
import DigiMallContext from "../../App";

async function fetchAPI() {
  await new Promise((r) => setTimeout(r, 2000));

  return apiMock();
}

const Home = (props) => {
  const { globalData, dispatch } = React.useContext(DigiMallContext);

  const [listData, setListData] = React.useState([]);
  const [localStorageState, setLocalStorageState] = React.useState(globalData);
  const [cartData, setCartData] = React.useState({});

  React.useEffect(() => {
    fetchAPI()
      .then((data) => {
        let localData = JSON.parse(localStorage.getItem("globalData")) || {};
        localData.apiData = data;
        if (!localData.cartData) {
          localData.cartData = {};
        }

        dispatch({
          type: "fetch",
          product: localData,
        });

        localStorage.setItem("globalData", JSON.stringify(localData));
        //console.log(globalData);
        props.changeCount(
          "set",
          Object.values(localData.cartData).reduce((a, b) => a + b, 0)
        );
        setListData(Object.values(localData.apiData));
        setLocalStorageState(localData);
        setCartData(localData.cartData);
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

  const renderAction = (productKey) => {
    console.log(cartData);
    if (cartData[productKey] >= 0) {
      return (
        <InputNumber
          min={0}
          max={10}
          defaultValue={cartData[productKey]}
          onChange={(value) => onChange(value, productKey)}
        />
      );
    } else {
      return (
        <Button
          // disabled={cartData[productKey]}
          onClick={() => onChange(1, productKey)}
        >
          Add to Cart
        </Button>
      );
    }
  };

  const onChange = (value, productKey) => {
    let obj = {};
    obj[productKey] = value;
    dispatch({
      type: "change",
      product: obj,
    });

    localStorage.setItem("globalData", JSON.stringify(globalData));
    let cartObj = Object.assign({}, cartData);
    if (value === 0) {
      delete cartObj[productKey];
    } else {
      cartObj[productKey] = value;
    }
    setCartData(cartObj);
  };

  React.useEffect(() => {
    // props.changeCount("set", calSum());
    // console.log(globalData);
    props.changeCount(
      "set",
      Object.values(cartData).reduce((a, b) => a + b, 0)
    );
  }, [cartData]);

  return (
    <>
      <title>Home</title>
      <Col offset={10}>
        <h1>
          <b>Welcome to DigiMall !</b>
        </h1>
      </Col>
      <br />
      <br />
      <List
        itemLayout="horizontal"
        loading={listData.length > 0 ? false : true}
        dataSource={listData}
        renderItem={(item) => {
          let productID = Object.keys(localStorageState.apiData).find(
            (key) => localStorageState.apiData[key] === item
          );
          return (
            <List.Item
              actions={[
                <Row align="left">
                  <Col>
                    {
                      renderAction(productID)
                      // cartData[productID] ? (
                      //   <InputNumber
                      //     min={0}
                      //     max={10}
                      //     defaultValue={cartData[productID]}
                      //     onChange={(value) => onChange(value, productID)}
                      //   />
                      // ) : (
                      //   <Button
                      //     //disabled={cartData[productID]}
                      //     onClick={() => onChange(1, productID)}
                      //   >
                      //     Add to Cart
                      //   </Button>
                      // )
                    }
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
                        product: Object.keys(globalData.apiData).find(
                          (key) => globalData.apiData[key] === item
                        ),
                      },
                    }}
                  >
                    {item.name + " (" + item.company + ")"}
                  </NavLink>
                }
                description={"₹ " + item.price}
              />
            </List.Item>
          );
        }}
      />
    </>
  );
};

export default Home;
