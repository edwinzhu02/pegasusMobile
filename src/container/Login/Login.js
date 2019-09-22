import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { View, Alert, Platform, TextInput } from "react-native";
import styles from "./styles";
import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";
import "../../util/global_config";
import {
  Modal,
  ActivityIndicator,
  Colors,
  Text,
  Button
} from "react-native-paper";

export default class Login extends Component {
  state = {
    username: "",
    password: "",
    visible: false
  };

  ErrorMessageAlert = (title, message) => {
    Alert.alert("Login Error", message);
  };

  LoginHandler = () => {
    this.setState({ visible: true });
    fetch(global.constants.basic_url + "login", {
      method: "POST",
      body: JSON.stringify({
        userName: this.state.username,
        password: this.state.password
      }),
      headers: {
        "content-type": "application/json"
      }
    })
      .then(res => {
        return res.json();
      })
      .then(async result => {
        if (result.IsSuccess == false) {
          throw new Error(result.ErrorMessage);
        }
        await AsyncStorage.setItem("token", result.Data.token);
        await AsyncStorage.setItem(
          "expires",
          JSON.stringify(result.Data.expires)
        );
        await AsyncStorage.setItem(
          "firstname",
          result.Data.userdetails.firstname
        );
        await AsyncStorage.setItem(
          "lastname",
          result.Data.userdetails.lastname
        );
        await AsyncStorage.setItem(
          "userPosition",
          result.Data.userdetails.position
        );
        await AsyncStorage.setItem(
          "SessionComponents",
          JSON.stringify(result.Data.mobileComponents)
        );
        await AsyncStorage.setItem("username", this.state.username);

        await AsyncStorage.setItem(
          "userid",
          JSON.stringify(result.Data.userid)
        );
        this.setState({ visible: false });
        this.props.navigation.navigate("AuthLoading");
      })
      .catch(err => {
        this.setState({ visible: false });
        this.ErrorMessageAlert("Login Error", err.toString());
      });
  };


  render() {
    return (
      <View style={{ flex: 1 }}>
        <Modal visible={this.state.visible}>
          <ActivityIndicator
            size={100}
            animating={true}
            color={Colors.blue100}
            style={{ alignSelf: "center" }}
          />
          <Text style={{ alignSelf: "center" }}>Loading...</Text>
        </Modal>
        <View style={styles.container}>
          <View>
            <RkText style={styles.title}>Able Music Studio</RkText>
          </View>
          <View style={{ minHeight: 185 }}>
            {Platform.OS === "ios" ? (
              <View style={{ minHeight: 185 }}>
                <RkTextInput
                  onChangeText={text => this.setState({ username: text })}
                  rkType="underline topLabel"
                  label="EMAIL ADDRESS"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoCorrect={false}
                  labelStyle={styles.inputLabel}
                  containerStyle={styles.inputContainer}
                  style={styles.input}
                />
                <RkTextInput
                  rkType="underline topLabel"
                  onChangeText={text => this.setState({ password: text })}
                  label="PASSWORD"
                  labelStyle={styles.inputLabel}
                  containerStyle={styles.inputContainer}
                  style={styles.input}
                  secureTextEntry={true}
                />
              </View>
            ) : (
              <View>
                <View>
                  <Text>Username:</Text>
                  <TextInput
                    style={{
                      marginVertical: 10,
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: "#265cce"
                    }}
                    label="username"
                    value={this.state.username}
                    onChangeText={text => this.setState({ username: text })}
                  />
                </View>
                <View>
                  <Text>Password:</Text>
                  <TextInput
                    style={{
                      marginVertical: 10,
                      borderRadius: 4,
                      borderWidth: 1,
                      borderColor: "#265cce"
                    }}
                    label="PASSWORD"
                    value={this.state.password}
                    secureTextEntry={true}
                    onChangeText={text => this.setState({ password: text })}
                  />
                </View>
              </View>
            )}
          </View>
          <View>
            <Button
              onPress={() => this.LoginHandler()}
              mode="contained"
              color="#265cce"
              disabled={this.state.visible}
            >
              SIGN IN
            </Button>
          </View>
        </View>
      </View>
    );
  }
}
