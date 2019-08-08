import React, { Component } from "react";
import { View, Text } from "react-native";
import { List } from "react-native-paper";

class EventsListView extends Component {
  data = [
    { id: 1, title: "t1", content: "c1" },
    { id: 2, title: "t2", content: "c2" },
    { id: 3, title: "t3", content: "c3" },
    { id: 4, title: "t4", content: "c4" },
    { id: 5, title: "t5", content: "c5" },
    { id: 6, title: "t6", content: "c6" }
  ];

  render() {
    return (
      <List.Section title="news">
        this.data.map(el=>
        <List.Item key={el.id} title={el.title} description={el.content} />)
      </List.Section>
    );
  }
}

export default EventsListView;
