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

//http://gradspace.org:5000/api/loginlog/CheckIn => userId,locationX,locationY

export default class CheckIn extends Component {
  static navigationOptions = {
    title: "Check In"
  };

  CHECK_IN_API = "http://gradspace.org:5000/api/loginlog/CheckIn";

  state = {
    userId: "",
    dateTime: "",
    recentRecordTime: "13:13",
    location: {
      ready: false,
      where: { lat: null, lng: null },
      error: null
    },
    history: []
  };

  componentWillMount = async () => {
    this.setState({ userId: await AsyncStorage.getItem("userid") }, () => {
      fetch(`http://gradspace.org:5000/api/loginlog/${this.state.userId}`)
        .then(response => {
          console.log(response, this.state.userId);
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
        where: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
      }
    });
  };

  goFailure = err => {
    this.setState({ location: { error: err.message } });
  };

  CheckInHandler = () => {
    let body = JSON.stringify({
      UserId: this.state.userId,
      LocaltionX: this.state.location.where.lat,
      LocaltionY: this.state.location.where.lng
    });

    console.log(body);

    fetch(this.CHECK_IN_API, {
      method: "POST",
      body: body,
      headers: {
        "content-type": "application/json"
      }
    })
      .then(response => response.json())
      .then(result => Alert.alert("", result.Data, [{ text: "OK" }]))
      .catch(err => console.log(err));
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
          <Text style={styles.dateText}>{this.state.dateTime}</Text>
          <Text style={styles.recentRecord}>
            Record for today check in: {this.state.recentRecordTime}
          </Text>
          <View style={styles.CircleContainer}>
            <TouchableOpacity onPress={() => this.CheckInHandler()}>
              <View style={styles.CircleButton}>
                <Text style={styles.ButtonText}>Check In</Text>
              </View>
            </TouchableOpacity>
          </View>
          <Text style={{ padding: 5, color: "white" }}>
            签到 09:03 迟到 3 分钟
          </Text>
          <Text style={{ padding: 5, color: "white" }}>
            工作时间 09:00-18:00
          </Text>
        </View>
        <View style={styles.history}>
          {this.state.history.length > 0 ? (
            <FlatList
              data={this.state.history.map(el => {
                if (el.LogType == 1) {
                  el.LogType = "Check In";
                } else {
                  el.LogType = "Check Out";
                }
                return el;
              })}
              renderItem={({ item }) => {
                console.log(item);
                return (
                  <ListItem
                    title={`${item.LogType}`}
                    subtitle={`${item.CreatedAt.replace("T", " ")}`}
                    rightTitle={`${item.Abbr}`}
                  />
                );
              }}
              ItemSeparatorComponent={this.renderSeparator}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <Text
              style={{ alignSelf: "center", fontWeight: "bold", fontSize: 25 }}
            >
              No data
            </Text>
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
    paddingVertical: 15,
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
