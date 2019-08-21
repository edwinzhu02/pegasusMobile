import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { TextInput, Title, Button, HelperText } from "react-native-paper";

class CurrentPasswordPage extends Component {
  state = {
    currentPassword: ""
  };

  handleClick = () => {
    console.log(this.props);
    this.props.handleConfirmationChange();
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
          onChangeText={text => this.setState({ currentPassword: text })}
          style={{ marginTop: 20, width: windowWidth - 40 }}
        />
        <Button
          onPress={() => this.handleClick()}
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

export default CurrentPasswordPage;
