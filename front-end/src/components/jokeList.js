import React, { useState, useEffect } from "react";
import { client } from "../api";
import { List, Button, Rate, Typography, Tag } from "antd";

const { Text } = Typography;

export const JokeList = ({ setJokes, data }) => {
  const onSave = async (item) => {
    let newUpdate = item.document;
    newUpdate.users_saved.push(localStorage.getItem("username"));
    await client.collections("jokes").documents(newUpdate.id).update(newUpdate);
    setJokes(
      data.map((e) => {
        if (e.document.id == item.document.id) e.document = newUpdate;
        return e;
      })
    );
  };

  const onRate = async (item) => {
    let newUpdate = item.document;
    newUpdate.users_rated.push(localStorage.getItem("username"));

    // pegar a nova media de rating
    newUpdate.rating_average =
      (newUpdate.current_rate + newUpdate.rating_amount) /
      newUpdate.users_rated.length;
    newUpdate.rating_amount = newUpdate.users_rated.length;

    await client.collections("jokes").documents(newUpdate.id).update(newUpdate);
    setJokes(
      data.map((e) => {
        if (e.document.id == item.document.id) e.document = newUpdate;
        return e;
      })
    );
  };

  const formatDate = data => {
    const newDate = data.split(' ');
    const year = newDate[0].split('-');
    return `${newDate[1]} ${year[2]}/${year[1]}/${year[0]}`
  }

  return (
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
        pageSize: 10,
      }}
      dataSource={data}
      renderItem={(item) => (
        <List.Item
          actions={[
            <Button
              disabled={item.document.users_saved.includes(
                localStorage.getItem("username")
              )}
              onClick={() => {
                onSave(item);
              }}
            >
              Save joke{" "}
            </Button>,
            <Button
              onClick={() => {
                onRate(item);
              }}
              disabled={item.document.users_rated.includes(
                localStorage.getItem("username")
              )}
              type="link"
            >
              Rate joke
            </Button>,
            <Rate
              disabled={item.document.users_rated.includes(
                localStorage.getItem("username")
              )}
              value={item.document.current_rate}
              onChange={(e) => {
                setJokes(
                  data.map((element) => {
                    if (element.document.id === item.document.id)
                      element.document.current_rate = e;
                    return element;
                  })
                );
              }}
            />,
          ]}
        >
          {item.document.joke}
          <Text type="secondary">
          {"  "}
          {` ${formatDate(item.document.date)}`}
          {" "}
          </Text>
          <Tag color="gold">
            {`  ${item.document.rating_average}/5: (${item.document.rating_amount} reviews) `}</Tag>
        </List.Item>
      )}
    />
  );
};
