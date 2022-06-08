import React, { useState, useEffect } from "react";
import logo from "./imgs/joker.svg";
import jokehub from "./imgs/jokehub.png";
import "./App.css";
import { Input, Typography, Row, Button, Rate, List, Space } from "antd";
import { AudioOutlined } from "@ant-design/icons";
import {
  UserOutlined,
  LogoutOutlined,
  LikeOutlined,
  MessageOutlined,
  StarOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

const { Title, Link } = Typography;
const { Search } = Input;


function App() {
  const data = Array.from({
    length: 23,
  }).map((_, i) => ({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  }));

  const onSearch = (value) => console.log(value);

  const [user, setUser] = useState(null);

  const login = (username) => {
    localStorage.setItem("username", username);
    setUser(username);
  };

  const logout = () => {
    localStorage.setItem("username", "");
    setUser(null);
  };

  const inputUser = () => (
    <Search
      prefix={
        <UserOutlined
          style={{ marginLeft: 2, marginRight: 10 }}
          className="site-form-item-icon"
        />
      }
      placeholder="Enter your username"
      enterButton="Go"
      size="large"
      style={{ marginTop: 3, alignSelf: "center", maxWidth: "300px" }}
      onSearch={(username) => login(username)}
    />
  );

  const inputJoke = () => (
    <Search
      enterButton="Go"
      size="large"
      style={{ marginTop: 3, alignSelf: "center", maxWidth: "300px" }}
      onSearch={(username) => login(username)}
    />
  );

  const userName = (username) => (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Title level={3} style={{ marginTop: 10, alignSelf: "center" }}>
        {username}
      </Title>
      <Button
        size="large"
        type="link"
        style={{ marginLeft: 10 }}
        onClick={logout}
        icon={<LogoutOutlined />}
      >
        Logout
      </Button>
    </div>
  );

  const list = () => (
    <List
      style={{
        width: 800,
        alignSelf: "center",
        marginTop: 20,
        marginBottom: 30,
      }}
      itemLayout="vertical"
      size="large"
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 3,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          // style={{ display: "flex", justifyContent: "end"}}
          // key={item.title}
          actions={[
            <Rate allowHalf disabled defaultValue={2.5} />,
            <Button>Save joke</Button>,
          ]}
        >
          <List.Item.Meta title={<a href={item.href}>{item.title}</a>} />
          {item.content}
        </List.Item>
      )}
    />
  );

  useEffect(() => {
    const currentName = localStorage.getItem("username");
    if (currentName || currentName ===!"") setUser(currentName);
  }, [user]);

  return (
    <body className="App-body">
      <Row
        class="App"
        style={{
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
          width: 850,
          alignSelf: "center"
        }}
      >
        <img src={logo} className="App-logo" alt="logo" />
        <img
          src={jokehub}
          alt="logo"
          style={{
            marginTop: 10,
            alignSelf: "center",
            maxWidth: 170,
            marginBottom: 20,
          }}
        />

        {user ? (
          <>
            {userName(user)}
            <div style={{ alignSelf: "center" }}>
              {inputJoke()}
              <div style={{ display: "flex", justifyContent: "center" }}>
                <Button type="link">My Jokes</Button>
                <Button type="link">All jokes</Button>
              </div>
            </div>
            {list()}
          </>
        ) : (
          inputUser()
        )}
      </Row>
    </body>
  );
}

export default App;
