import React, { Component } from "react";
import AsyncStorage from "@react-native-community/async-storage";
import { View, KeyboardAvoidingView, Alert, Platform } from "react-native";
import styles from "./styles";
import { RkButton, RkTextInput, RkText } from "react-native-ui-kitten";
import '../../util/global_config'
import {
  Modal,
  ActivityIndicator,
  Text,
  Colors,
  TextInput
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
        console.log(res);
        return res.json();
      })
      .then(async result => {
        console.log(result);
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
          "OrgId",
          JSON.stringify(result.Data.userdetails.OrgId)
        );
        await AsyncStorage.setItem(
          "userid",
          JSON.stringify(result.Data.userid)
        );
        this.setState({ visible: false });
        this.props.navigation.navigate("App");
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
            style={{ alignSelf: "center" }}
            size={50}
            animating={true}
            color={Colors.blue100}
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
                <TextInput
                  label="EMAIL ADDRESS"
                  value={this.state.username}
                  onChangeText={text =>
                    this.setState({ username: text }, () => {
                      console.log(this.state);
                    })
                  }
                />
                <TextInput
                  label="PASSWORD"
                  value={this.state.password}
                  secureTextEntry={true}
                  onChangeText={text =>
                    this.setState({ password: text }, () => {
                      console.log(this.state);
                    })
                  }
                />
              </View>
            )}
          </View>
          <View>
            <RkButton
              onPress={() => this.LoginHandler()}
              innerStyle={[{ fontSize: 20 }]}
              rkType="circle outline medium"
            >
              SIGN IN
            </RkButton>
          </View>
        </View>
      </View>
    );
  }
}
