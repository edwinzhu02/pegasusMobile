import React, {Component} from 'react';
import {
    createAppContainer,
    createBottomTabNavigator,
    createStackNavigator,
    createSwitchNavigator,

} from "react-navigation";
import AuthLoading from './src/components/AuthLoading/AuthLoading'
import Icon from 'react-native-vector-icons/Ionicons'
import Login from './src/components/Login/Login'
import Home from './src/components/Dashboard/Home/Home'
import SessionList from './src/components/Dashboard/Session/SessionList'
import Profile from './src/components/Dashboard/Profile/Profile'
import ChatList from "./src/components/Dashboard/Chat/ChatList/ChatList";
import ContactList from './src/components/Dashboard/Chat/ContactList/ContactList'
import CheckIn from './src/components/Dashboard/Session/CheckIn/CheckIn'
import CheckOut from './src/components/Dashboard/Session/CheckOut/CheckOut'
import Schedule from './src/components/Dashboard/Session/Schedule/Schedule'

const SessionStack = createStackNavigator({
    SessionList: SessionList,
    CheckIn: CheckIn,
    CheckOut: CheckOut,
    Schedule: Schedule
})

const ProfileStack = createStackNavigator({
    Profile: Profile
})

const ChatStack = createStackNavigator({
    ChatList: {
        screen: ChatList
    },
    ContactList: {
        screen: ContactList
    }
})

const HomeStack = createStackNavigator({
    Home:Home
})





const AppStack = createBottomTabNavigator({
    Home: {
        screen: HomeStack,
        navigationOptions:{
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) =>(
                <Icon name="ios-home" color={tintColor} size={24}/>
            )
        }
    },
    Session: {
        screen: SessionStack,
        navigationOptions:{
            tabBarLabel: 'Session',
            tabBarIcon: ({tintColor}) =>(
                <Icon name="ios-calendar" color={tintColor} size={24}/>
            )
        }
    },
    Chat: {
        screen: ChatStack,
        navigationOptions:{
            taBarLabel: 'Chat',
            tabBarIcon: ({tintColor}) =>(
                <Icon name="ios-chatboxes" color={tintColor} size={24}/>
            )
        }
    },
    Profile: {
        screen: ProfileStack,
        navigationOptions:{
            tabBarLabel: 'Profile',
            tabBarIcon: ({tintColor}) =>(
                <Icon name="md-person" color={tintColor} size={24}/>
            )
        }
    }
})



const AuthStack = createStackNavigator({
    Login: Login
},{
    headerMode: 'none'
})

const StackNavigator = createSwitchNavigator({
    AuthLoading: AuthLoading,
    App: AppStack,
    Auth: AuthStack
})

const App = createAppContainer(StackNavigator)

export default App
