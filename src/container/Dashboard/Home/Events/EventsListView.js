import React, { Component } from "react";
import { View, Image, Text, TouchableOpacity } from "react-native";
import { Divider } from "react-native-elements";

class EventsListView extends Component {
  itemHeight = 95;

  onPress = el => {
    this.props.navigation.navigate("EventDetail", { data: el.NewsData });
  };

  render() {
    return (
      <View style={{ marginTop: 10 }}>
        {this.props.dataList.map(el => (
          <TouchableOpacity
            key={el.CreatedAt}
            onPress={() => this.onPress(el)}
            activeOpacity={1}
          >
            <View style={{ flexDirection: "row", height: this.itemHeight }}>
              <Image
                source={{ uri: el.TitleUrl }}
                style={{
                  width: this.itemHeight * 0.85 * 1.618,
                  height: this.itemHeight * 0.85,
                  marginTop: (this.itemHeight * 0.15) / 2
                }}
              />
              <Text
                style={{
                  flex: 1,
                  flexWrap: "wrap",
                  color: "#222",
                  fontSize: 20,
                  marginHorizontal: 10,
                  marginTop: (this.itemHeight * 0.15) / 2
                }}
                numberOfLines={3}
              >
                {el.NewsTitle}
              </Text>
            </View>
            <Divider />
          </TouchableOpacity>
        ))}
      </View>
    );
  }
}

export default EventsListView;
