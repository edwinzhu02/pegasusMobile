import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { Card, Paragraph } from "react-native-paper";
import Carousel, { Pagination } from "react-native-snap-carousel";

class CarouselView extends Component {
  state = {
    activeSlide: 0
  };

  width = Dimensions.get("window").width;

  renderItem = ({ item, index }) => {
    return (
      <Card
        onPress={() =>
          this.props.navigation.navigate("EventDetail", { data: item.NewsData })
        }
      >
        <Card.Cover
          source={{ uri: item.TitleUrl }}
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
            {item.NewsTitle}
          </Paragraph>
        </Card.Content>
      </Card>
    );
  };

  get pagination() {
    return (
      <Pagination
        dotsLength={5}
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
          data={this.props.dataList}
          renderItem={this.renderItem}
          sliderWidth={this.width}
          itemWidth={this.width}
          loop={true}
          loopClonesPerSide={5}
          autoplay={true}
          firstItem={1}
          onSnapToItem={index => {
            this.setState({ activeSlide: index });
            console.log(index);
          }}
        />
        {this.pagination}
      </View>
    );
  }
}

export default CarouselView;
