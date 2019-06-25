import React, {Component} from 'react'
import {View, Text, SafeAreaView, Button} from 'react-native'
import {Appbar} from "react-native-paper";

export default class ContactList extends Component{
    static navigationOptions = ({navigation}) =>( {
        title: 'Contact List',
        headerRight:(
            <Button
                onPress={() => navigation.navigate("ChatList")}
                title="Chat List"
                color="#000"
            />
    )
});
    render(){
        return (
            <View>
            </View>
        )
    }
}
