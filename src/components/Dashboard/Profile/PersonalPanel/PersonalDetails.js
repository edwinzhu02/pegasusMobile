import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { TextInput, Title } from "react-native-paper";

class PersonalDetails extends Component {
  state = {
    address: ""
  };

  componentDidMount = () => {
    setTimeout(
      () =>
        this.setState({
          address: "nncasv acaswcvwbb gvadvadcd dcasfcotswcfqASVFASVGASD"
        }),
      1000
    );
  };

  render() {
    const windowWidth = Dimensions.get("window").width;

    return (
      <View style={{ alignItems: "center" }}>
        <Title style={{ marginVertical: 40 }}>Change Password</Title>
        <TextInput
          label="address"
          multiline={true}
          value={this.state.address}
          onChangeText={text => this.setState({ address: text })}
          style={{ marginTop: 20, width: windowWidth - 40 }}
        />
      </View>
    );
  }
}

export default PersonalDetails;
