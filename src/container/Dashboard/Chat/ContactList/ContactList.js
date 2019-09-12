import React, {Component} from 'react'
import {View,ScrollView, Button, FlatList,TouchableOpacity} from 'react-native'
import {Icon, ListItem, SearchBar} from 'react-native-elements'
export default class ContactList extends Component{
    static navigationOptions = ({navigation}) =>( {
        title: 'Contact List',
        headerLeft: null,
        headerRight:(
            <Button
                onPress={() => navigation.navigate("ChatList")}
                title="Chat List"
            />
    )});

    state = {
        NameSearch: "",
        data: [
            {
                name:"Oliver"
            },
            {
                name:"HIHIHI"
            },
            {
                name:"Oliver"
            },
            {
                name:"HIHIHI"
            },
            {
                name:"Oliver"
            },
            {
                name:"HIHIHI"
            },
            {
                name:"Oliver"
            },
            {
                name:"HIHIHI"
            },
            {
                name:"Oliver"
            },
            {
                name:"HIHIHI"
            },
            {
                name:"Oliver"
            },
            {
                name:"HIHIHI"
            },
            {
                name:"HIHIHI"
            },
            {
                name:"Oliver"
            },
            {
                name:"HIHIHI"
            },

        ]
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    _renderItem = ({item})=>{
        return (
            <TouchableOpacity onPress={()=>{}}>
                <ListItem
                    roundAvatar
                    title={item.name}
                    containerStyle={{ borderBottomWidth: 0 }}
                    leftAvatar={{source:{uri: 'https://www.remove.bg/images/samples/combined/s1.jpg'}}}
                    chevron={true}
                />
            </TouchableOpacity>
        )
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
                    <FlatList
                        data={this.state.data}
                        renderItem={this._renderItem}
                        keyExtractor={item => item.name}
                        ItemSeparatorComponent={this.renderSeparator}
                    />
                </ScrollView>
            </View>
        )
    }
}
