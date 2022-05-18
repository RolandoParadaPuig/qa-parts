import React, { useState } from "react";
import Logo from "../../assets/turboChefLogo.png";
import { Button, Checkbox, Col, Form, Image, Input, message, Row } from "antd";
import "./login.css";
import firebaseApp from "../../../credentials";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  getFirestore,
  getDocs,
  collection,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
const db = getFirestore();
const auth = getAuth();

export const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const logIn = async (e) => {
    setLoading(true);
    const UserRef = collection(db, "Users");
    const q = query(UserRef, where("userName", "==", `${e.username}`));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.docs[0] != undefined) {
      const _path = querySnapshot.docs[0]._document.data.value.mapValue.fields;
      const name = _path.name.stringValue;
      const email = _path.email.stringValue;
      const password = e.password;
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          message.success(`${name} logged in`);
          setLoading(false);
          navigate("/");
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          message.error("username or Password incorrect");
          setLoading(false);
        });
    } else {
      message.error("username or Password incorrect");
      setLoading(false);
    }
  };
  const onReset = () => {
    form.resetFields();
  };
  const onLogInFailed = async () => {
    message.error("username or Password incorrect");
  };

  return (
    <Row className="login-form" justify="center">
      <Col xl={5} lg={7} md={10} sm={14} xs={22} className="login-form-col">
        <Row justify="center">
          <Col span={10} className="login-img">
            <Image width={"100%"} src={Logo} preview={false} />
          </Col>
        </Row>
        <Form
          form={form}
          name="LoginForm"
          onFinish={logIn}
          onFinishFailed={onLogInFailed}
          autoComplete="on"
        >
          <Row justify="center">
            <Col span={18}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your username!" },
                ]}
              >
                <Input placeholder="Username" />
              </Form.Item>

              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                    min: 6,
                  },
                ]}
              >
                <Input.Password placeholder="Password" />
              </Form.Item>

              <Form.Item name="connected" valuePropName="connected">
                <Checkbox>Stay Logged in</Checkbox>
              </Form.Item>
              <Form.Item>
                <Button
                  loading={loading}
                  size="middle"
                  block
                  type="primary"
                  htmlType="submit"
                >
                  {loading ? "" : "Sign in"}
                </Button>
                <Button block type="link" onClick={onReset}>
                  Reset
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
        <Row justify="center">
          <Col span={18}>
            Forgot Password?
            <Button
              onClick={() => {
                message.info("pasword");
              }}
              type="link"
            >
              Reset Password
            </Button>
          </Col>
        </Row>
        <Row justify="center"></Row>
      </Col>
    </Row>
  );
};
