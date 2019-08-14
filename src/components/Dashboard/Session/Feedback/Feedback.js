import React, { Component } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  FlatList, Alert
} from "react-native";
import { ListItem } from "react-native-elements";
import '../../../../util/global_config'
import AsyncStorage from "@react-native-community/async-storage";
import {ActivityIndicator, Colors} from "react-native-paper";
export default class Feedback extends Component {
  static navigationOptions = {
    title: "Feedback"
  };

  state = {
    isLoaded: false,
    lessons: [],
    userId: "",
    userPosition: "",
    navigatedAway: false
  };

  componentDidMount = async ()=>{
    this.setState({
      userId: await AsyncStorage.getItem("userid"),
      userPosition: await AsyncStorage.getItem("userPosition")
    },()=>{
      this.getDataHandler()
    })
  }


    getDataHandler = () => {
    if (this.state.userPosition == "teacher"){
      fetch(global.constants.basic_url + 'rating/TeacherFeedbackRatingList/' + this.state.userId)
          .then(res=>res.json())
          .then(result=>{
              if (result.IsSuccess == false) {
                throw new Error(result.ErrorMessage);
              }
              this.setState({lessons: result.Data, isLoaded:true})
            }).catch(err=> {
                Alert.alert("Data loading Fail", err.toString())
      })
    }else if (this.state.userPosition == "learner"){
        fetch(global.constants.basic_url + 'rating/LearnerFeedbackRatingList/' + this.state.userId)
            .then(res=>res.json())
            .then(result=>{
                if (result.IsSuccess == false) {
                    throw new Error(result.ErrorMessage);
                }
                this.setState({lessons: result.Data, isLoaded:true})
            }).catch(err=>{
                Alert.alert("Data loading Fail", err.toString())
        })
    }
  }

    renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: "#CED0CE"
        }}
      />
    );
  };


  render() {
    return (
        this.state.isLoaded?(<View style={styles.container}>
          {this.state.lessons.length > 0 ? (
              <FlatList
                  data={this.state.lessons}
                  renderItem={({ item }) => (
                      <ListItem
                          rightIcon={{ name: "chevron-right" }}
                          title={`${item.BeginTime}`}
                          subtitle={`${item.isRate==0?"unrate":"rated"}`}
                          onPress={() => this.props.navigation.navigate("FeedbackRating",{
                            LessonId: item.LessonId,
                            role: this.state.userPosition,
                            userId: this.state.userId,
                            isRate: item.isRate
                          })}
                      />
                  )}
                  ItemSeparatorComponent={this.renderSeparator}
                  keyExtractor={(item, index) => index.toString()}
              />
          ) : (
              <Text>No Data</Text>
          )}
        </View>):(
            <View style={{flex:1,justifyContent: 'center', alignItems:'center'}}>
              <ActivityIndicator
                  size={50}
                  color={Colors.blue100}
              />
            </View>
        )
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
