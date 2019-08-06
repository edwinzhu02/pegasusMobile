import React, { Component } from "react";
import { View, Button, StyleSheet, Text } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";

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
        <Text style={styles.welcomeText}>
          Welcome, {this.state.firstname} {this.state.lastname}
        </Text>
      </View>
    );
  }
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  welcomeText: {
    alignSelf: "center",
    fontSize: 30
  }
});
