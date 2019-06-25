import React, {Component} from 'react'
import {View,StyleSheet,Text,TouchableOpacity,FlatList} from 'react-native'
import {ListItem} from 'react-native-elements'

export default class CheckIn extends Component{
    static navigationOptions = {
        title: 'Check In'
    };

    state={
        dateTime: "",
        recentRecordTime: '13:13',
        location:{
            ready: false,
            where: {lat:null,lng:null},
            error: null
        },
        //这个是模拟数据 （打卡历史记录）
        history: [
            {logType: "Check in", createAt: '2019-04-10 13:11:11'},
            {logType: "Check in", createAt: '2019-04-11 13:11:11'},
            {logType: "Check in", createAt: '2019-04-12 13:19:11'},
            {logType: "Check in", createAt: '2019-04-13 13:19:11'},
            {logType: "Check in", createAt: '2019-04-10 13:11:11'},
            {logType: "Check in", createAt: '2019-04-11 13:11:11'},
            {logType: "Check in", createAt: '2019-04-12 13:19:11'},
            {logType: "Check in", createAt: '2019-04-13 13:19:11'},
            {logType: "Check in", createAt: '2019-04-10 13:11:11'},
            {logType: "Check in", createAt: '2019-04-11 13:11:11'},
            {logType: "Check in", createAt: '2019-04-12 13:19:11'},
            {logType: "Check in", createAt: '2019-04-13 13:19:11'},
            {logType: "Check in", createAt: '2019-04-10 13:11:11'},
            {logType: "Check in", createAt: '2019-04-11 13:11:11'},
            {logType: "Check in", createAt: '2019-04-12 13:19:11'},
            {logType: "Check in", createAt: '2019-04-13 13:19:11'},
            {logType: "Check in", createAt: '2019-04-10 13:11:11'},
            {logType: "Check in", createAt: '2019-04-11 13:11:11'},
            {logType: "Check in", createAt: '2019-04-12 13:19:11'},
            {logType: "Check in", createAt: '2019-04-13 13:19:11'},
            {logType: "Check in", createAt: '2019-04-10 13:11:11'},
            {logType: "Check in", createAt: '2019-04-11 13:11:11'},
            {logType: "Check in", createAt: '2019-04-12 13:19:11'},
            {logType: "Check in", createAt: '2019-04-13 13:19:11'},
            {logType: "Check in", createAt: '2019-04-12 13:19:11'},
            {logType: "Check in", createAt: '2019-04-13 13:19:11'},
            {logType: "Check in", createAt: '2019-04-10 13:11:11'},
            {logType: "Check in", createAt: '2019-04-11 13:11:11'},
            {logType: "Check in", createAt: '2019-04-12 13:19:11'},
            {logType: "Check in", createAt: '2019-04-13 13:19:11'},
            {logType: "Check in", createAt: '2019-04-10 13:11:11'},
            {logType: "Check in", createAt: '2019-04-11 13:11:11'},
            {logType: "Check in", createAt: '2019-04-12 13:19:11'},
            {logType: "Check in", createAt: '2019-04-13 13:19:11'},
            {logType: "Check in", createAt: '2019-04-12 13:19:11'},
            {logType: "Check in", createAt: '2019-04-13 13:19:11'},
            {logType: "Check in", createAt: '2019-04-10 13:11:11'},
            {logType: "Check in", createAt: '2019-04-11 13:11:11'},
            {logType: "Check in", createAt: '2019-04-12 13:19:11'},
            {logType: "Check in", createAt: '2019-04-13 13:19:11'},
            {logType: "Check in", createAt: '2019-04-10 13:11:11'},
            {logType: "Check in", createAt: '2019-04-11 13:11:11'},
            {logType: "Check in", createAt: '2019-04-12 13:19:11'},
            {logType: "Check in", createAt: '2019-04-13 13:19:11'},

        ]
    }
    componentDidMount = () =>
    {
        //get Date time now
        var that = this;
        var date = new Date().getDate(); //Current Date
        var month = new Date().getMonth() + 1; //Current Month
        var year = new Date().getFullYear(); //Current Year
        var hours = new Date().getHours(); //Current Hours
        var min = new Date().getMinutes(); //Current Minutes
        that.setState({
            //Setting the value of the date time
            dateTime:
                date + '/' + month + '/' + year + ' ' + hours + ':' + min
        });

        //get location by gps
        let geoOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximumAge: 60 * 60 * 24
        }
        this.setState({location:{ready: false}})
        navigator.geolocation.getCurrentPosition(
            this.geoSuccess,this.goFailure,geoOptions
        )
    }

    geoSuccess = (position) => {
        this.setState({
            location:{
                ready: true,
                where: {lat: position.coords.latitude,lng:position.coords.longitude}
            }
        })
    }

    goFailure = (err) => {
        this.setState({location:{error: err.message}})
    }

    CheckInHandler = () => {
        console.log(this.state)
    }

    renderSeparator = () =>{
        return (
            <View
                style={{
                    height:1,
                    backgroundColor: '#CED0CE',
                }}
            />
        )
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.topShadow}>
                    <Text style={styles.dateText}>
                        {this.state.dateTime}
                    </Text>
                    <Text style={styles.recentRecord}>
                        Record for today check in: {this.state.recentRecordTime}
                    </Text>
                    <View style={styles.CircleContainer}>
                        <TouchableOpacity onPress={()=>this.CheckInHandler()}>
                            <View style={styles.CircleButton}>
                                <Text style={styles.ButtonText}>Check In</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <Text style={{padding: 5,color:'white'}}>
                        签到 09:03 迟到 3 分钟
                    </Text>
                    <Text style={{padding:5,color:'white'}}>
                        工作时间 09:00-18:00
                    </Text>
                </View>
                <View style={styles.history}>
                    {this.state.history.length > 0?
                        <FlatList
                            data={this.state.history}
                            renderItem={({item})=>(
                                <ListItem
                                    title={`${item.logType}`}
                                    subtitle={`${item.createAt}`}
                                />
                            )
                            }
                            ItemSeparatorComponent={this.renderSeparator}
                        />
                        :
                        <Text>Sorry, No data</Text>
                    }
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
    },
    topShadow:{
        flex:4,
        alignItems: 'center',
        backgroundColor: 'rgb(34,143,198)'
    },
    dateText:{
        paddingTop: 20,
        fontSize: 18,
        color: 'white'
    },
    recentRecord:{
        color: 'white',
        paddingTop: 10,
        fontSize: 15,
    },
    CircleButton:{
        height: 200,
        width: 200,
        borderRadius:300,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',

    },
    CircleContainer:{
        justifyContent: 'center',
        paddingVertical: 15,
        alignItems: 'center',
    },
    ButtonText:{
        fontSize: 20,
    },
    history:{
        flex:3
    }
})
