import React from "react";
import { View, Image, Dimensions, WebView } from "react-native";
import { Title, Paragraph } from "react-native-paper";

const EventDetail = props => {
  let data = props.navigation.state.params.data;
  let width = Dimensions.get("window").width;
  return (
    <WebView
      source={{ uri: "https://github.com/facebook/react-native" }}
      style={{ marginTop: 20 }}
    />
  );
};

export default EventDetail;
