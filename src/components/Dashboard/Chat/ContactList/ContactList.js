import React, {Component} from 'react'
import {View, Text, SafeAreaView, Button, FlatList, Alert} from 'react-native'
import ContactListItem from './ContactListItem/ContactListItem'
import {ActivityIndicator, Colors} from "react-native-paper";
export default class ContactList extends Component{
    static navigationOptions = ({navigation}) =>( {
        title: 'Contact List',
        headerLeft: null,
        headerRight:(
            <Button
                onPress={() => navigation.navigate("ChatList")}
                title="Chat List"
                color="#000"
            />
    )});

    state={
        ChatList:[],
        IsLoadChatListSuccess: false,
    }

    DataGenerator = (data) =>{
        let result = []
        data.StaffList.map(s=>{
            s.role = 1
            result.push(s)
        })
        data.LearnerList.map(s=>{
            s.role = 2
            result.push(s)
        })
        data.TeacherList.map(s=>{
            s.role = 3
            result.push(s)
        })
        return result
    }


    componentDidMount = ()=>{
        fetch('http://gradspace.org:5000/api/Chat/GetChattingList/1',{
            method: 'GET',
        }).then(res=>{
            return res.json()
        }).then(res=>{
            if (res.IsSuccess==false){
                throw new Error(res.ErrorMessage)
            }
            let chatList = this.DataGenerator(res.Data)

            this.setState({
                IsLoadChatListSuccess: true,
                ChatList: chatList
            })
        }).catch(err=>{
            Alert.alert(
                'Error',
                err.toString()
            )
        })
    }



    _renderItem = ({item})=>(
        <ContactListItem
            navigation={()=>this.props.navigation.navigate("ChatBox",{
                name: item.FirstName + " " + item.LastName
            })}
            item={item}
        />
    )


    render(){
        return (
            <View style={{flex:1,justifyContent:'center'}}>
                {this.state.IsLoadChatListSuccess?(
                        <FlatList
                            keyExtractor={(item,index)=>index.toString()}
                            data={this.state.ChatList}
                            renderItem={this._renderItem}
                        />):<ActivityIndicator size={50} animating={true} color={Colors.blue100} />}
            </View>
        )
    }
}
