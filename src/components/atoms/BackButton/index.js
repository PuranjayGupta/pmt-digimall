import React from "react";
import { Button } from "antd";
import history from "../../history";
import { ArrowLeftOutlined } from "@ant-design/icons";

const BackButton = (props) => {
  const handleClick = () => {
    const { onBack } = props;
    history.goBack();
    if (onBack) onBack();
  };

  return <Button icon={<ArrowLeftOutlined />} onClick={handleClick} />;
};

export default BackButton;
