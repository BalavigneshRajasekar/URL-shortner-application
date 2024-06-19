/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, message, Spin } from "antd";
import { LinkOutlined } from "@ant-design/icons";
import axios from "axios";
import Home from "./Home";

function UrlShortner() {
  const [btnLoading, setBtnLoading] = useState(false);
  const [shortUrl, setShortUrl] = useState(null);
  const [count, setCount] = useState(0);
  const onFinish = async (value) => {
    setBtnLoading(true);
    try {
      const response = await axios.post(
        "https://url-shortner-ezi0.onrender.com/url/generate/url",
        value,
        {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        }
      );
      message.success(response.data.message);
      setShortUrl(response.data.url);
      setBtnLoading(false);
    } catch (err) {
      console.log(err);
      console.log(localStorage.getItem("userToken"));
      message.error(err.response.data.err.message);
      setBtnLoading(false);
    }
  };
  const onFinishFailed = (err) => {
    console.log("Failed:", err);
  };
  const handleClicked = () => {
    setCount(count + 1);
  };
  return (
    <div>
      <div>
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
            name="url"
            rules={[
              {
                required: true,
                message: "Please input Proper URL!",
                type: "url",
              },
            ]}
          >
            <Input
              placeholder="Paste URL"
              prefix={<LinkOutlined />}
              style={{ height: 50 }}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" loading={btnLoading} htmlType="submit">
              Generate Short URL
            </Button>
          </Form.Item>
        </Form>
      </div>
      <div>
        {shortUrl === null ? (
          "Generate link come here"
        ) : (
          <a
            style={{
              textDecoration: "none",
              backgroundColor: "green",
              color: "black",
              cursor: "text",
            }}
            className="shadow-md rounded-2 p-2"
            href={shortUrl}
            onClick={handleClicked}
            target="_blank"
          >
            LINK : {shortUrl}
          </a>
        )}
        <h6 className="text-end">count :{count}</h6>
        {btnLoading && <Spin className="ms-3"></Spin>}
      </div>
    </div>
  );
}

export default UrlShortner;
