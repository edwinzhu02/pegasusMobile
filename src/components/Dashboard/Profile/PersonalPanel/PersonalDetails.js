import React, { Component } from "react";
import { View, Dimensions } from "react-native";
import { TextInput, Title, Button } from "react-native-paper";
import "../../../../util/global_config";
import AsyncStorage from "@react-native-community/async-storage";

class PersonalDetails extends Component {
  state = {
    ContactNum: "",
    Email: ""
  };

  userId;

  emailReg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

  componentDidMount = async () => {
    this.userId = await AsyncStorage.getItem("userid");
    try {
      let response = await fetch(
        global.constants.basic_url + "Login/GetProfile/" + this.userId
      );
      let result = await response.json();
      this.setState({
        ContactNum: result.Data.ContactNum,
        Email: result.Data.Email
      });
    } catch (e) {
      console.log(e);
    }
  };

  handleClick = () => {
    console.log(this.state, this.emailReg.test(this.state.email));
    if (!this.emailReg.test(this.state.email)) {
    } else {
      console.log("success");
    }
  };

  render() {
    const windowWidth = Dimensions.get("window").width;

    return (
      <View style={{ alignItems: "center" }}>
        <Title style={{ marginVertical: 40 }}>Change Details</Title>
        <TextInput
          label="Phone Number"
          mode="outlined"
          value={this.state.ContactNum}
          onChangeText={text => this.setState({ ContactNum: text })}
          style={{ marginTop: 20, width: windowWidth - 40 }}
        />
        <TextInput
          label="Email"
          mode="outlined"
          value={this.state.Email}
          onChangeText={text => this.setState({ Email: text })}
          style={{ marginTop: 20, width: windowWidth - 40 }}
        />
        <Button
          mode="contained"
          onPress={() => this.handleClick()}
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

export default PersonalDetails;
