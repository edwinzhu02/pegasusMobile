import React, { Component } from "react";
import {
  createAppContainer,
  createBottomTabNavigator,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";
import AuthLoading from "./src/components/AuthLoading/AuthLoading";
import Icon from "react-native-vector-icons/Ionicons";
import Login from "./src/components/Login/Login";
import Home from "./src/components/Dashboard/Home/Home";
import SessionList from "./src/components/Dashboard/Session/SessionList";
import Profile from "./src/components/Dashboard/Profile/Profile";
import ChatList from "./src/components/Dashboard/Chat/ChatList/ChatList";
import ContactList from "./src/components/Dashboard/Chat/ContactList/ContactList";
import CheckIn from "./src/components/Dashboard/Session/CheckIn/CheckIn";
import CheckOut from "./src/components/Dashboard/Session/CheckOut/CheckOut";
import Schedule from "./src/components/Dashboard/Session/Schedule/Schedule";
import Feedback from "./src/components/Dashboard/Session/Feedback/Feedback";
import FeedbackRating from "./src/components/Dashboard/Session/Feedback/FeedbackRating/FeedbackRating";
import FeedbackView from "./src/components/Dashboard/Session/FeedbackView/FeedbackView";
import Chat from "./src/components/Dashboard/Chat/Chat";
import EventDetail from "./src/components/Dashboard/Home/Events/EventDetail";
import AvatarDetails from "./src/components/Dashboard/Profile/AvatarDetails/AvatarDetails";
import PasswordDetails from "./src/components/Dashboard/Profile/PasswordDetails/PasswordDetails";
import PersonalDetails from "./src/components/Dashboard/Profile/PersonalDetails/PersonalDetails";

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
  PasswordDetails: {
    screen: PasswordDetails,
    navigationOptions: ({ navigation }) => ({
      title: "Password"
    })
  },
  PersonalDetails: {
    screen: PersonalDetails,
    navigationOptions: ({ navigation }) => ({
      title: "PersonalDetails"
    })
  }
});

const ChatStack = createStackNavigator({
  ChatList: {
    screen: ChatList
  },
  ContactList: {
    screen: ContactList
  },
  ChatBox: {
    screen: Chat
  }
});

const HomeStack = createStackNavigator({
  Home: Home,
  EventDetail: EventDetail
});

const AppStack = createBottomTabNavigator({
  Home: {
    screen: HomeStack,
    navigationOptions: {
      tabBarLabel: "Home",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-home" color={tintColor} size={24} />
      )
    }
  },
  Session: {
    screen: SessionStack,
    navigationOptions: {
      tabBarLabel: "Session",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-calendar" color={tintColor} size={24} />
      )
    }
  },
  Chat: {
    screen: ChatStack,
    navigationOptions: {
      taBarLabel: "Chat",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="ios-chatboxes" color={tintColor} size={24} />
      )
    }
  },
  Profile: {
    screen: ProfileStack,
    navigationOptions: {
      tabBarLabel: "Profile",
      tabBarIcon: ({ tintColor }) => (
        <Icon name="md-person" color={tintColor} size={24} />
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
