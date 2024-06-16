/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Layout, Menu, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { MailOutlined, LockOutlined, UserOutlined } from "@ant-design/icons";

const { Header, Content } = Layout;
function Landing() {
  const navigate = useNavigate();
  const nav = ["SignIN", "SignUP"];
  const items = nav.map((value, index) => ({
    key: index + 1,
    label: value,
    icon: index == 0 ? <LockOutlined /> : <UserOutlined />,
    onClick: () => {
      if (index == 0) {
        navigate("/login");
      } else {
        navigate("/register");
      }
    },
  }));
  return (
    <div>
      <Layout>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo">
            <Image width={50} src="./url.png"></Image>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["2"]}
            style={{ flex: 1, minWidth: 0, justifyContent: "end" }}
            items={items}
          />
        </Header>
        <Content style={{ padding: "0 48px" }}>
          <div className="text-center">
            <h1 className="text-primary">Welcome To</h1>
            <h3>URL shortener</h3>
            <div className="mt-5">
              <Image width={300} src="./url.png"></Image>
            </div>
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Landing;
