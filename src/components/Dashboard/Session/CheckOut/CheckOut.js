import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList,
  Alert
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { ListItem } from "react-native-elements";
import '../../../../util/global_config'
import {ActivityIndicator, Colors} from "react-native-paper";

export default class CheckOut extends Component {
  static navigationOptions = {
    title: "Check Out"
  };


  state = {
    userId: "",
    dateTime: "",
    location: {
      ready: false,
      where: { lat: null, lng: null },
      error: null
    },
    history: []
  };

  componentWillMount = async () => {
    this.setState({ userId: await AsyncStorage.getItem("userid") }, () => {
      fetch(`${global.constants.basic_url}loginlog/${this.state.userId}`)
        .then(response => {
          return response.json();
        })
        .then(result =>
          this.setState({ history: result.Data }, () => console.log(this.state))
        )
        .catch(error => console.log(error));
    });
  };

  componentDidMount = () => {
    //get Date time now
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    that.setState({
      //Setting the value of the date time
      dateTime: date + "/" + month + "/" + year + " " + hours + ":" + min
    });

    //get location by gps
    let geoOptions = {
      enableHighAccuracy: true,
      timeout: 20000,
      maximumAge: 60 * 60 * 24
    };
    this.setState({ location: { ready: false } });
    navigator.geolocation.getCurrentPosition(
      this.geoSuccess,
      this.goFailure,
      geoOptions
    );
  };

  geoSuccess = position => {
    this.setState({
      location: {
        ready: true,
        where: { lat: position.coords.latitude, lng: position.coords.longitude }
      }
    });
  };

  goFailure = err => {
    this.setState({ location: { error: err.message } });
  };

  CheckOutHandler = () => {
    let body = JSON.stringify({
      UserId: this.state.userId,
      LocaltionX: this.state.location.where.lat,
      LocaltionY: this.state.location.where.lng
    });
    console.log(body)

    fetch(`${global.constants.basic_url}LoginLog/CheckOut`, {
      method: "POST",
      body: body,
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => {
        console.log(response);
        return response.json();
      })
        .then(result => {
          if (result.IsSuccess == false) {
            throw new Error(result.ErrorMessage);
          }
          Alert.alert("Success", result.Data.toString())
        })
        .catch(err => Alert.alert("Fail", err.toString()))
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.topShadow}>
          <View style={styles.CircleContainer}>
            <TouchableOpacity onPress={() => this.CheckOutHandler()}>
              <View style={styles.CircleButton}>
                <Text style={styles.ButtonText}>Check Out</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{ fontSize: 20, padding: 5, color: "white" }}>
            Mon - Fri : 15:00 - 20:00
          </Text>
          <Text style={{ fontSize: 20, padding: 5, color: "white" }}>
            Sat - Sun : 8:00 - 20:00
          </Text>
        </View>
        <View style={styles.history}>
          {this.state.history.length > 0 ? (
            <FlatList
              data={this.state.history.map(el=>{
                if (el.LogType == 1) {
                  el.LogType = "Check In";
                } else {
                  el.LogType = "Check Out";
                }
                return el;
              })}
              renderItem={({ item }) => (
                <ListItem
                  title={`${item.LogType}`}
                  subtitle={`${item.CreatedAt.replace("T", " ")}`}
                  rightTitle={`${item.Abbr}`}
                />
              )}
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
              <ActivityIndicator
                  style={{ alignSelf: "center" }}
                  size={50}
                  animating={true}
                  color={Colors.blue100}
              />
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  topShadow: {
    flex: 4,
    alignItems: "center",
    backgroundColor: "rgb(34,143,198)"
  },
  dateText: {
    paddingTop: 20,
    fontSize: 18,
    color: "white"
  },
  recentRecord: {
    color: "white",
    paddingTop: 10,
    fontSize: 15
  },
  CircleButton: {
    height: 150,
    width: 150,
    borderRadius: 300,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  CircleContainer: {
    justifyContent: "center",
    paddingVertical: 30,
    alignItems: "center"
  },
  ButtonText: {
    fontSize: 20
  },
  history: {
    flex: 3,
    justifyContent: "center"
  }
});
