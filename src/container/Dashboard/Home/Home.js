import React, { Component } from "react";
import { View, Button, StyleSheet, Text, ScrollView } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import CarouselView from "./Carousel/CarouselView";
import EventsListView from "./Events/EventsListView";
import "../../../util/global_config";

console.disableYellowBox = true;
class Home extends Component {
  static navigationOptions = {
    headerTitle: "Home"
  };
  constructor(props) {
    super(props);
    this.state = {
      firstname: null,
      lastname: null,
      dataList: []
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
    let response = await fetch(global.constants.basic_url + "News");
    let data = await response.json();
    this.setState({ dataList: data.Data }, () =>
      console.log(this.state.dataList)
    );
  };

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={{ flex: 1 }}>
            <CarouselView
              navigation={this.props.navigation}
              dataList={this.state.dataList}
            />
          </View>
          <View style={{ flex: 1 }}>
            <EventsListView
              navigation={this.props.navigation}
              dataList={this.state.dataList}
            />
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
