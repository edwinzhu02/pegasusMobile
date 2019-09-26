import React from "react";
import { WebView } from "react-native-webview";

const EventDetail = props => {
  let data = props.navigation.state.params.data;
  return (
        <WebView source={{ html: data }} style={{ marginTop: 20 }} />
  );
};

export default EventDetail;
