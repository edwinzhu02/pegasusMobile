import React, { Component } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import CarouselView from "./Carousel/CarouselView";
import EventsListView from "./Events/EventsListView";

class Home extends Component {
  static navigationOptions = {
    headerTitle: "Home"
  };
  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      lastname: null
    };
  }

  componentDidMount = () => {
    this.loadData();
  };

  loadData = async () => {
    this.setState({
      firstname: await AsyncStorage.getItem("firstname"),
      lastname: await AsyncStorage.getItem("lastname")
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <CarouselView style={{ fontSize: 30, flex: 1 }} />
        <EventsListView style={{ fontSize: 30, flex: 1 }} />
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 40
  }
});
