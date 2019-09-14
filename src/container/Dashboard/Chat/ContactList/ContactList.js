import React, {Component} from 'react'
import {View, ScrollView, AlertStatic as Alert} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { SearchBar} from 'react-native-elements'
import {List} from "./List/List";
export default class ContactList extends Component{
    static navigationOptions = ({navigation}) =>( {
        title: 'Contact List'
    });

    state = {
        NameSearch: "",
        data: {StaffList:[],TeacherList:[],LearnerList:[]}
    }

    componentDidMount = async ()=>{
        const userId = await AsyncStorage.getItem("userid")
        fetch('http://gradspace.org:5000/api/Chat/GetChattingList/'+userId,{
            method: 'GET',
        }).then(res=>{
            return res.json()
        }).then(async res=>{
            if (res.IsSuccess==false){
                throw new Error(res.ErrorMessage)
            }
            this.setState({data:res.Data})
        })
    }

    updateSearch = (text) =>{
        this.setState({NameSearch:text})
    }


    render(){
        return (
            <View>
                <SearchBar
                    value={this.state.NameSearch}
                    onChangeText={this.updateSearch}
                    placeholder="Search Here..." lightTheme round />
                <ScrollView
                    contentContainerStyle={{paddingBottom: 60}}
                    style={{ borderTopWidth: 0, borderBottomWidth: 0}}>
                    <List
                        data={this.state.data.StaffList}
                        category="staff"
                    />
                    <List
                        data={this.state.data.LearnerList}
                        category="learner"
                    />
                    <List
                        data={this.state.data.TeacherList}
                        category="teacher"
                    />

                </ScrollView>
            </View>
        )
    }
}
