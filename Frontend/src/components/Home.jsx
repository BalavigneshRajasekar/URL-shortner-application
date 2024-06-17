/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Layout, Menu, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { LinkOutlined, SettingOutlined } from "@ant-design/icons";
import UrlShortner from "./UrlShortner";
import Dashboard from "./Dashboard";

const { Header, Content } = Layout;
function Home() {
  const navigate = useNavigate();
  const [urlShortener, setUrlShortener] = useState(true);
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"));
  useEffect(() => {
    if (!userToken) {
      navigate("/login");
    }
    console.log(userToken);
  }, [userToken]);

  //For Navigation tab
  const nav = ["UrlShortener", "Dashboard"];
  const items = nav.map((value, index) => ({
    key: index + 1,
    label: value,
    icon: index == 0 ? <LinkOutlined /> : <SettingOutlined />,
    onClick: () => {
      if (index == 0) {
        setUrlShortener(true);
      } else {
        setUrlShortener(false);
      }
    },
  }));

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
            items={items}
          />
        </Header>
        <Content style={{ padding: "0 48px" }}>
          {urlShortener ? <UrlShortner></UrlShortner> : <Dashboard />}
        </Content>
      </Layout>
    </div>
  );
}

export default Home;
