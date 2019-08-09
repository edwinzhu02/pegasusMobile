import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import Carousel from "react-native-snap-carousel";

class CarouselView extends Component {
  state = {
    data: [
      {
        description: "a",
        id: 1,
        url:
          "https://images.unsplash.com/photo-1565210193972-6067c5784e4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      },
      {
        description: "b",
        id: 2,
        url:
          "https://images.unsplash.com/photo-1565210579809-6b057c557420?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      },
      {
        description: "c",
        id: 3,
        url:
          "https://images.unsplash.com/photo-1558980394-34764db076b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      }
    ]
  };

  width = Dimensions.get("window").width;

  renderItem = ({ item, index }) => {
    return (
      <Card style={{ backgroundColor: "#eee" }}>
        <Card.Cover
          source={{ uri: item.url }}
          style={{ width: this.width, height: 240 }}
        />
        <Card.Content>
          <Paragraph>{item.description}</Paragraph>
        </Card.Content>
      </Card>
    );
  };

  render() {
    return (
      <View>
        <Carousel
          data={this.state.data}
          renderItem={this.renderItem}
          sliderWidth={this.width}
          itemWidth={this.width}
        />
      </View>
    );
  }
}

export default CarouselView;
