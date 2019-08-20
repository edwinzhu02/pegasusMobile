import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { TextInput, Title, Button, HelperText } from "react-native-paper";

class PasswordDetails extends Component {
  state = {
    passwordOne: "",
    passwordTwo: "",
    buttonValidFlag: false,
    helperVisibility: false
  };

  setButtonDisable() {
    if (this.state.passwordOne && this.state.passwordTwo) {
      this.setState({ buttonValidFlag: true });
    } else {
      this.setState({ buttonValidFlag: false });
    }
  }

  checkEqual() {
    if (this.state.passwordOne === this.state.passwordTwo) {
      return true;
    }
    return false;
  }

  submit() {
    if (this.checkEqual()) {
      console.log("success");
    } else {
      this.setState({ helperVisibility: true });
    }
  }

  render() {
    const windowWidth = Dimensions.get("window").width;
    return (
      <View style={{ alignItems: "center" }}>
        <Title style={{ marginVertical: 40 }}>Change Password</Title>
        <TextInput
          secureTextEntry={true}
          label="Password"
          mode="outlined"
          value={this.state.passwordOne}
          onChangeText={text => this.setState({ passwordOne: text })}
          style={{ marginTop: 20, width: windowWidth - 40 }}
        />
        <TextInput
          secureTextEntry={true}
          label="Re-enter Your Password"
          mode="outlined"
          value={this.state.passwordTwo}
          onChangeText={text => {
            this.setState({ passwordTwo: text });
            this.setButtonDisable();
          }}
          style={{ marginTop: 20, width: windowWidth - 40 }}
        />
        <HelperText
          type="error"
          visible={this.state.helperVisibility}
          style={{ fontSize: 18, marginTop: 10 }}
        >
          password is not equal
        </HelperText>
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
          Confirm
        </Button>
      </View>
    );
  }
}

export default PasswordDetails;
