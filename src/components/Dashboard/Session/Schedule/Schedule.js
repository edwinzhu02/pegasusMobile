import React,{Component} from 'react'
import {View, Text,StyleSheet,TouchableOpacity,Button,ScrollView} from 'react-native'
import moment from 'moment'
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import Modal from 'react-native-modal'
export default class Schedule extends Component{
    static navigationOptions = {
        title: 'Schedule'
    };
<<<<<<< HEAD

    constructor(props) {
        super(props);
        this.state = {
            items: {},
            TodayDate: moment(new Date()).format('YYYY-MM-DD'),
            IsModalVisible: false,
            info:{
                time: null,
                student: null
            }
        };
    }


    loadItems = (day) => {
        console.log("abc")
        setTimeout(()=>{
            this.setState(
                {
                    items: {
                        "2019-06-30": [],
                        "2019-06-25": [],
                        "2019-06-27":
                            [
                                {
                                    "name":"18:30 one to one course","height":50,
                                    'info':{
                                        "time": '18:30',
                                        "student": 'mike'
                                    }
                                },
                                {"name":"20:30 one to one course","height":50,'info':{
                                        "time": '20:30',
                                        "student": 'mike'
                                    }}
                                ],
                        "2019-06-26":[{"name":"15:30 one to one course","height":50,'info':{
                                "time": '15:30',
                                "student": 'mike'
                            }}],
                        "2019-06-28":[{"name":"10:00 group Course","height":50,'info':{
                                "time": '10:00',
                                "student": 'mike'
                            }}],
                        "2019-06-29":[{"name":"11:00 one to one course","height":50,'info':{
                                "time": '11:00',
                                "student": 'mike'
                            }}],
                        "2019-07-29":[{"name":"11:00 one to one course","height":50,'info':{
                                "time": '11:00',
                                "student": 'mike'
                            }}],
                    }
                }
            )
        },1000)
    }


    eventClick = (info) =>{
        this.setState({
            info:{
                time: info.time,
                student: info.student
            },
            IsModalVisible: true
        })
    }

    renderItem = (item) => {
        return (
            <TouchableOpacity onPress={()=>this.eventClick(item.info)}>
                <View style={[styles.item, {height: item.height}]}><Text>{item.name}</Text></View>
            </TouchableOpacity>
        );
    }

    renderEmptyDate= ()=> {
        return (
            <View/>
        );
    }

    rowHasChanged = (r1, r2) => {
        return r1.name !== r2.name;
    }

    timeToString = (time)=> {
        const date = new Date(time);
        return date.toISOString().split('T')[0];
    }


    render(){
        return (
            <View style={{flex:1}}>


                <Modal
                    isVisible={this.state.IsModalVisible}
                    transparent={true}
                >

                    <View style={styles.modalContainer}>
                        <View style={styles.modalMainView}>
                            <Text style={styles.modalTitle}>Information</Text>
                            <View
                                style={{
                                    height:1,
                                    backgroundColor: '#CED0CE',
                                    width: '90%',
                                    alignSelf: 'center'
                                }}
                            />
                            <ScrollView>
                                <View style={{paddingTop: 10}}>
                                    <View style={styles.contentRowView}>
                                        <Text style={styles.contentTitle}>Time</Text>
                                        <Text style={styles.contentRow}>{this.state.info.time}</Text>
                                    </View>
                                    <View style={styles.contentRowView}>
                                        <Text style={styles.contentTitle}>Student</Text>
                                        <Text style={styles.contentRow}>{this.state.info.student}</Text>
                                    </View>
                                </View>
                            </ScrollView>
                            <View style={styles.modalButtonContainer}>
                                <Button title="Close" onPress={()=>this.setState({IsModalVisible: false})}>
                                </Button>
                            </View>
                        </View>

                    </View>
                </Modal>


                <Agenda
                    items={this.state.items}
                    loadItemsForMonth={this.loadItems.bind(this)}
                    selected={this.state.TodayDate}
                    renderItem={this.renderItem.bind(this)}
                    renderEmptyDate={this.renderEmptyDate.bind(this)}
                    rowHasChanged={this.rowHasChanged.bind(this)}
=======
  }

  componentDidMount = async () => {
    this.setState(
      {
        userId: await AsyncStorage.getItem("userid"),
        userPosition: await AsyncStorage.getItem("userPosition")
      },
      () => {
        fetch(
          global.constants.basic_url +
            "Lesson/GetMobileLessonsForTeacherbyDate/" +
            this.state.userId +
            "/" +
            this.state.TodayDate
        )
          .then(res => res.json())
          .then(result =>
            this.setState({ items: result.Data, isFetchFinished: true })
          );
      }
    );
  };

  eventClick = info => {
    console.log(info);
    this.setState({
      info: {
        time: info.time,
        student: info.student
      },
      IsModalVisible: true,
      isFetchFinished: false
    });
  };

  renderItem = item => {
    return (
      <TouchableOpacity onPress={() => this.eventClick(item.info)}>
        <View style={[styles.item, { height: item.height }]}>
          <Text>{item.name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  rowHasChanged = (r1, r2) => {
    return r1.name !== r2.name;
  };

  timeToString = time => {
    const date = new Date(time);
    return date.toISOString().split("T")[0];
  };

  renderEmptyData = () => {
    return (
      <Text style={{ textAlign: "center", marginTop: 150, fontSize: 24 }}>
        You don't have course today
      </Text>
    );
  };

  render() {
    console.log(this.state);
    return (
      <View style={{ flex: 1 }}>
        <Modal isVisible={this.state.IsModalVisible} transparent={true}>
          <View style={styles.modalContainer}>
            <View style={styles.modalMainView}>
              <Text style={styles.modalTitle}>Information</Text>
              <View
                style={{
                  height: 1,
                  backgroundColor: "#CED0CE",
                  width: "90%",
                  alignSelf: "center"
                }}
              />
              <ScrollView>
                <View style={{ paddingTop: 10 }}>
                  <View style={styles.contentRowView}>
                    <Text style={styles.contentTitle}>Time</Text>
                    <Text style={styles.contentRow}>
                      {this.state.info.time}
                    </Text>
                  </View>
                  <View style={styles.contentRowView}>
                    <Text style={styles.contentTitle}>Student</Text>
                    <Text style={styles.contentRow}>
                      {this.state.info.student }
                    </Text>
                  </View>
                </View>
              </ScrollView>
              <View style={styles.modalButtonContainer}>
                <Button
                  title="Close"
                  onPress={() => this.setState({ IsModalVisible: false })}
>>>>>>> 2f6f4d8ef16f1ed15da6151cff2547fdc1c59cfb
                />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17
    },
    emptyDate: {
        height: 15,
        flex:1,
        paddingTop: 30
    },
    modalContainer: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    modalTitle:{
        fontSize: 25,
        marginBottom: 16,
        paddingVertical: 10,
        textAlign: 'center',
        fontWeight: 'bold'

    },
    modalMainView:{
        margin: 10,
        backgroundColor : "white",
        height: 300 ,
        width: '90%',
        borderRadius:10,
        borderWidth: 1,
        borderColor: '#fff'
    },
    contentRow:{
        paddingLeft:10,
        fontSize: 15,
        alignSelf: 'center'
    },
    contentTitle:{
        fontSize:20,
        alignSelf: 'center'
    },
    contentRowView:{
        paddingBottom:10,
    },
    closeModalButton:{

        paddingTop: 30,
    },
    modalButtonContainer:{
        flex:1,
        justifyContent: 'flex-start',
        marginBottom: 10
    }
});
