import { Col, Row, Layout, Image, Button, Dropdown, Menu } from "antd";
import { getAuth, signOut } from "firebase/auth";
import { FiLogOut } from "react-icons/fi";
import React from "react";
import { useNavigate } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";
const auth = getAuth();
const { Header } = Layout;

export const MainHeader = (props) => {
  const navigate = useNavigate();
  const menu = (
    <Menu className="user-menu">
      <Header className="user-menu-header">
        <Row justify="space-between">
          <Col span={15} className="center-col">
            <UserOutlined style={{ paddingRight: "1em" }} />
            {auth.currentUser?.displayName}
          </Col>
          <Col span={4} className="center-col">
            <Button
              type="link"
              className="logout-btn-header"
              onClick={() => {
                signOut(auth);
                navigate("/login");
              }}
            >
              <FiLogOut />
            </Button>
          </Col>
        </Row>
      </Header>
      <Row justify="center">
        <Menu.Item
          key="0"
          className="user-menu-hover"
          onClick={() => {
            signOut(auth);
            navigate("/login");
          }}
        >
          <Row justify="space-around">
            <Col span={4} className="logout-btn">
              <FiLogOut />
            </Col>
            <Col
              span={18}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Logout
            </Col>
          </Row>
        </Menu.Item>
      </Row>
    </Menu>
  );

  return (
    <Header className="main-layout-Header">
      <Row style={{ height: "100%" }}>
        <Col
          span={1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Button
            type="link"
            className="navbar-min-btn"
            onClick={() => {
              console.log(props.navMin);
              props.setNavMin(!props.navMin);
            }}
          >
            <hr className="top-line" />
            <hr className="mid-line" />
            <hr className="bot-line" />
          </Button>
        </Col>
        <Col
          span={2}
          offset={20}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Dropdown overlay={menu} trigger={["click"]}>
            <Button
              shape="circle"
              style={{ backgroundColor: "#FFF" }}
              type="link"
            >
              <UserOutlined />
            </Button>
          </Dropdown>
        </Col>
      </Row>
    </Header>
  );
};

/*
 */
