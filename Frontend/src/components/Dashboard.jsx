/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Table, message, Segmented } from "antd";
import axios from "axios";
function Dashboard() {
  const [shortUrl, setShortUrl] = useState([]);
  const [filters, setFilters] = useState([]);
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    fetchAPI();
  }, []);
  const fetchAPI = async () => {
    setTableLoading(true);
    try {
      const response = await axios.get("http://localhost:3000/url/getUrl", {
        headers: {
          Authorization: localStorage.getItem("userToken"),
        },
      });
      setTableLoading(false);
      message.success(response.data.message);
      setShortUrl(response.data.url);
    } catch (error) {
      console.log(error);
      message.success(error.response.data.message);
    }
  };

  const segments = (values) => {
    console.log(values);
    if (values == "All") {
      setShortUrl([
        shortUrl.filter((value) => {
          console.log(value.date == Date.now());
        }),
      ]);
    }
  };
  const dataSource =
    shortUrl.length > 0 &&
    shortUrl.map((value, index) => {
      return {
        key: index,
        Sno: index + 1,
        ShortUrl: `http://localhost:3000/url/getShortUrl/${value.shortUrl}`,
        Date: new Date(value.date).toDateString(),
      };
    });
  console.log(shortUrl);
  const columns = [
    {
      title: "S.NO",
      dataIndex: "Sno",
      key: "sno",
    },
    {
      title: "ShortURl",
      dataIndex: "ShortUrl",
      key: "age",
      render: (text) => <a href={text}>{text}</a>,
    },
    {
      title: "CreatedON",
      dataIndex: "Date",
      key: "address",
    },
  ];

  return (
    <div>
      <div className="mt-5">
        <Segmented
          options={["All", "Today", "Monthly", "Yearly"]}
          onChange={segments}
        />
      </div>
      <div className="mt-5 pt-3">
        <Table
          columns={columns}
          dataSource={dataSource}
          loading={tableLoading}
          style={{ overflow: "auto" }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
