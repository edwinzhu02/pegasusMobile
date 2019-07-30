import React, {Component} from 'react'
import {
    StyleSheet,
    View,
    ListView,
    Text,
    SafeAreaView, Button,TouchableOpacity,
} from 'react-native';
console.disableYellowBox = true;
import api from '../../../../util/api_simulator'
import ChatItem from './ChatItem/ChatItem'

class ChatList extends Component{
    static navigationOptions = ({navigation}) =>( {
        title: 'Chat List',
        headerRight:(
            <Button
                onPress={() => navigation.navigate("ContactList")}
                title="Contact List"
                color="#000"
            />
        )
    });
    constructor(props){
        super(props)
        let ds = new ListView.DataSource({
            rowHasChanged: (row1, row2) => row1 !== row2,
        })
        let data = api.getUserMsgList(api.userId)
        this.state = {
            dataSource: ds.cloneWithRows(data)
        }
    }


    _renderMsgItem(msg) {
        let user = api.getUserInfo(msg.from);
        msg.text = msg.text.length > 25 ? msg.text.substring(0,23)+'...' : msg.text;
        return (
            <ChatItem
                user={user}
                message={msg}
                ToChatBox={()=>this.props.navigation.navigate("ChatBox",{
                    name: user.name.first+" "+user.name.last
                })}
            />
        );
    }
    render(){
        return (
            <View>
                <ListView
                    style={styles.list}
                    automaticallyAdjustContentInsets={false}
                    dataSource={this.state.dataSource}
                    renderRow={(row) => this._renderMsgItem(row)}
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    list: {
        paddingTop: 10
    },
});
export default ChatList
