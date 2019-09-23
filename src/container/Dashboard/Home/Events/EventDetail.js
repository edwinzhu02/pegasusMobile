import React from "react";
import { View } from "react-native";
import { WebView } from "react-native-webview";

const EventDetail = props => {
  let data = props.navigation.state.params.data;
  return (
    <View>
      <WebView source={{ html: data }} style={{ marginTop: 20 }} />
    </View>
  );
};

export default EventDetail;
