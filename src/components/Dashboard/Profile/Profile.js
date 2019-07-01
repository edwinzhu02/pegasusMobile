import React, {Component} from 'react'
import ReactNativeSettingsPage, {
    SectionRow,
    NavigateRow,
    CheckRow
} from 'react-native-settings-page';
import {View,ScrollView} from 'react-native'
import {RkCard,RkButton,RkConfig} from "react-native-ui-kitten";
import AsyncStorage from "@react-native-community/async-storage";

class Profile extends Component{
    static navigationOptions = {
        title: 'Profile'
    };
    signOutAsync = async ()=>{
        await AsyncStorage.clear()
        this.props.navigation.navigate('Auth')
    }
    render(){
        return (
            <View style={{flex:1}}>
                <ScrollView>
                    <ReactNativeSettingsPage>
                        <SectionRow text='Account'>
                            <NavigateRow
                                text='Account Security'
                                iconName='user'/>
                        </SectionRow>

                        <SectionRow text='Usage'>
                            <NavigateRow
                                text='Navigate Row'
                                iconName='user'/>
                            <NavigateRow
                                text='Navigate Row'
                                iconName='user'/>
                            <NavigateRow
                                text='Navigate Row'
                                iconName='user'/>
                        </SectionRow>
                        <SectionRow text='Usage'>
                            <NavigateRow
                                text='Navigate Row'
                                iconName='user'/>
                            <NavigateRow
                                text='Navigate Row'
                                iconName='user'/>
                            <NavigateRow
                                text='Navigate Row'
                                iconName='user'/>
                        </SectionRow>
                    </ReactNativeSettingsPage>
                </ScrollView>
                <RkCard>
                    <RkButton
                        style={[{borderColor:'red'}]}
                        innerStyle={[{fontSize: 20,color:'red'}]}
                        onPress={()=>this.signOutAsync()}>Log Out</RkButton>
                </RkCard>
            </View>
        )
    }
}


export default Profile


