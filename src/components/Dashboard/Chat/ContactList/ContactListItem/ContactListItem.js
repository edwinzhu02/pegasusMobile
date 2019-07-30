import React, {Component} from 'react';
import {
    StyleSheet,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import {RkConfig, RkButton, RkCard, RkText} from 'react-native-ui-kitten';





export default class ContactListItem extends Component{

    GetRoleName = (roleNum) => {
        switch(roleNum){
            case 1:
                return 'staff'
            case 2:
                return 'learner'
            case 3:
                return 'teacher'
            default:
                return null
        }
    }

    render(){
        return (
            <TouchableOpacity onPress={this.props.navigation}>
                <RkCard rkCardHeader style={styles.container}>
                    <View rkCardRow>
                        <Image rkCardAvatarSmall source={require('../../../../../../img/avatars/boy.jpg')}/>
                        <View>
                            <RkText rkCardTitle>{this.props.item.FirstName} {this.props.item.LastName}</RkText>
                            <RkText rkCardSubTitle style={styles.subtitle}>{this.GetRoleName(this.props.item.role)}</RkText>
                        </View>
                    </View>
                </RkCard>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        marginTop: 0,
        marginBottom: 0,
        marginLeft: 0,
        marginRight: 0,
        borderRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
        borderBottomColor: RkConfig.colors.lightGray,
        borderBottomWidth: 1
    },
    timeContainer:{
        alignSelf: 'flex-start'
    },
    subtitle:{
        fontSize: 13,
        marginTop: 5
    }
});
