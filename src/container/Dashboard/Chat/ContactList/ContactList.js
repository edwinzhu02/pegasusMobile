import React, {PureComponent} from 'react'
import {View, ScrollView, AlertStatic as Alert} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { SearchBar} from 'react-native-elements'
import {List} from "./List/List";
export default class ContactList extends PureComponent{
    static navigationOptions = ({navigation}) =>( {
        title: 'Contact List'
    });

    state = {
        NameSearch: "",
        data: {StaffList:[],TeacherList:[],LearnerList:[]}
    }

    componentDidMount = ()=>{
        AsyncStorage.getItem("contactList").then(data=>{
            this.setState({data:JSON.parse(data)})
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
