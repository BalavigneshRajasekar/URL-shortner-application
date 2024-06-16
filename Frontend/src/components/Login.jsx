/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React from "react";
import { Form, Input, Button, Checkbox, Image } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

function Login() {
  const onFinish = (values) => {
    console.log(values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className=" vh-100">
      <div>
        <Image></Image>
      </div>
      <div className="bg-light ">
        <h5 className="border-bottom pb-3 border-success">SignIN</h5>
        <Form
          style={{ marginTop: 40 }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
                type: "email",
              },
            ]}
          >
            <Input placeholder="email" prefix={<MailOutlined></MailOutlined>} />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
                min: "",
              },
            ]}
          >
            <Input.Password
              placeholder="password"
              prefix={<LockOutlined></LockOutlined>}
            />
          </Form.Item>

          <Form.Item>
            <p>
              Don't have an account ?{" "}
              <Link className="link-style-none" to={"/register"}>
                SignUP
              </Link>
            </p>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
