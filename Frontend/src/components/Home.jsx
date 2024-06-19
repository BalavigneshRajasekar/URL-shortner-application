/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Layout, Menu, Image, Popconfirm, Button } from "antd";
import { useNavigate } from "react-router-dom";
// import { LinkOutlined, SettingOutlined } from "@ant-design/icons";

import UrlShortner from "./UrlShortner";
import Dashboard from "./Dashboard";

const { Header, Content } = Layout;
function Home() {
  const navigate = useNavigate();
  const [urlShortener, setUrlShortener] = useState(true);
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  //Checking user has token r not
  useEffect(() => {
    if (!userToken) {
      navigate("/");
    } else {
      navigate("/home");
    }
    console.log(userToken);
  }, [userToken]);

  const confirm = (e) => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("resetToken");
    navigate("/");
  };
  return (
    <div>
      <Layout style={{ height: "100vh" }}>
        <Header style={{ display: "flex", alignItems: "center" }}>
          <div className="demo-logo">
            <Image width={50} src="./url.png"></Image>
          </div>
          <Menu
            theme="dark"
            mode="horizontal"
            defaultSelectedKeys={["1"]}
            style={{ flex: 1, minWidth: 0, justifyContent: "end" }}
          >
            <Menu.Item key="1" onClick={() => setUrlShortener(true)}>
              UrlShortener
            </Menu.Item>
            <Menu.Item key="2" onClick={() => setUrlShortener(false)}>
              Dashboard
            </Menu.Item>
            <Menu.Item key="3">
              <Popconfirm
                title="Logout"
                description="Are you sure to want to Logout?"
                onConfirm={confirm}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" danger>
                  Logout
                </Button>
              </Popconfirm>
            </Menu.Item>
          </Menu>
        </Header>
        <Content style={{ padding: "0 48px" }}>
          {urlShortener ? <UrlShortner></UrlShortner> : <Dashboard />}
        </Content>
      </Layout>
    </div>
  );
}

export default Home;
