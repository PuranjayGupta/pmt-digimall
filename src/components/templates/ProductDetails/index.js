import React from "react";
import { Descriptions, Row, Col } from "antd";
import { Modal, Button, InputNumber } from "antd";
import DigiMallContext from "../../App";
import BackButton from "../../atoms/BackButton";

const ProductDetails = (props) => {
  const { globalData, dispatch } = React.useContext(DigiMallContext);
  const [isModalVisible, setIsModalVisible] = React.useState(false);
  const [localStorageState] = React.useState(
    JSON.parse(localStorage.getItem("globalData"))
  );

  const product = localStorageState.apiData[props.location.state.product];
  let productQuantity,
    originalValue =
      localStorageState.cartData[props.location.state.product] || 0;

  React.useEffect(() => {
    props.changeCount(
      "set",
      Object.values(localStorageState.cartData).reduce((a, b) => a + b, 0)
    );
  }, []);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    if (productQuantity > originalValue) {
      props.changeCount("add", productQuantity - originalValue);
      originalValue = productQuantity;
    } else if (productQuantity < originalValue) {
      props.changeCount("sub", originalValue - productQuantity);
      originalValue = productQuantity;
    } else {
      setIsModalVisible(false);
      return;
    }
    console.log(originalValue);
    let obj = {};
    obj[props.location.state.product] = productQuantity;

    dispatch({
      type: "change",
      product: obj,
    });
    localStorage.setItem("globalData", JSON.stringify(globalData));

    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const onChange = (value) => {
    productQuantity = value;
  };

  return (
    <>
      <Row gutter={[0, 16]}>
        <Col offset={1}>
          <BackButton />
        </Col>
        <Col offset={2}>
          <h2>{product.name + " (" + product.company + ") Details"}</h2>
        </Col>
      </Row>
      <Row gutter={[0, 16]}>
        <Col span={16} offset={4}>
          <Descriptions column={1} bordered={true} size="middle">
            <Descriptions.Item label="Product Name">
              {product.name}
            </Descriptions.Item>
            <Descriptions.Item label="Comapny Name">
              {product.company}
            </Descriptions.Item>
            <Descriptions.Item label="Product Category">
              {product.category}
            </Descriptions.Item>
            <Descriptions.Item label="Price">
              {"₹ " + product.price}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
      <br />
      <br />
      <br />
      <Row>
        <Col offset={11}>
          <Button type="primary" onClick={showModal}>
            Add to Cart
          </Button>
        </Col>
        <Modal
          title="Select Product Quantity"
          visible={isModalVisible}
          onOk={handleOk}
          onCancel={handleCancel}
        >
          <Row>
            <Col offet={15}>
              <InputNumber
                min={1}
                max={10}
                onChange={onChange}
                defaultValue={
                  localStorageState.cartData[props.location.state.product]
                }
              />
            </Col>
          </Row>
        </Modal>
      </Row>
    </>
  );
};

export default ProductDetails;
