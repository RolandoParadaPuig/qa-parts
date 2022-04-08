import { Col, Row } from "antd";
import React, { Fragment } from "react";
import { Dashboard } from "../dashboard/Dashboard";

export const MainCointent = (props) => {
  return (
    <Fragment>
      {props.navValue == "1" ? (
        <Dashboard />
      ) : props.navValue == "2" ? (
        "Option 2"
      ) : (
        "Option 3"
      )}
    </Fragment>
  );
};
