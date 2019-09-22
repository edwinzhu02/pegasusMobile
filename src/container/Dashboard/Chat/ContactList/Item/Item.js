import {ListItem} from "react-native-elements";
import React,{PureComponent} from "react";

export class Item extends PureComponent{
    render(){
        return (
            <ListItem
                roundAvatar
                title={this.props.name}
                containerStyle={{ borderBottomWidth: 0 }}
                leftAvatar={{source:{uri: this.props.photo}}}
                chevron={true}
            />
        )
    }
}
