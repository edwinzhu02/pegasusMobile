import React, { Component } from "react";
import { View, Button, StyleSheet, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import CarouselView from "./Carousel/CarouselView";
import EventsListView from "./Events/EventsListView";
console.disableYellowBox = true
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
      <ScrollView>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <CarouselView navigation={this.props.navigation} />
          </View>
          <View style={{ flex: 1 }}>
            <EventsListView navigation={this.props.navigation} />
          </View>
        </View>
      </ScrollView>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 5
  }
});
