import React, { Component } from "react";
import { StyleSheet, TouchableOpacity, View, Image } from "react-native";

import { RkConfig, RkButton, RkCard, RkText } from "react-native-ui-kitten";

export default class ChatItemClassic extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let msg = this.props.message;
    let user = this.props.user;
    return (
      <TouchableOpacity onPress={this.props.ToChatBox}>
        <RkCard rkCardHeader style={styles.container}>
          <View rkCardRow>
            <Image rkCardAvatarSmall source={user.avatar} />
            <View>
              <RkText rkCardTitle>
                {user.name.first} {user.name.last}
              </RkText>
              <RkText rkCardSubTitle style={styles.subtitle}>
                {msg.text}
              </RkText>
            </View>
          </View>
          <View style={styles.timeContainer}>
            <RkText rkCardSubTitle>{msg.time}</RkText>
          </View>
        </RkCard>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
<<<<<<< HEAD
    container:{
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomWidth: 1
    },
    timeContainer:{
        alignSelf: 'flex-start'
    },
    subtitle:{
        fontSize: 13,
        marginTop: 5
    }
=======
  container: {
    marginTop: 0,
    marginBottom: 0,
    marginLeft: 0,
    marginRight: 0,
    borderRadius: 0,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomWidth: 1
  },
  timeContainer: {
    alignSelf: "flex-start"
  },
  subtitle: {
    fontSize: 13,
    marginTop: 5
  }
>>>>>>> 849a1c151418e3dce274a64d21e4ae7eba2e9c97
});
