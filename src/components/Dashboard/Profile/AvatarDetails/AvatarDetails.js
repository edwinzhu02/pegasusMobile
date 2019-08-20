import React, { Component } from "react";
import { View, Image, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import ImagePicker from "react-native-image-crop-picker";

class AvatarDetails extends Component {
  openImage = async () => {
    let image = await ImagePicker.openPicker({
      width: 750,
      height: 750,
      cropping: true
    });
    console.log(image);
  };

  render() {
    let windowWidth = Dimensions.get("window").width;
    return (
      <View>
        <Image
          style={{
            width: windowWidth,
            height: windowWidth
          }}
          source={{
            uri:
              "https://images.unsplash.com/photo-1565945985123-4c67ab31eb8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
          }}
        />
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
      </View>
    );
  }
}

export default AvatarDetails;
