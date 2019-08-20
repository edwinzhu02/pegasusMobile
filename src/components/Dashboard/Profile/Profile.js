import React, { Component } from "react";
import ReactNativeSettingsPage, {
  SectionRow,
  NavigateRow
} from "react-native-settings-page";
import { View, ScrollView } from "react-native";
import { RkCard, RkButton } from "react-native-ui-kitten";
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
          <ReactNativeSettingsPage>
            <SectionRow text="Account">
              <NavigateRow
                text="Avatar"
                iconName="user"
                onPressCallback={() =>
                  this.props.navigation.navigate("AvatarDetails")
                }
              />
              <NavigateRow
                text="Change Password"
                iconName="user"
                onPressCallback={() =>
                  this.props.navigation.navigate("PasswordDetails")
                }
              />
              <NavigateRow
                text="Update Personal Details"
                iconName="user"
                onPressCallback={() =>
                  this.props.navigation.navigate("PersonalDetails")
                }
              />
            </SectionRow>
            <SectionRow text="Usage">
              <NavigateRow text="Navigate Row" iconName="user" />
              <NavigateRow text="Navigate Row" iconName="user" />
              <NavigateRow text="Navigate Row" iconName="user" />
            </SectionRow>
          </ReactNativeSettingsPage>
        </ScrollView>
        <RkCard>
          <RkButton
            style={[{ borderColor: "red" }]}
            innerStyle={[{ fontSize: 20, color: "red" }]}
            onPress={() => this.signOutAsync()}
          >
            Log Out
          </RkButton>
        </RkCard>
      </View>
    );
  }
}

export default Profile;
