import React from "react";
import { View, Image, Dimensions } from "react-native";
import { Title, Paragraph } from "react-native-paper";

const EventDetail = props => {
  let data = props.navigation.state.params.data;
  let width = Dimensions.get("window").width;
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Title
        style={{ marginTop: 10, marginLeft: 15, marginRight: 15, fontSize: 20 }}
      >
        {data.title}
      </Title>
      <Image
        source={{ uri: data.url }}
        style={{
          width: width,
          height: width * 0.618,
          marginTop: 20,
          marginBottom: 20
        }}
      />
      <Paragraph
        style={{
          alignSelf: "flex-start",
          marginLeft: 15,
          marginRight: 15,
          fontSize: 16
        }}
      >
        {data.content}
      </Paragraph>
    </View>
  );
};

export default EventDetail;
