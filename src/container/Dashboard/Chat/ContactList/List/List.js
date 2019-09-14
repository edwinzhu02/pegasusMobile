import React,{PureComponent} from 'react'
import {FlatList, ScrollView, Text, TouchableOpacity, View} from "react-native";
import {Item} from "../Item/Item";
export class List extends PureComponent{
    _renderItem = ({item})=>{
        return (
            <TouchableOpacity onPress={()=>{}}>
                <Item
                    name={`${item.FirstName} ${item.LastName}`}
                    photo="https://www.remove.bg/images/samples/combined/s1.jpg"
                />
            </TouchableOpacity>
        )
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
    render() {
        return (
            <View>
                <View style={{backgroundColor:"#DCDCDC"}}>
                    <Text style={{paddingLeft: 10}}>
                        {this.props.category}
                    </Text>
                </View>
                <FlatList
                    data={this.props.data}
                    renderItem={this._renderItem}
                    keyExtractor={(item,index) => index.toString()}
                    ItemSeparatorComponent={this.renderSeparator}
                />
            </View>
        );
    }
}
