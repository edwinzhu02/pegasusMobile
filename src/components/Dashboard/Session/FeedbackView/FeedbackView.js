import React, {Component} from 'react'
import {View,StyleSheet,Text,ScrollView,Alert} from 'react-native'
import FeedbackViewItem from './FeedbackViewItem/FeedbackViewItem'
import Star from 'react-native-star-view'
import {ActivityIndicator, Colors} from "react-native-paper";
import '../../../../util/global_config'
import AsyncStorage from "@react-native-community/async-storage";
import '../../../../util/FeedbackStatistics'
import {statistics} from "../../../../util/FeedbackStatistics";
export default class FeedbackView extends Component{
    static navigationOptions = {
        title: 'Feedback View'
    };

    constructor(props){
        super(props)
        this.itemToRender = 5
        this.state = {
            userId: '',
            userPosition: "",
            lessons: [],
            statistics: {
                average: 0,
                star: {one:0,two:0,three:0,four:0,five:0}
            },
            itemToRender: this.itemToRender,
            isShowLoadingIcon: true
        }
    }


    componentDidMount = async () => {
        this.setState({
            userId: await AsyncStorage.getItem("userid"),
            userPosition: await AsyncStorage.getItem("userPosition")
        },()=>{
            if (this.state.userPosition == "teacher"){
                fetch(global.constants.basic_url + 'rating/TeacherGetRating/' + this.state.userId)
                    .then(res=>res.json())
                    .then(result=>{
                        if (result.IsSuccess == false) {
                            throw new Error(result.ErrorMessage);
                        }
                        const statistic = statistics(result.Data)
                        let data = result.Data.map(s=>{
                            return {name: s.FirstName+" "+s.LastName, rating: s.RateStar,lessonStartDate:s.BeginTime,comment: s.Comment}
                        })
                        this.setState({lessons:data, statistics: statistic})
                    }).catch(err=>{
                    Alert.alert(Alert.alert("Data loading Fail", err.toString()))
                })
            }else if (this.state.userPosition == "learner"){
                console.log("sbc")
                fetch(global.constants.basic_url + 'rating/LearnerGetRating/' + this.state.userId)
                    .then(res=>res.json())
                    .then(result=>{
                        if (result.IsSuccess == false) {
                            throw new Error(result.ErrorMessage);
                        }
                        const statistic = statistics(result.Data)
                        let data = result.Data.map(s=>{
                            return {name: s.FirstName+" "+s.LastName, rating: s.RateStar,lessonStartDate:s.BeginTime,comment: s.Comment}
                        })
                        this.setState({lessons:data, statistics: statistic})
                    }).catch(err=>{
                    Alert.alert(Alert.alert("Data loading Fail", err.toString()))
                })
            }

        })

    }

    render(){
        const items = this.state.lessons.map((item,i)=>{
            if (i +1 <=this.state.itemToRender){
                return (
                    <FeedbackViewItem
                        name={item.name}
                        lessonStartDate={item.lessonStartDate}
                        comment={item.comment}
                        key = {i}
                        rating={item.rating}
                    />
                )
            }
        })


        return (
            <View style={styles.container}>
                <View style={styles.topContainer}>
                    <View style={styles.ratingText}>
                        <Text style={{fontSize: 45}}>{this.state.statistics.average} of 5</Text>
                    </View>
                    <View>
                        <View style={styles.ratingStar}>
                            <View>
                                <Star style={styles.star} score={1}/>
                            </View>
                            <View>
                                <Text>({this.state.statistics.star.one})</Text>
                            </View>
                        </View>
                        <View style={styles.ratingStar}>
                            <View>
                                <Star style={styles.star} score={2}/>
                            </View>
                            <View>
                                <Text>({this.state.statistics.star.two})</Text>
                            </View>
                        </View>
                        <View style={styles.ratingStar}>
                            <View>
                                <Star style={styles.star} score={3}/>
                            </View>
                            <View>
                                <Text>({this.state.statistics.star.three})</Text>
                            </View>
                        </View>
                        <View style={styles.ratingStar}>
                            <View>
                                <Star style={styles.star} score={4}/>
                            </View>
                            <View>
                                <Text>({this.state.statistics.star.four})</Text>
                            </View>
                        </View>
                        <View style={styles.ratingStar}>
                            <View>
                                <Star style={styles.star} score={5}/>
                            </View>
                            <View>
                                <Text>({this.state.statistics.star.five})</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        height:1,
                        backgroundColor: '#CED0CE',
                        alignSelf: 'center'
                    }}
                />
                <ScrollView
                    onMomentumScrollEnd={(e)=>{
                        const scrollPosition = e.nativeEvent.contentOffset.y;
                        const scrollViewHeight = e.nativeEvent.layoutMeasurement.height
                        const contentHeight = e.nativeEvent.contentSize.height
                        const isScrolledToBottom = scrollViewHeight + scrollPosition;

                        if (isScrolledToBottom >= (contentHeight-50)&&this.state.itemToRender<=this.state.lessons.length){
                            this.setState({
                                itemToRender: this.state.itemToRender + 5
                            })
                        }
                        if (this.state.itemToRender >= this.state.lessons.length){
                            this.setState({
                                isShowLoadingIcon: false
                            })
                        }
                    }}
                >
                    {items}
                    <ActivityIndicator size={30} animating={this.state.isShowLoadingIcon} color={Colors.blue200} />
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        padding: 15
    },
    star:{
        width: 100,
        height: 20
    },
    topContainer:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    ratingText:{
        justifyContent: 'center'
    },
    ratingStar:{
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})
