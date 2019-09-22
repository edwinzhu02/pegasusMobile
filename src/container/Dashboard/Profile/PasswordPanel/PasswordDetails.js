import React, { Component } from "react";
import { View, Dimensions, Alert } from "react-native";
import { TextInput, Title, Button, HelperText } from "react-native-paper";
import "../../../../util/global_config";
import AsyncStorage from "@react-native-community/async-storage";

class PasswordDetails extends Component {
  state = {
    currentPassword: "",
    passwordOne: "",
    passwordTwo: "",
    buttonValidFlag: false,
    notEqualFlag: false,
    tooShortFlag: false,
    similarToPreviousFlag: false
  };

  setButtonDisable = () => {
    if (
      this.state.passwordOne &&
      this.state.passwordTwo &&
      this.state.currentPassword
    ) {
      this.setState({ buttonValidFlag: true });
    } else {
      this.setState({ buttonValidFlag: false });
    }
  };

  checkEqual = () => {
    if (this.state.passwordOne === this.state.passwordTwo) {
      return true;
    }
    return false;
  };

  checkLength = () => {
    if (this.state.passwordOne.length >= 6) {
      return true;
    }
    return false;
  };

  checkNotSimilarToPrevious = () => {
    if (this.state.currentPassword !== this.state.passwordOne) {
      return true;
    }
    return false;
  };

  verifyData = () => {
    if (this.checkEqual()) {
      this.setState({ notEqualFlag: false });
    } else {
      this.setState({ notEqualFlag: true });
      return false;
    }
    if (this.checkLength()) {
      this.setState({ tooShortFlag: false });
    } else {
      this.setState({ tooShortFlag: true });
      return false;
    }
    if (this.checkNotSimilarToPrevious()) {
      this.setState({ similarToPreviousFlag: false });
    } else {
      this.setState({ similarToPreviousFlag: true });
      return false;
    }
    return true;
  };

  submit = async () => {
    if (this.verifyData()) {
      console.log(global.constants.basic_url);
      const data = JSON.stringify({
        username: await AsyncStorage.getItem("username"),
        oldPassword: this.state.currentPassword,
        newPassword: this.state.passwordOne
      });
      console.log(data);
      fetch(global.constants.basic_url + "ChangePassword", {
        method: "PUT",
        body: data,
        headers: {
          "content-type": "application/json"
        }
      })
        .then(res => {
          console.log(res);
          res.json();
        })
        .then(result => {
          console.log(result);
          Alert.alert("success");
        })
        .catch(err => console.log(err))
        .finally(() => this.props.navigation.navigate("Profile"));
    }
  };

  render() {
    const windowWidth = Dimensions.get("window").width;
    return (
      <View style={{ alignItems: "center" }}>
        <Title style={{ marginVertical: 40 }}>Change Password</Title>
        <TextInput
          secureTextEntry={true}
          label="Current Password"
          mode="outlined"
          value={this.state.currentPassword}
          onChangeText={text =>
            this.setState({ currentPassword: text }, () => {
              this.setButtonDisable();
            })
          }
          style={{ marginTop: 20, width: windowWidth - 40 }}
        />
        <TextInput
          secureTextEntry={true}
          label="Password"
          mode="outlined"
          value={this.state.passwordOne}
          onChangeText={text => {
            this.setState(
              {
                passwordOne: text,
                notEqualFlag: false,
                similarToPreviousFlag: false
              },
              () => {
                this.setButtonDisable();
              }
            );
          }}
          style={{ marginTop: 20, width: windowWidth - 40 }}
        />
        <TextInput
          secureTextEntry={true}
          label="Password Confirmation"
          mode="outlined"
          value={this.state.passwordTwo}
          onChangeText={text => {
            this.setState({ passwordTwo: text, notEqualFlag: false }, () => {
              this.setButtonDisable();
            });
          }}
          style={{ marginTop: 20, width: windowWidth - 40 }}
        />

        {this.state.notEqualFlag ? (
          <HelperText type="error" style={styles.helper}>
            Password is not equal to password confirmation
          </HelperText>
        ) : null}

        {this.state.tooShortFlag ? (
          <HelperText type="error" style={styles.helper}>
            Password length must be greater than or equal to 6
          </HelperText>
        ) : null}

        {this.state.similarToPreviousFlag ? (
          <HelperText type="error" style={styles.helper}>
            New password can't be similar to previous password
          </HelperText>
        ) : null}

        <Button
          onPress={() => this.submit()}
          disabled={!this.state.buttonValidFlag}
          mode="contained"
          color="#4F7FFE"
          style={{
            marginTop: 50,
            alignSelf: "center",
            paddingVertical: 10,
            width: windowWidth - 40
          }}
        >
          Submit
        </Button>
      </View>
    );
  }
}

const styles = {
  helper: { fontSize: 14, marginTop: 10 }
};

export default PasswordDetails;
