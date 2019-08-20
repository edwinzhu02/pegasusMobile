import React, { Component } from "react";
import { View, Image, Dimensions } from "react-native";
import { Button } from "react-native-paper";
import ImagePicker from "react-native-image-crop-picker";

class AvatarDetails extends Component {
  state = {
    imageUrl:
      "https://images.unsplash.com/photo-1565945985123-4c67ab31eb8d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80"
  };

  openImage = async () => {
    let image = await ImagePicker.openPicker({
      width: 750,
      height: 750,
      cropping: true
    });
    this.setState({imageUrl:image.path})
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
            uri: this.state.imageUrl
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
