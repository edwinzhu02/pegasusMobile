import React, { Component } from "react";
import ReactNativeSettingsPage, {
  SectionRow,
  NavigateRow
} from "react-native-settings-page";
import { View, ScrollView } from "react-native";
import { Button, List, Divider } from "react-native-paper";
import AsyncStorage from "@react-native-community/async-storage";

class Profile extends Component {
  static navigationOptions = {
    title: "Profile"
  };
  signOutAsync = async () => {
    await AsyncStorage.clear();
    this.props.navigation.navigate("Auth");
  };
  getUserData = async () => {};
  render() {
    return (
      <View style={{ flex: 1 }}>
        <ScrollView>
          <List.Item
            style={styles.listItem}
            title="Change Avatar"
            onPress={() => this.props.navigation.navigate("AvatarDetails")}
            left={props => <List.Icon {...props} icon="camera-enhance" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            style={styles.listItem}
            title="Change Password"
            onPress={() => this.props.navigation.navigate("PasswordPanel")}
            left={props => <List.Icon {...props} icon="lock" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />
          <Divider />
          <List.Item
            style={styles.listItem}
            title="Update Personal Details"
            onPress={() => this.props.navigation.navigate("PersonalDetails")}
            left={props => <List.Icon {...props} icon="account-box" />}
            right={props => <List.Icon {...props} icon="chevron-right" />}
          />

          <Button
            mode="outlined"
            color="red"
            style={{
              marginTop: 100,
              marginBottom: 20,
              marginHorizontal: 20,
              paddingVertical: 5,
              borderWidth: 2,
              borderColor: "red"
            }}
            onPress={() => this.signOutAsync()}
          >
            Log Out
          </Button>
        </ScrollView>
      </View>
    );
  }
}

const styles = {
  listHeader: {
    fontSize: 20
  },
  listItem: {
    marginTop: 10
  }
};

export default Profile;
