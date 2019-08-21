import React, { Component } from "react";
import { View } from "react-native";
import PasswordDetails from "./PasswordDetails";
import CurrentPasswordPage from "./CurrentPasswordPage";

class PasswordPanel extends Component {
  state = {
    confirmationFlag: false
  };

  handleConfirmationChange = () => {
    this.setState({ confirmationFlag: true });
  };

  render() {
    return (
      <View>
        {this.state.confirmationFlag ? (
          <PasswordDetails />
        ) : (
          <CurrentPasswordPage
            handleConfirmationChange={() => this.handleConfirmationChange()}
          />
        )}
      </View>
    );
  }
}

export default PasswordPanel;
