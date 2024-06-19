/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Table, message, Segmented } from "antd";
import axios from "axios";
import Home from "./Home";
function Dashboard() {
  const [shortUrl, setShortUrl] = useState([]); // Url link and user data from server
  const [filters, setFilters] = useState([]); // Filter data in order to shown in dashboard
  const [tableLoading, setTableLoading] = useState(false);

  useEffect(() => {
    fetchAPI();
  }, []);
  //Fetch the data from server when component is loaded
  const fetchAPI = async () => {
    setTableLoading(true);
    try {
      const response = await axios.get(
        "https://url-shortner-ezi0.onrender.com/url/getUrl",
        {
          headers: {
            Authorization: localStorage.getItem("userToken"),
          },
        }
      );
      setTableLoading(false);
      message.success(response.data.message);
      setShortUrl(response.data.url);
      setFilters(response.data.url);
    } catch (error) {
      console.log(error);
      message.success(error.response.data.message);
    }
  };

  // Handle the filters to render into dashboard
  const segments = (values) => {
    console.log(values);

    if (values == "All") {
      setFilters(shortUrl);
    } else if (values == "Today") {
      const filterData = shortUrl.filter((value) => {
        return (
          new Date(value.date).toLocaleDateString() ==
          new Date().toLocaleDateString()
        );
      });
      setFilters(filterData);
    } else if (values == "Monthly") {
      const filterData = shortUrl.filter((value) => {
        return new Date(value.date).getMonth() == new Date().getMonth();
      });
      setFilters(filterData);
    } else if (values == "Yearly") {
      const filterData = shortUrl.filter((value) => {
        return new Date(value.date).getFullYear() == new Date().getFullYear();
      });
      setFilters(filterData);
    }
  };

  //configure data for dashboard  tables
  const dataSource =
    filters.length > 0 &&
    filters.map((value, index) => {
      return {
        key: index,
        Sno: index + 1,
        ShortUrl: `https://url-shortner-ezi0.onrender.com/url/getShortUrl/${value.shortUrl}`,
        Date: new Date(value.date).toDateString(),
      };
    });
  console.log(filters);

  // Table columns declared here
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
