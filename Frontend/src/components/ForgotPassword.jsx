/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Form, Input, Button, Image, message } from "antd";
import { MailOutlined, LockOutlined } from "@ant-design/icons";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [code, setCode] = useState(false);
  const navigate = useNavigate();

  const onFinish = async (values) => {
    setBtnLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:3000/api/reset/resetLink",
        values
      );
      message.success(response.data.message);
      setBtnLoading(false);
      setCode(true);
      localStorage.setItem("resetToken", response.data.data);
    } catch (err) {
      setBtnLoading(false);
      message.error(err.response.data.message);
    }
  };
  const onFinishFailed = (err) => {
    console.log(err.message);
  };

  const handleChange = async (e) => {
    let code = e.target.value;
    setBtnLoading(true);
    if (code.length >= 5) {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/reset/password",
          { code: code },
          {
            headers: {
              Authorization: localStorage.getItem("resetToken"),
            },
          }
        );
        message.success(response.data.message);
        setBtnLoading(false);
        navigate("/login");
      } catch (err) {
        setBtnLoading(false);
        message.error(err.response.data.message);
      }
    }
  };
  return (
    <div className="bg-light ">
      <h5 className="border-bottom pb-3 border-success">Forgot password</h5>
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

        {code && (
          <Form.Item
            name="text"
            rules={[
              {
                required: true,
                message: "Please input your verification code!",
              },
            ]}
          >
            <Input
              onChange={handleChange}
              placeholder="verification code"
              prefix={<LockOutlined></LockOutlined>}
            />
          </Form.Item>
        )}

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={btnLoading}>
            Send Verification code
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default ForgotPassword;
