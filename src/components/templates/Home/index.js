import React from "react";
import { List, Col } from "antd";
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

  React.useEffect(() => {
    fetchAPI()
      .then((data) => {
        let localData = JSON.parse(localStorage.getItem("globalData")) || {};
        localData.apiData = data;
        if (!localData.cartData) {
          localData.cartData = {};
        }

        console.log("44444455");
        console.log(localData);
        dispatch({
          type: "fetch",
          product: localData,
        });

        localStorage.setItem("globalData", JSON.stringify(localData));
        console.log(globalData);
        props.changeCount(
          "set",
          Object.values(localData.cartData).reduce((a, b) => a + b, 0)
        );
        setListData(Object.values(localData.apiData));
      })
      .catch((error) => console.log(error));
  }, [dispatch]);

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
          return (
            <List.Item>
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
