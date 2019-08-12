import React, {Component} from 'react'
import {View, Text, PermissionsAndroid} from 'react-native'
import {ActivityIndicator, Colors} from 'react-native-paper'
import styles from './styles'
import AsyncStorage from '@react-native-community/async-storage';
class AuthLoading extends Component{
    constructor(props){
        super(props)
        this._bootstrapAsync();
    }

    _bootstrapAsync = async () =>{
        const userToken = await AsyncStorage.getItem('token')
        this.props.navigation.navigate(userToken?'App':'Auth')
    }
    render(){
        return (
            <View style={styles.container}>
                <ActivityIndicator size={50} animating={true} color={Colors.blue100} />
                <Text>
                    Loading...
                </Text>
            </View>
        )
    }
}


export default AuthLoading
