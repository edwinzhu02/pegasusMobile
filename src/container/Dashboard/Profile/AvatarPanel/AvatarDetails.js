import React, { Component } from "react";
import { View, Image, Dimensions } from "react-native";
import { Button, ActivityIndicator } from "react-native-paper";
import ImagePicker from "react-native-image-crop-picker";
import AsyncStorage from "@react-native-community/async-storage";
import "../../../../util/global_config";

class AvatarDetails extends Component {
  state = {
    imageUrl: "",
    isWaiting: false
  };

  userId;

  componentDidMount = async () => {
    this.userId = await AsyncStorage.getItem("userid");
    try {
      let response = await fetch(
        global.constants.basic_url + "Login/GetProfileImg/" + this.userId
      );
      let data = await response.json();
      this.setState({ imageUrl: global.constants.photo_url + data.Data });
    } catch (e) {
      console.log(e);
    }
  };

  openImage = async () => {
    let image = await ImagePicker.openPicker({
      width: 750,
      height: 750,
      cropping: true
    });
    let fd = new FormData();
    fd.append("photo", { uri: image.path, name: "new.jpg", type: image.mime });
    console.log(image);
    this.setState({ isWaiting: true });
    try {
      let response = await fetch(
        global.constants.basic_url + "Login/ChangeImg/" + this.userId,
        {
          method: "POST",
          body: fd
        }
      );
      console.log(response);
      let result = await response.json();
      console.log(result);
      this.setState({ imageUrl: image.path, isWaiting: false });
    } catch (e) {
      console.log(e);
    }
  };

  render() {
    let windowWidth = Dimensions.get("window").width;
    return (
      <View>
        {this.state.imageUrl ? (
          <Image
            style={{
              width: windowWidth,
              height: windowWidth
            }}
            source={{
              uri: this.state.imageUrl
            }}
          />
        ) : (
          <ActivityIndicator
            size="large"
            animating={this.state.isWaiting}
            style={{
              marginTop: 50,
              alignSelf: "center",
              paddingVertical: 10,
              width: windowWidth - 20
            }}
          ></ActivityIndicator>
        )}

        {this.state.isWaiting ? (
          <ActivityIndicator
            size="large"
            animating={this.state.isWaiting}
            style={{
              marginTop: 50,
              alignSelf: "center",
              paddingVertical: 10,
              width: windowWidth - 20
            }}
          ></ActivityIndicator>
        ) : (
          <Button
            onPress={() => this.openImage()}
            mode="contained"
            color="#4F7FFE"
            style={{
              marginTop: 50,
              alignSelf: "center",
              paddingVertical: 10,
              width: windowWidth - 20
            }}
          >
            Change Avatar
          </Button>
        )}
      </View>
    );
  }
}

export default AvatarDetails;
