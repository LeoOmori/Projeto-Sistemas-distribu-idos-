import React, { useState, useEffect } from "react";
import logo from "./imgs/joker.svg";
import jokehub from "./imgs/jokehub.png";
import "./App.css";
import { listJokes, listUserSavedJokes, listTopJokes } from "./schemas";
import {client} from './api'
import { Input, Typography, Row, Button, Rate, List, Spin } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "antd/dist/antd.css";

import { JokeList } from "./components/jokeList";

const { Title, Link } = Typography;
const { Search } = Input;

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const data = Array.from({
    length: 23,
  }).map((_, i) => ({
    href: "https://ant.design",
    title: `ant design part ${i}`,
    content:
      "We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.",
  }));

  const onSearch = (value) => console.log(value);

  const login = (username) => {
    setLoading(true);
    localStorage.setItem("username", username);
    setUser(username);
    setLoading(false);
  };

  const logout = () => {
    setLoading(true);
    localStorage.setItem("username", "");
    setUser(null);
    setLoading(false);
    document.location.reload(true);
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
      allowClear
      size="large"
      style={{
        marginTop: 3,
        alignSelf: "center",
        maxWidth: "300px",
        borderRadius: "16px",
      }}
      onSearch={(username) => login(username)}
    />
  );

  const inputJoke = () => (
    <Search
      enterButton="Go"
      size="large"
      allowClear
      style={{ marginTop: 3, alignSelf: "center", width: "600px" }}
      onSearch={null}
    />
  );

  const userName = (username) =>
    user ? (
      <>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Title
            level={3}
            style={{
              marginLeft: 10,
              marginTop: 10,
              alignSelf: "center",
              color: "rgb(3 110 172)",
            }}
          >
            Welcome {username}!
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
      </>
    ) : null;


  useEffect(() => {
    const currentName = localStorage.getItem("username");
    if (currentName || currentName === !"") setUser(currentName);
  }, [user]);

  const [jokes, setJokes] = useState([])

  useEffect(() => {

    (async function () {
      const data = await client.collections('jokes').documents().search(listJokes)
      const dataWithCurrentRate = data.hits.map(e => {
        e.document.current_rate = e.document.rating_average;
        return e;
      })
      setJokes(dataWithCurrentRate)
      console.log(dataWithCurrentRate)
    }());
  
  },[])

  const openSavedJokes = async () => {
    const data = await client.collections('jokes').documents().search(listUserSavedJokes(localStorage.getItem("username")))
    const dataWithCurrentRate = data.hits.map(e => {
      e.document.current_rate = e.document.rating_average;
      return e;
    })
    setJokes(dataWithCurrentRate)
  }

  const getJokeList = async () => {
    const data = await client.collections('jokes').documents().search(listJokes)

    const dataWithCurrentRate = data.hits.map(e => {
      e.document.current_rate = e.document.rating_average;
      return e;
    })
    setJokes(dataWithCurrentRate)
    console.log(dataWithCurrentRate)
  }

  const getTopJokes = async () => {
    const data = await client.collections('jokes').documents().search(listTopJokes)

    const dataWithCurrentRate = data.hits.map(e => {
      e.document.current_rate = e.document.rating_average;
      return e;
    })
    setJokes(dataWithCurrentRate)
    console.log(dataWithCurrentRate)
  }


  return (
      <div
        className="App-body"
        style={{ height: user || user === !"" ? "100%" : "100vh" }}
      >
        <Row
          style={{
            display: "flex",
            flexDirection: "column",
            backgroundColor: user ? "white" : "none",
            width: user ? 850 : "none",
            minHeight: user ? 800 : "none",
            alignSelf: "center",
          }}
        >
          <header style={{ display: "flex", justifyContent: "end" }}>
            {userName(user)}
          </header>
          <img src={logo} className="App-logo" alt="logo" />
          <img
            src={jokehub}
            alt="logo"
            className="Logo-text"
            style={{
              marginTop: 10,
              alignSelf: "center",
              width: 250,
              marginBottom: 20,
            }}
          />

          {user ? (
            <>
              <div style={{ alignSelf: "center" }}>
                {inputJoke()}
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button onClick={() => {openSavedJokes()}} type="link">My Jokes</Button>
                  <Button onClick={() => {getJokeList()}} type="link">All jokes</Button>
                  <Button onClick={() => {getTopJokes()}} type="link">Top 10 rated jokes</Button>
                </div>
              </div>
              <JokeList setJokes={setJokes} data={jokes}/>
            </>
          ) : (
            inputUser()
          )}
        </Row>
      </div>
  );
}

export default App;
