import React from "react";
import { View, Image } from "react-native";
import { Title, Paragraph } from "react-native-paper";

const EventDetail = props => {
  let data = props.navigation.state.params.data;
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Title>{data.title}</Title>
      <Image source={{ uri: data.url }} />
      <Paragraph>{data.content}</Paragraph>
    </View>
  );
};

export default EventDetail;
