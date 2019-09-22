import React, { Component } from "react";
import {
  View,
  Text,
  PermissionsAndroid,
  AlertStatic as Alert
} from "react-native";
import { ActivityIndicator, Colors } from "react-native-paper";
import styles from "./styles";
import AsyncStorage from "@react-native-community/async-storage";
class AuthLoading extends Component {
  constructor(props) {
    super(props);
    this.InitializeHandler();
  }

  InitializeHandler = () => {
    AsyncStorage.getItem("contactList").then(data => {
      if (data != null) {
        this._bootstrapAsync();
      } else {
        this.GetContactListHandler(data => {
          AsyncStorage.setItem("contactList", JSON.stringify(data)).then(
            async () => {
              this._bootstrapAsync();
            }
          );
        });
      }
    });
  };

  _bootstrapAsync = async () => {
    const userToken = await AsyncStorage.getItem("token");
    this.props.navigation.navigate(userToken ? "App" : "Auth");
  };

  GetContactListHandler = async fn => {
    const userId = await AsyncStorage.getItem("userid");
    if (!userId) {
      this.props.navigation.navigate("Auth");
    } else {
      fetch("http://gradspace.org:5000/api/Chat/GetChattingList/" + userId, {
        method: "GET"
      })
        .then(res => {
          return res.json();
        })
        .then(res => {
          if (res.IsSuccess == false) {
            throw new Error(res.ErrorMessage);
          }
          fn(res.Data);
        });
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={50} animating={true} color={Colors.blue100} />
        <Text>Loading...</Text>
      </View>
    );
  }
}

export default AuthLoading;
