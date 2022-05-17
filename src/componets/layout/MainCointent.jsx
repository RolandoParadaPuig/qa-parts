import { Col, Row } from "antd";
import React, { Fragment } from "react";
import { Dashboard } from "../dashboard/Dashboard";
import { FirstArticle } from "../firstArticle/FirstArticle";

export const MainCointent = (props) => {
  return (
    <Fragment>
      {props.navValue == "1" ? (
        <Dashboard />
      ) : props.navValue == "2" ? (
        <FirstArticle />
      ) : (
        "Option 3"
      )}
    </Fragment>
  );
};
