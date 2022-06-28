import React from "react";
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

  const deleteItem = async (item) => {
    let newUpdate = item.document;
    newUpdate.users_saved.splice(
      newUpdate.users_saved.indexOf(localStorage.getItem("username")),
      1
    );
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
    const tempAverage = newUpdate.rating_amount || 1;
    newUpdate.rating_average =
      (tempAverage * newUpdate.rating_average + newUpdate.current_rate) /
      newUpdate.users_rated.length;
    newUpdate.rating_amount = newUpdate.users_rated.length;
    newUpdate.rating_average = parseFloat(newUpdate.rating_average.toFixed(1));

    await client.collections("jokes").documents(newUpdate.id).update(newUpdate);
    setJokes(
      data.map((e) => {
        if (e.document.id == item.document.id) e.document = newUpdate;
        return e;
      })
    );
  };

  const formatDate = (data) => {
    // eslint-disable-next-line no-extend-native
    Date.prototype.addHours = function (value) {
      this.setHours(this.getHours() + value);
    };

    const d = new Date(data);
    // fixing timezone
    d.addHours(-3);
    const Minutes = d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes();
    const Hours = d.getHours() < 10 ? `0${d.getHours()}` : d.getHours();
    const Days = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const Months = d.getMonth() < 10 ? `0${d.getMonth()}` : d.getMonth();
    return `${Hours}:${Minutes} ${Days}/${Months}/${d.getFullYear()}`;
  };

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
            <>
              {item.document.users_saved.includes(
                localStorage.getItem("username")
              ) ? (
                <Button
                  danger
                  type="text"
                  onClick={() => {
                    deleteItem(item);
                  }}
                >
                  Remove
                </Button>
              ) : null}
            </>,
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
            <Rate
              disabled={item.document.users_rated.includes(
                localStorage.getItem("username")
              )}
              allowHalf
              value={item.document.current_rate}
              onChange={(e) => {
                setJokes(
                  data.map((element) => {
                    if (element.document.id === item.document.id)
                      element.document.current_rate = e;
                    return element;
                  })
                );
                onRate(item);
              }}
            />,
          ]}
        >
          <Text type="secondary">{` ${formatDate(item.document.date)}`}</Text>
          <br></br>
          {item.document.joke}{" "}
          <Tag color="gold">
            {`  ${item.document.rating_average}/5: (${item.document.rating_amount} reviews) `}
          </Tag>
        </List.Item>
      )}
    />
  );
};
