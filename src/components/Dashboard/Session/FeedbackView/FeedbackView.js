import React, {Component} from 'react'
import {View,StyleSheet,Text,ScrollView} from 'react-native'
import FeedbackViewItem from './FeedbackViewItem/FeedbackViewItem'
import Star from 'react-native-star-view'
import {ActivityIndicator, Colors} from "react-native-paper";

export default class FeedbackView extends Component{
    static navigationOptions = {
        title: 'Feedback View'
    };

    constructor(props){
        super(props)
        this.itemToRender = 5
        this.state = {
            lessons: [
                {name: "Mike Lee",rating:4, lessonStartDate: "2019-06-10",comment: "This is a good teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Richard Wang",rating:5, lessonStartDate: "2019-06-11",comment: "This is a bad teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Mike Lee",rating:4, lessonStartDate: "2019-06-10",comment: "This is a good teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Richard Wang",rating:5, lessonStartDate: "2019-06-11",comment: "This is a bad teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Mike Lee",rating:4, lessonStartDate: "2019-06-10",comment: "This is a good teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Richard Wang",rating:5, lessonStartDate: "2019-06-11",comment: "This is a bad teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Mike Lee",rating:4, lessonStartDate: "2019-06-10",comment: "This is a good teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Richard Wang",rating:5, lessonStartDate: "2019-06-11",comment: "This is a bad teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Mike Lee",rating:4, lessonStartDate: "2019-06-10",comment: "This is a good teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Richard Wang",rating:5, lessonStartDate: "2019-06-11",comment: "This is a bad teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Mike Lee",rating:4, lessonStartDate: "2019-06-10",comment: "This is a good teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Richard Wang",rating:5, lessonStartDate: "2019-06-11",comment: "This is a bad teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Mike Lee",rating:4, lessonStartDate: "2019-06-10",comment: "This is a good teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Richard Wang",rating:5, lessonStartDate: "2019-06-11",comment: "This is a bad teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Mike Lee",rating:4, lessonStartDate: "2019-06-10",comment: "This is a good teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Richard Wang",rating:5, lessonStartDate: "2019-06-11",comment: "This is a bad teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Mike Lee",rating:4, lessonStartDate: "2019-06-10",comment: "This is a good teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"},
                {name: "Richard Wang",rating:5, lessonStartDate: "2019-06-11",comment: "This is a bad teacher, but xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx. I hope he will change these mistakes"}
            ],
            itemToRender: this.itemToRender,
            isShowLoadingIcon: true
        }
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
                        <Text style={{fontSize: 45}}>4.5 of 5</Text>
                    </View>
                    <View>
                        <View style={styles.ratingStar}>
                            <View>
                                <Star style={styles.star} score={1}/>
                            </View>
                            <View>
                                <Text>(5)</Text>
                            </View>
                        </View>
                        <View style={styles.ratingStar}>
                            <View>
                                <Star style={styles.star} score={2}/>
                            </View>
                            <View>
                                <Text>(1)</Text>
                            </View>
                        </View>
                        <View style={styles.ratingStar}>
                            <View>
                                <Star style={styles.star} score={3}/>
                            </View>
                            <View>
                                <Text>(3)</Text>
                            </View>
                        </View>
                        <View style={styles.ratingStar}>
                            <View>
                                <Star style={styles.star} score={4}/>
                            </View>
                            <View>
                                <Text>(10)</Text>
                            </View>
                        </View>
                        <View style={styles.ratingStar}>
                            <View>
                                <Star style={styles.star} score={5}/>
                            </View>
                            <View>
                                <Text>(20)</Text>
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
