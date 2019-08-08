import React, { Component } from "react";
import { View } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
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
  renderItem = ({ item, index }) => {
    return (
      <Card>
        <Card.Cover
          source={{ uri: item.url }}
          style={{ width: 400, height: 240 }}
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
          sliderWidth={400}
          itemWidth={400}
          autoplay={true}
        />
      </View>
    );
  }
}

export default CarouselView;
