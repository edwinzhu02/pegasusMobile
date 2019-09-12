import React, {Component} from 'react'
import {
    View, Button
} from 'react-native';

class ChatList extends Component{
    static navigationOptions = ({navigation}) =>( {
        title: 'Chat List',
        headerRight:(
            <Button
                onPress={() => navigation.navigate("ContactList")}
                title="Contact List"
            />
        )
    });

    render(){
        return (
            <View></View>
        )
    }
}

export default ChatList
