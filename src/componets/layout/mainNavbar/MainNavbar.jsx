import React from "react";
import { Col, Layout, Menu, Row, Button, Typography } from "antd";
import "./mainNavbar.css";
import { getAuth } from "firebase/auth";
import { IoIosArrowForward } from "react-icons/io";
import { AiOutlineForm } from "react-icons/ai";
import { FiHome } from "react-icons/fi";
import { UserOutlined } from "@ant-design/icons";
const { Sider } = Layout;
const { SubMenu } = Menu;
const auth = getAuth();
const { Text } = Typography;
export const MainNavbar = (props) => {
  return (
    <Sider className="main-layout-siderNav" width={"auto"}>
      <div
        style={{
          margin: 0,
          padding: 0,
          display: "flex",
          alignItems: "center",
        }}
      >
        {" "}
        <Button
          type="link"
          size="middle"
          className="navbar-min-btn"
          onClick={() => {
            console.log(props.navMin);
            props.setNavMin(!props.navMin);
          }}
        >
          <div className="btn-heigth">
            <hr className="top-line" />
            <hr className="mid-line" />
            <hr className="bot-line" />
          </div>
        </Button>
        {props.navMin ? <br /> : <Text>Navigation</Text>}
      </div>
      <Menu
        mode="inline"
        activeKey={props.navValue}
        className={
          props.navMin == true
            ? "main-layout-navbar-menu-min"
            : "main-layout-navbar-menu"
        }
      >
        <Menu.Item
          style={{ padding: "0 0px 0 15px" }}
          key="1"
          onClick={() => {
            props.setNavValue("1");
          }}
        >
          <Row justify="space-between">
            <Col span={4}>
              <FiHome />
            </Col>
            <Col
              span={15}
              className={props.navMin ? "navbar-menu-name-display" : ""}
            >
              Dashboard
            </Col>
            <Col span={4}>
              {props.navValue == "1" ? (
                <IoIosArrowForward className="visible" />
              ) : (
                <IoIosArrowForward className="no-visible" />
              )}
            </Col>
          </Row>
        </Menu.Item>

        <Menu.Item
          key="2"
          onClick={() => {
            props.setNavValue("2");
          }}
          style={{ padding: "0 0px 0 15px" }}
        >
          <Row justify="space-between">
            <Col span={4}>
              <AiOutlineForm />
            </Col>
            <Col
              span={15}
              className={props.navMin ? "navbar-menu-name-display" : ""}
            >
              First Article
            </Col>
            <Col span={4}>
              {props.navValue == "2" ? (
                <IoIosArrowForward className="visible" />
              ) : (
                <IoIosArrowForward className="no-visible" />
              )}
            </Col>
          </Row>
        </Menu.Item>
        <Menu.Item
          style={{ padding: "0 0px 0 15px" }}
          key="3"
          onClick={() => {
            props.setNavValue("3");
          }}
        >
          <Row justify="space-between">
            <Col span={4}>
              <UserOutlined />
            </Col>
            <Col
              span={15}
              className={props.navMin ? "navbar-menu-name-display" : ""}
            >
              {auth.currentUser.displayName}
            </Col>
            <Col span={4}>
              {props.navValue == "3" ? (
                <IoIosArrowForward className="visible" />
              ) : (
                <IoIosArrowForward className="no-visible" />
              )}
            </Col>
          </Row>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
