import React from "react";
import { Col, Divider, Layout, Menu, PageHeader, Row } from "antd";
import { IoIosArrowForward } from "react-icons/io";
import { FiHome } from "react-icons/fi";
const { Sider } = Layout;
const { SubMenu } = Menu;
export const MainNavbar = (props) => {
  return (
    <Sider className="main-layout-siderNav" width={"auto"}>
      <PageHeader>{props.navMin ? <br /> : "Navigation"}</PageHeader>
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
              span={16}
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
        >
          Option 2
        </Menu.Item>
        <Menu.Item
          key="3"
          onClick={() => {
            props.setNavValue("3");
          }}
        >
          Option 3
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
