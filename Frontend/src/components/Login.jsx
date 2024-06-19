/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Form, Input, Button, Image, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [btnLoading, setBtnLoading] = useState(false);
  const onFinish = async (values) => {
    setBtnLoading(true);
    try {
      const response = await axios.post(
        "https://url-shortner-ezi0.onrender.com/api/login/login/user",
        values
      );
      console.log(response);
      message.success(response.data.message);
      localStorage.setItem("userToken", response.data.authToken);
      navigate("/home");
      setBtnLoading(false);
    } catch (err) {
      console.log(err);
      message.error(err.response.data.message);
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
              <Link className="text-decoration-none" to={"/register"}>
                SignUP
              </Link>
            </p>
            <div>
              <p>
                <Link className="text-decoration-none" to={"/forgot-password"}>
                  Forgot Password ?
                </Link>
              </p>
            </div>

            <Button type="primary" htmlType="submit" loading={btnLoading}>
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Login;
