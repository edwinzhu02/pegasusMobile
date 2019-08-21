import React, { Component } from "react";
import { View } from "react-native";
import PasswordDetails from "./PasswordDetails";

class PasswordPanel extends Component {
  //dsy401 qwe123 123456
  render() {
    return (
      <View>
        <PasswordDetails {...this.props} />
      </View>
    );
  }
}

export default PasswordPanel;
