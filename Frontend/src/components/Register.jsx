/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Form, Input, Button, Checkbox, Image, message } from "antd";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const onFinish = async (values) => {
    try {
      setBtnLoading(true);

      const response = await axios.post(
        "http://localhost:3000/api/register/register/user",
        values
      );

      message.success(response.data.message);
      setBtnLoading(false);
      navigate("/login");
    } catch (err) {
      console.log(err);
      message.error(err.response.data.msg);
      setBtnLoading(false);
    }
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
        <h5 className="border-bottom pb-3 border-success">SignUP</h5>
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
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your username!",
                type: "text",
              },
            ]}
          >
            <Input
              placeholder="Username"
              prefix={<UserOutlined></UserOutlined>}
            />
          </Form.Item>

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

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <p>
            already have an acount ?{" "}
            <Link className="link-style-none" to={"/login"}>
              SignIN
            </Link>
          </p>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit" loading={btnLoading}>
              Register
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Register;
