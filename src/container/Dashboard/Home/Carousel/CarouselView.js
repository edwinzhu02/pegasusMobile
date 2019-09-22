import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import Carousel, { Pagination } from "react-native-snap-carousel";

class CarouselView extends Component {
  state = {
    activeSlide: 0,
    data: [
      {
        title:
          "Determines what the opacity of the wrapped view should be when touch is active. Defaults to 0.2.",
        content:
          "enabled: If true, parallax effects are enabled. Defaults to true. shiftDistanceX: Defaults to 2.0. shiftDistanceY: Defaults to 2.0. tiltAngle: Defaults to 0.05. magnificatio",
        id: 1,
        url:
          "https://images.unsplash.com/photo-1565210193972-6067c5784e4f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      },
      {
        title: "b",
        content: "b1",
        id: 2,
        url:
          "https://images.unsplash.com/photo-1565210579809-6b057c557420?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      },
      {
        title: "c",
        content: "c1",
        id: 3,
        url:
          "https://images.unsplash.com/photo-1558980394-34764db076b4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"
      }
    ]
  };

  width = Dimensions.get("window").width;

  renderItem = ({ item, index }) => {
    return (
      <Card
        onPress={() =>
          this.props.navigation.navigate("EventDetail", { data: item })
        }
      >
        <Card.Cover
          source={{ uri: item.url }}
          style={{
            width: this.width,
            height: this.width * 0.618
          }}
        />
        <Card.Content style={{ backgroundColor: "rgba(0, 0, 0, 0.9)" }}>
          <Paragraph
            numberOfLines={2}
            style={{ fontSize: 16, color: "#eee", marginTop: 10 }}
          >
            {item.title}
          </Paragraph>
        </Card.Content>
      </Card>
    );
  };

  get pagination() {
    return (
      <Pagination
        dotsLength={this.state.data.length}
        activeDotIndex={this.state.activeSlide}
        containerStyle={{
          marginTop: -15,
          marginBottom: -20
        }}
        dotStyle={{
          width: 10,
          height: 10,
          borderRadius: 5,
          backgroundColor: "#000"
        }}
      />
    );
  }

  render() {
    return (
      <View>
        <Carousel
          data={this.state.data}
          renderItem={this.renderItem}
          sliderWidth={this.width}
          itemWidth={this.width}
          loop={true}
          autoplay={true}
          lockScrollWhileSnapping={true}
          onSnapToItem={index => this.setState({ activeSlide: index })}
        />
        {this.pagination}
      </View>
    );
  }
}

export default CarouselView;
