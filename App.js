import React, { Component } from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import AuthLoading from "./src/components/AuthLoading/AuthLoading";
import Icon from "react-native-vector-icons/Ionicons";
import Login from "./src/container/Login/Login";
import Home from "./src/container/Dashboard/Home/Home";
import SessionList from "./src/container/Dashboard/Session/SessionList";
import Profile from "./src/container/Dashboard/Profile/Profile";
import ChatBox from './src/container/Dashboard/Chat/ChatBox/ChatBox'
import CheckIn from "./src/container/Dashboard/Session/CheckIn/CheckIn";
import CheckOut from "./src/container/Dashboard/Session/CheckOut/CheckOut";
import Schedule from "./src/container/Dashboard/Session/Schedule/Schedule";
import Feedback from "./src/container/Dashboard/Session/Feedback/Feedback";
import FeedbackRating from "./src/container/Dashboard/Session/Feedback/FeedbackRating/FeedbackRating";
import FeedbackView from "./src/container/Dashboard/Session/FeedbackView/FeedbackView";
import ChatList from "./src/container/Dashboard/Chat/ChatList/ChatList";
import ContactList from "./src/container/Dashboard/Chat/ContactList/ContactList";
import EventDetail from "./src/container/Dashboard/Home/Events/EventDetail";
import AvatarDetails from "./src/container/Dashboard/Profile/AvatarPanel/AvatarDetails";
import PasswordPanel from "./src/container/Dashboard/Profile/PasswordPanel/PasswordPanel";
import PersonalDetails from "./src/container/Dashboard/Profile/PersonalPanel/PersonalDetails";

const SessionStack = createStackNavigator({
  SessionList: SessionList,
  CheckIn: CheckIn,
  CheckOut: CheckOut,
  Schedule: Schedule,

  //FeedBack
  Feedback: Feedback,
  FeedbackRating: FeedbackRating,
  //

  FeedbackView: FeedbackView
});

const ProfileStack = createStackNavigator({
  Profile: Profile,
  AvatarDetails: {
    screen: AvatarDetails,
    navigationOptions: ({ navigation }) => ({
      title: "Avatar"
    })
  },
  PasswordPanel: {
    screen: PasswordPanel,
    navigationOptions: ({ navigation }) => ({
      title: "Password"
    })
  },
  PersonalDetails: {
    screen: PersonalDetails,
    navigationOptions: ({ navigation }) => ({
      title: "PersonalDetails",
    })
  }
});

const ChatListStack = createStackNavigator({
  ChatList:{
    screen: ChatList
  },
  ChatBox: {
    screen: ChatBox
  }
});

const ContactListStack = createStackNavigator({
  ContactList:{
    screen: ContactList
  },
  ChatBox:{
    screen: ChatBox
  }
})
ContactListStack.navigationOptions = ({navigation}) =>{
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

ChatListStack.navigationOptions = ({navigation}) =>{
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
  };
};

const HomeStack = createStackNavigator({
  Home: Home,
  EventDetail: EventDetail
});

const AppStack = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({tintColor}) => (
          <Icon name="ios-home" color={tintColor} size={24}/>
      )
    }
  },
  Session: {
    screen: SessionStack,
    navigationOptions: {
      tabBarLabel: "Session",
      tabBarIcon: ({tintColor}) => (
          <Icon name="ios-calendar" color={tintColor} size={24}/>
      )
    }
  },
  ChatList: {
    screen: ChatListStack,
    navigationOptions: {
      taBarLabel: "Chat List",
      tabBarIcon: ({tintColor}) => (
          <Icon name="ios-chatboxes" color={tintColor} size={24}/>
      )
    }
  },
  ContactList:{
    screen: ContactListStack,
    navigationOptions:{
      taBarLabel: "Contact List",
      tabBarIcon: ({tintColor}) => (
          <Icon name="ios-contacts" color={tintColor} size={24}/>
      )
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({tintColor}) => (
          <Icon name="md-person" color={tintColor} size={24}/>
      )
    }
  }
});

const AuthStack = createStackNavigator(
  {
    Login: Login
  },
  {
    headerMode: "none"
  }
);

const StackNavigator = createSwitchNavigator({
  AuthLoading: AuthLoading,
  App: AppStack,
  Auth: AuthStack
});

const App = createAppContainer(StackNavigator);

export default App;
