import {ListItem} from "react-native-elements";
import React from "react";

export const Item = (props)=>(
    <ListItem
        roundAvatar
        title={props.name}
        containerStyle={{ borderBottomWidth: 0 }}
        leftAvatar={{source:{uri: props.photo}}}
        chevron={true}
    />
)
