import React, {Component} from 'react'
import {View,ScrollView,Text, Button, FlatList,TouchableOpacity} from 'react-native'
import {Badge, Icon, ListItem,Avatar} from 'react-native-elements'

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

    state = {
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
                name: "HIHIHI"
            },
            {
                name:"Oliver"
            },
            {
                name: "HIHIHI"
            },
            {
                name:"Oliver"
            },
            {
                name: "HIHIHI"
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
            <TouchableOpacity onPress={()=>{this.props.navigation.navigate("ChatBox")}}>
                <ListItem
                    roundAvatar
                    title={item.name}
                    subtitle={()=>{return (<Text style={{color:"grey"}}>Nice to meet u ...</Text>)}}
                    rightSubtitle={()=>{return (<Text style={{fontSize:12,color:"grey"}}>yesterday</Text>)}}
                    containerStyle={{ borderBottomWidth: 0 }}
                    leftAvatar={()=>{return(
                        <View>
                            <Avatar
                                rounded
                                source={{
                                    uri: 'https://randomuser.me/api/portraits/men/41.jpg',
                                }}
                            />

                            <Badge
                                status="error"
                                containerStyle={{ position: 'absolute', top: -4, right: -4 }}
                            />
                        </View>
                    )}}
                    chevron={true}
                />
            </TouchableOpacity>
        )
    }

    render(){
        return (
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
        )

    }
}

export default ChatList
