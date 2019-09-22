import React,{Component} from 'react';
import {Button,View} from "react-native";
import ChatList from "./ChatList/ChatList";
import ContactList from "./ContactList/ContactList";
export default class Chat extends Component{
    static navigationOptions = ({navigation}) =>( {
        title: navigation.getParam("title"),
        headerRight:(
            <Button
                onPress={() =>{
                    const isChatList = navigation.getParam("isChatList")
                    navigation.setParams({
                        isChatList: !isChatList,
                        title: isChatList?"Contact List":"Chat List"
                    })
                }}
                title={navigation.getParam("isChatList")?"ContactList":"ChatList"}
            />
        )
    });

    componentDidMount =() =>{
        this.props.navigation.setParams({
            title:"Chat List",
            isChatList: true
        })
    }

    render(){
        return (
            <View>
                {this.props.navigation.getParam("isChatList")?
                    (<ChatList
                        navigation={()=>{this.props.navigation.navigate("ChatBox")}}
                    />)
                    :
                    (<ContactList/>)}
            </View>
        )
    }
}
