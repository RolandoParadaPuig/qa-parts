import { LoadingOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import "./authLoader.css";

export const AuthLoader = () => (
  <div className="auth-loader">
    <Spin
      indicator={
        <LoadingOutlined
          style={{
            fontSize: "4em",
          }}
        />
      }
    />{" "}
  </div>
);
